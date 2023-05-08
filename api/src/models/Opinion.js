const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "opinion",
    {
      id_opinion: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      ubicacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      puntaje: {
        type: DataTypes.FLOAT,
      },
      mensaje: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};