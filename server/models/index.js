const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employe= require("../models/Employe.model.js")(sequelize,Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.entreprise = require("../models/Entreprise.model.js")(sequelize,Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize,Sequelize);
db.projet= require("../models/projet.model.js")(sequelize,Sequelize)
db.task= require("../models/task.model.js")(sequelize,Sequelize)
db.passwordResetToken= require("../models/PasswordResetToken.js")(sequelize,Sequelize)


db.role.belongsToMany(db.employe, {
  through: "employe_roles",
  foreignKey: "roleId",
  otherKey: "employeId"
});
db.employe.belongsToMany(db.role, {
  through: "employe_roles",
  foreignKey: "employeId",
  otherKey: "roleId"
});
db.entreprise.hasMany(db.employe, { as: "employes" });
db.employe.belongsTo(db.entreprise, {
  foreignKey: "entrepriseId",
  as: "entreprise",
});
db.refreshToken.belongsTo(db.employe, {
  foreignKey: 'employeId', targetKey: 'id'
});
db.employe.hasOne(db.refreshToken, {
  foreignKey: 'employeId', targetKey: 'id'
});
db.task.belongsToMany(db.employe, {
  through: "employe_tasks",
  foreignKey: "taskId",
  otherKey: "employeId"
});
db.employe.belongsToMany(db.task, {
  through: "employe_tasks",
  foreignKey: "employeId",
  otherKey: "taskId"
});
db.task.belongsToMany(db.employe, { through: 'employe_tasks', foreignKey: 'taskId', otherKey: 'employeId' });
db.employe.belongsToMany(db.task, { through: 'employe_tasks', foreignKey: 'employeId', otherKey: 'taskId' });
db.projet.hasMany(db.task, { as: "tasks" });
db.task.belongsTo(db.projet, {
  foreignKey: "projetId",
  as: "projet",
});
// db.passwordResetToken.belongsTo(db.employe, { foreignKey: "employeId" });
// db.employe.hasMany(db.passwordResetToken, { foreignKey: "employeId" })



db.ROLES = ["employe", "admin", "director"];

module.exports = db;