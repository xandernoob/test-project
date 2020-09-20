const  Sequelize  = require("sequelize");

// const sequelize = new Sequelize('user_db_table', 'admin', 'password',{
//   dialect: "mysql",
//   host: "35.247.145.163",
// });

const sequelize = new Sequelize('user_db_table', 'admin', 'password', {
  dialect: 'mysql',
  host: '/cloudsql/35.247.145.163',
  timestamps: false,
  dialectOptions: {
    socketPath: '/cloudsql/35.247.145.163'
},
});

module.exports = sequelize;
