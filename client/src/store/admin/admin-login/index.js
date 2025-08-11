// src/redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// LocalStorage helpers
const STORAGE_KEY = 'currentAdmin';

function getLocalCurrentAdmin() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function setLocalCurrentAdmin(admin) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(admin));
  } catch {}
}

function removeLocalCurrentAdmin() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

// --- Async Actions ---

export const fetchAdmins = createAsyncThunk('admin/fetchAdmins', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/register/list`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Fetch failed');
  }
});

export const addAdmin = createAsyncThunk('admin/addAdmins', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/register/add`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Add failed');
  }
});

export const loginAdmin = createAsyncThunk('admin/loginAdmin', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/register/login`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const editAdmin = createAsyncThunk('admin/editAdmin', async ({ id, ...data }, thunkAPI) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/register/edit/${id}`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Edit failed');
  }
});

export const deleteAdmin = createAsyncThunk('admin/deleteAdmin', async (id, thunkAPI) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/register/delete/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Delete failed');
  }
});

// --- Slice ---
const initialState = {
  admins: [],
  currentAdmin: getLocalCurrentAdmin(), // <-- load from localStorage!
  loading: false,
  error: null,
  success: null
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logoutAdmin(state) {
      state.currentAdmin = null;
      removeLocalCurrentAdmin();
    },
    clearStatus(state) {
      state.error = null;
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false; state.admins = action.payload; state.error = null;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })
      .addCase(addAdmin.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.loading = false; state.admins.push(action.payload); state.success = "Admin added."; state.error = null;
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })
      .addCase(loginAdmin.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        // Only store minimal id/email in state and localStorage
        const { id, email } = action.payload || {};
        const adminData = id && email ? { id, email } : null;
        state.currentAdmin = adminData;
        if (adminData) setLocalCurrentAdmin(adminData);
        state.success = "Login successful";
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })
      .addCase(editAdmin.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(editAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = state.admins.map(admin =>
          admin.id === action.payload.id ? action.payload : admin
        );
        state.success = "Admin updated."; state.error = null;
      })
      .addCase(editAdmin.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })
      .addCase(deleteAdmin.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = state.admins.filter(admin => admin.id !== action.payload.admin.id);
        state.success = "Admin deleted."; state.error = null;
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      });
  }
});

export const { logoutAdmin, clearStatus } = adminSlice.actions;
export default adminSlice.reducer;
