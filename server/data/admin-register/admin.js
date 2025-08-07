import pool from '../../config/db.js';


const adminTable = async () => {
    const query = `
       CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  admin_type VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW()) NOT NULL
);

    `;

    try {
        await pool.query(query);
        console.log("Admin table created successfully.");
    } catch (error) {
        console.error("Error creating admin table:", error);
    }
}