import sequelize from '../config/sequelize.js';
import Admin from './admin/Admin.js';

// Add other models here as you create them
const models = {
  Admin
};

// Initialize models
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize
};

export default db;