import Category from '../models/Category.js';

// GET /api/categories
export const getCategories = async (req, res) => {
  try {
    const { parent, level, isActive } = req.query;
    
    let query = {};
    if (parent !== undefined) {
      query.parent = parent === 'null' ? null : parent;
    }
    if (level !== undefined) {
      query.level = parseInt(level);
    }
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const categories = await Category.find(query)
      .populate('parent', 'name slug')
      .sort({ sortOrder: 1, name: 1 });

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách danh mục',
      error: error.message,
    });
  }
};

// GET /api/categories/:id
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parent', 'name slug')
      .populate({
        path: 'children',
        model: 'Category',
        options: { sort: { sortOrder: 1, name: 1 } }
      });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy danh mục',
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin danh mục',
      error: error.message,
    });
  }
};

// POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const { name, description, image, icon, parent, level, sortOrder, seo } = req.body;

    const category = new Category({
      name,
      description,
      image,
      icon,
      parent: parent || null,
      level: level || 0,
      sortOrder: sortOrder || 0,
      seo,
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: 'Tạo danh mục thành công',
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo danh mục',
      error: error.message,
    });
  }
};

// PUT /api/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const { name, description, image, icon, parent, level, sortOrder, isActive, seo } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        image,
        icon,
        parent: parent || null,
        level: level || 0,
        sortOrder: sortOrder || 0,
        isActive,
        seo,
      },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy danh mục',
      });
    }

    res.json({
      success: true,
      message: 'Cập nhật danh mục thành công',
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật danh mục',
      error: error.message,
    });
  }
};

// DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy danh mục',
      });
    }

    // Check if category has products
    const Product = (await import('../models/Product.js')).default;
    const productCount = await Product.countDocuments({ category: req.params.id });

    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Không thể xóa danh mục vì còn ${productCount} sản phẩm`,
      });
    }

    // Check if category has subcategories
    const subcategoryCount = await Category.countDocuments({ parent: req.params.id });

    if (subcategoryCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Không thể xóa danh mục vì còn ${subcategoryCount} danh mục con`,
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Xóa danh mục thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa danh mục',
      error: error.message,
    });
  }
};
