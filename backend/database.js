const  Sequelize  = require("sequelize");

// const sequelize = new Sequelize('user_db_table', 'admin', 'password',{
//   dialect: "mysql",
//   host: "35.247.145.163",
// });

const sequelize = new Sequelize('user_db_table', 'admin', 'password', {
  dialect: 'mysql',
  host: '/cloudsql/master-sector-289216:asia-southeast1:ueser-db',
  timestamps: false,
  dialectOptions: {
    socketPath: '/cloudsql/master-sector-289216:asia-southeast1:ueser-db'
},
});

module.exports = sequelize;
