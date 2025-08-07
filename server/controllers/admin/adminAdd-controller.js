import db from '../../models/index.js';

const { Admin } = db;

export const addAdmin = async (req, res) => {
  const { name, email, password, admin_type } = req.body;
  if (!name || !email || !password || !admin_type) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const admin = await Admin.create({
      name,
      email,
      password,
      admin_type
    });
    res.status(201).json(admin);
  } catch (error) {
    console.error("Error details:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: "Email already exists." });
    } else {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      order: [['id', 'ASC']]
    });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }
  try {
    const admin = await Admin.findOne({
      where: {
        email,
        password
      }
    });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const editAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, admin_type } = req.body;
  
  if (!name || !email || !password || !admin_type) {
    return res.status(400).json({ message: "All fields are required." });
  }
  
  try {
    const admin = await Admin.findByPk(id);
    
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }
    
    // Update the admin
    admin.name = name;
    admin.email = email;
    admin.password = password;
    admin.admin_type = admin_type;
    
    await admin.save();
    
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error details:", error);
    
    // Handle specific Sequelize errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        message: "Email already exists.", 
        error: {
          name: error.name,
          message: error.message,
          errors: error.errors.map(e => ({
            message: e.message,
            type: e.type,
            path: e.path,
            value: e.value
          }))
        }
      });
    } 
    
    // Handle validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: "Validation error",
        error: {
          name: error.name,
          message: error.message,
          errors: error.errors.map(e => ({
            message: e.message,
            type: e.type,
            path: e.path,
            value: e.value
          }))
        }
      });
    }
    
    // Handle other errors
    return res.status(500).json({ 
      message: "Server Error", 
      error: {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};


export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByPk(id);
    
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }
    
    await admin.destroy();
    
    res.status(200).json({ message: "Admin deleted.", admin });
  } catch (error) {
    console.error("Error deleting admin:", error);
    
    // Handle specific Sequelize errors
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ 
        message: "Cannot delete admin because it is referenced by other records.", 
        error: {
          name: error.name,
          message: error.message,
          table: error.table,
          fields: error.fields
        }
      });
    }
    
    // Handle other errors
    return res.status(500).json({ 
      message: "Server Error", 
      error: {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};
