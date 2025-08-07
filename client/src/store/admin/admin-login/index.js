// src/redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- Async Actions ---

// GET all admins
export const fetchAdmins = createAsyncThunk('admin/fetchAdmins', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/register/list`); // Make sure this backend route returns all admins
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Fetch failed');
  }
});

// ADD admin or subadmin
export const addAdmin = createAsyncThunk('admin/addAdmins', async (data, thunkAPI) => {
  try {
    console.log(data,"this is admin data");
    
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/register/add`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Add failed');
  }
});

// LOGIN admin
export const loginAdmin = createAsyncThunk('admin/loginAdmin', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/register/login`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

// EDIT admin (by id)
export const editAdmin = createAsyncThunk('admin/editAdmin', async ({ id, ...data }, thunkAPI) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/register/edit/${id}`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Edit failed');
  }
});

// DELETE admin
export const deleteAdmin = createAsyncThunk('admin/deleteAdmin', async (id, thunkAPI) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/register/delete/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Delete failed');
  }
});

// --- Slice ---

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admins: [],
    currentAdmin: null,    // For logged-in admin
    loading: false,
    error: null,
    success: null
  },
  reducers: {
    logoutAdmin(state) {
      state.currentAdmin = null;
    },
    clearStatus(state) {
      state.error = null;
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch all admins
    builder.addCase(fetchAdmins.pending, (state) => {
      state.loading = true; state.error = null;
    });
    builder.addCase(fetchAdmins.fulfilled, (state, action) => {
      state.loading = false; state.admins = action.payload; state.error = null;
    });
    builder.addCase(fetchAdmins.rejected, (state, action) => {
      state.loading = false; state.error = action.payload;
    });

    // Add admin
    builder.addCase(addAdmin.pending, (state) => {
      state.loading = true; state.error = null;
    });
    builder.addCase(addAdmin.fulfilled, (state, action) => {
      state.loading = false; state.admins.push(action.payload); state.success = "Admin added."; state.error = null;
    });
    builder.addCase(addAdmin.rejected, (state, action) => {
      state.loading = false; state.error = action.payload;
    });

    // Login admin
    builder.addCase(loginAdmin.pending, (state) => {
      state.loading = true; state.error = null;
    });
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.loading = false; state.currentAdmin = action.payload; state.success = "Login successful"; state.error = null;
    });
    builder.addCase(loginAdmin.rejected, (state, action) => {
      state.loading = false; state.error = action.payload;
    });

    // Edit admin
    builder.addCase(editAdmin.pending, (state) => {
      state.loading = true; state.error = null;
    });
    builder.addCase(editAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.admins = state.admins.map(admin =>
        admin.id === action.payload.id ? action.payload : admin
      );
      state.success = "Admin updated."; state.error = null;
    });
    builder.addCase(editAdmin.rejected, (state, action) => {
      state.loading = false; state.error = action.payload;
    });

    // Delete admin
    builder.addCase(deleteAdmin.pending, (state) => {
      state.loading = true; state.error = null;
    });
    builder.addCase(deleteAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.admins = state.admins.filter(admin => admin.id !== action.payload.admin.id);
      state.success = "Admin deleted."; state.error = null;
    });
    builder.addCase(deleteAdmin.rejected, (state, action) => {
      state.loading = false; state.error = action.payload;
    });
  }
});

export const { logoutAdmin, clearStatus } = adminSlice.actions;
export default adminSlice.reducer;
