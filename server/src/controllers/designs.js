import Design from '../models/Design.js';

export const createDesign = async (req, res) => {
  try {
    const { name, isPublic } = req.body;
    const image = req.file?.filename;
    const userId = req.user?.userId;

    if (!image || !userId) {
      return res.status(400).json({ message: 'Image and user authentication required' });
    }

    const design = new Design({
      userId,
      name,
      image: `/uploads/${image}`,
      isPublic,
    });

    await design.save();
    res.status(201).json(design);
  } catch (error) {
    res.status(500).json({ message: 'Error creating design' });
  }
};

export const getMyDesigns = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const designs = await Design.find({ userId });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching designs' });
  }
};

export const getPublicDesigns = async (req, res) => {
  try {
    const designs = await Design.find({ isPublic: true });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching public designs' });
  }
};