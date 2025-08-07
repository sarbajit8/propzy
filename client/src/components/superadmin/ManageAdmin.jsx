import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdmins,
  addAdmin,
  editAdmin,
  deleteAdmin,
  clearStatus,
} from "../../store/admin/admin-login/index.js";
import toast, { Toaster } from 'react-hot-toast';

const COLORS = {
  bg: 'bg-white',
  btn: 'bg-purple-600 hover:bg-purple-700',
  btnLight: 'bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium',
  text: 'text-gray-800',
  accent: 'text-purple-600',
  border: 'border-gray-200',
  shadow: 'shadow-xl',
  focus: 'focus:border-purple-500 focus:ring-2 focus:ring-purple-100',
};

const initialState = {
  name: "",
  email: "",
  password: "",
  admin_type: "admin",
};

const ManageAdmin = () => {
  const dispatch = useDispatch();
  const { admins, loading, error, success } = useSelector((state) => state.adminAuth);

  const [showSidebar, setShowSidebar] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [form, setForm] = useState(initialState);
  const [formError, setFormError] = useState({});
  // Add state for delete confirmation popup
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  // Fetch all admins on mount
  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  // Show toasts for error/success
  useEffect(() => {
    if (error) toast.error(error);
    if (success) toast.success(success);
    // Clear status after showing toast, avoids duplicate toasts
    dispatch(clearStatus());
  }, [error, success, dispatch]);

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: undefined });
  };

  // Validate form fields
  const validateForm = () => {
    let err = {};
    if (!form.name.trim()) err.name = 'Required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) err.email = 'Invalid';
    if (!editingAdmin && !form.password.trim()) err.password = 'Required';
    if (!form.admin_type) err.admin_type = 'Required';
    return err;
  };

  // Handle form submission (add/edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateForm();
    if (Object.keys(err).length > 0) {
      setFormError(err);
      return;
    }
    if (editingAdmin) {
      // If password blank in edit, keep existing
      dispatch(
        editAdmin({
          id: editingAdmin.id,
          ...form,
          password: form.password ? form.password : editingAdmin.password,
        })
      ).then((action) => {
        if (!action.error) {
          toast.success("Admin updated");
          handleCloseSidebar();
        }
      }).catch(() => toast.error("Update failed"));
    } else {
      dispatch(addAdmin(form)).then((action) => {
        if (!action.error) {
          toast.success("Admin added");
          handleCloseSidebar();
        }
      }).catch(() => toast.error("Add failed"));
    }
  };

  // Open sidebar in edit or add mode
  const handleOpenSidebar = (admin = null) => {
    if (admin) {
      setForm({ ...admin, password: "" }); // blank on edit
      setEditingAdmin(admin);
    } else {
      setForm(initialState);
      setEditingAdmin(null);
    }
    setFormError({});
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
    setForm(initialState);
    setEditingAdmin(null);
    setFormError({});
  };

  // Show delete confirmation popup
  const handleShowDeleteConfirm = (admin) => {
    setAdminToDelete(admin);
    setShowDeletePopup(true);
  };

  // Delete an admin
  const handleDelete = () => {
    if (!adminToDelete) return;
    
    dispatch(deleteAdmin(adminToDelete.id)).then((action) => {
      if (!action.error) toast.success("Admin deleted");
      else toast.error(action.error.message || "Delete failed");
      setShowDeletePopup(false);
      setAdminToDelete(null);
    });
  };

  return (
    <div className={`${COLORS.bg} min-h-screen py-10 px-2 sm:px-8`}>
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto mb-8 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Manage Admins
        </h1>
        <button
          className={`${COLORS.btn} text-white px-5 py-2 rounded-lg transition font-medium focus:outline-none shadow`}
          onClick={() => handleOpenSidebar()}
        >
          + Add Admin
        </button>
      </div>

      <div className="max-w-3xl mx-auto rounded-2xl shadow-lg bg-white overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 font-medium text-left text-gray-700">Name</th>
              <th className="p-4 font-medium text-left text-gray-700">Email</th>
              <th className="p-4 font-medium text-left text-gray-700">Type</th>
              <th className="p-4 font-medium text-left text-gray-700">Password</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-300">
                  Loading...
                </td>
              </tr>
            ) : admins.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-300">
                  No admins yet.
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr
                  key={admin.id}
                  className="hover:bg-gray-50 transition border-b last:border-none"
                >
                  <td className="p-4">{admin.name}</td>
                  <td className="p-4">{admin.email}</td>
                  <td className="p-4 capitalize">{admin.admin_type}</td>
                  <td className="p-4">{admin.password}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      className={`${COLORS.btnLight} px-3 py-1 rounded transition`}
                      onClick={() => handleOpenSidebar(admin)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-50 hover:bg-red-100 text-red-500 px-3 py-1 rounded transition font-medium"
                      onClick={() => handleShowDeleteConfirm(admin)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Sidebar Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/20 z-40 animate-fade-in"
          onClick={handleCloseSidebar}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[400px] bg-white ${COLORS.shadow} transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ willChange: "transform" }}
      >
        <form
          className="flex flex-col h-full justify-between p-8 overflow-auto"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-700">
                {editingAdmin ? "Edit Admin" : "Add Admin"}
              </h3>
              <button
                type="button"
                className="text-2xl text-gray-300 hover:text-gray-500 transition"
                onClick={handleCloseSidebar}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Name
                </label>
                <input
                  className={`${COLORS.text} border ${COLORS.border} rounded-lg px-4 py-2 w-full ${COLORS.focus}`}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  autoFocus
                />
                {formError.name && (
                  <span className="text-xs text-red-500">{formError.name}</span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Email
                </label>
                <input
                  className={`${COLORS.text} border ${COLORS.border} rounded-lg px-4 py-2 w-full ${COLORS.focus}`}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                />
                {formError.email && (
                  <span className="text-xs text-red-500">Invalid email</span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Password
                  {editingAdmin && (
                    <span className="ml-2 text-sm text-gray-400">
                      (Leave blank to keep the same.)
                    </span>
                  )}
                </label>
                <input
                  className={`${COLORS.text} border ${COLORS.border} rounded-lg px-4 py-2 w-full ${COLORS.focus}`}
                  name="password"
                  type="text"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={editingAdmin ? "Current Password" : "Password"}
                />
                {formError.password && (
                  <span className="text-xs text-red-500">{formError.password}</span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Type
                </label>
                <select
                  className={`${COLORS.text} border ${COLORS.border} rounded-lg px-4 py-2 w-full ${COLORS.focus}`}
                  name="admin_type"
                  value={form.admin_type}
                  onChange={handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="subadmin">Subadmin</option>
                </select>
                {formError.admin_type && (
                  <span className="text-xs text-red-500">{formError.admin_type}</span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              disabled={loading}
              className={`${COLORS.btn} w-full py-3 rounded-lg text-lg font-semibold text-white shadow-md hover:scale-105 transition`}
            >
              {editingAdmin ? "Update Admin" : "Add Admin"}
            </button>
          </div>
        </form>
      </aside>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && adminToDelete && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/20 z-40 animate-fade-in"
            onClick={() => setShowDeletePopup(false)}
          ></div>
          
          {/* Popup */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Delete Admin</h3>
              <p className="text-gray-600">Are you sure you want to delete <span className="font-semibold">{adminToDelete.name}</span>? This action cannot be undone.</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageAdmin;
