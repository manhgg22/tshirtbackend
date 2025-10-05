import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMyDesigns, getPublicDesigns, createDesign } from '../../services/api';

export const fetchMyDesigns = createAsyncThunk(
  'designs/fetchMyDesigns',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyDesigns();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch designs');
    }
  }
);

export const fetchPublicDesigns = createAsyncThunk(
  'designs/fetchPublicDesigns',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPublicDesigns();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch public designs');
    }
  }
);

export const saveDesign = createAsyncThunk(
  'designs/saveDesign',
  async (designData, { rejectWithValue }) => {
    try {
      const response = await createDesign(designData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to save design');
    }
  }
);

const initialState = {
  myDesigns: [],
  publicDesigns: [],
  loading: false,
  error: null,
  currentDesign: {
    name: '',
    image: '',
    isPublic: false,
    productType: 'tshirt',
    color: '#ffffff',
    elements: [],
  },
};

const designSlice = createSlice({
  name: 'designs',
  initialState,
  reducers: {
    updateCurrentDesign: (state, action) => {
      state.currentDesign = { ...state.currentDesign, ...action.payload };
    },
    addElement: (state, action) => {
      state.currentDesign.elements.push({
        id: Date.now() + Math.random(),
        type: action.payload.type,
        content: action.payload.content,
        x: action.payload.x || 0,
        y: action.payload.y || 0,
        width: action.payload.width || 100,
        height: action.payload.height || 100,
        color: action.payload.color || '#000000',
        fontSize: action.payload.fontSize || 16,
      });
    },
    updateElement: (state, action) => {
      const { id, updates } = action.payload;
      const element = state.currentDesign.elements.find(el => el.id === id);
      if (element) {
        Object.assign(element, updates);
      }
    },
    removeElement: (state, action) => {
      state.currentDesign.elements = state.currentDesign.elements.filter(
        el => el.id !== action.payload
      );
    },
    clearCurrentDesign: (state) => {
      state.currentDesign = {
        name: '',
        image: '',
        isPublic: false,
        productType: 'tshirt',
        color: '#ffffff',
        elements: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyDesigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyDesigns.fulfilled, (state, action) => {
        state.loading = false;
        state.myDesigns = action.payload;
      })
      .addCase(fetchMyDesigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPublicDesigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicDesigns.fulfilled, (state, action) => {
        state.loading = false;
        state.publicDesigns = action.payload;
      })
      .addCase(fetchPublicDesigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveDesign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDesign.fulfilled, (state, action) => {
        state.loading = false;
        state.myDesigns.push(action.payload);
      })
      .addCase(saveDesign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  updateCurrentDesign, 
  addElement, 
  updateElement, 
  removeElement, 
  clearCurrentDesign 
} = designSlice.actions;
export default designSlice.reducer;
