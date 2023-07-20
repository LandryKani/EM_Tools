module.exports = (sequelize, Sequelize) => {
  const PasswordResetToken = sequelize.define("password_reset_token", {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    employeeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    expires_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
  });

  return PasswordResetToken;
};