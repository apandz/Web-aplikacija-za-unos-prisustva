const Sequelize = require('sequelize');
const bazaConfig = require('../config/baza.js');

const sequelize = new Sequelize(bazaConfig.database, bazaConfig.user, bazaConfig.password, {
    host: bazaConfig.host,
    dialect: bazaConfig.dialect
});

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.Nastavnik = require('./nastavnik.js')(sequelize, Sequelize.DataTypes);
db.models.Predmet = require('./predmet.js')(sequelize, Sequelize.DataTypes);
db.models.Student = require('./student.js')(sequelize, Sequelize.DataTypes);
db.models.Prisustvo = require('./prisustvo.js')(sequelize, Sequelize.DataTypes);

db.models.NastavnikPredmeti = sequelize.define('nastavnikpredmeti', {}, { timestamps: false, freezeTableName: true });
db.models.Nastavnik.belongsToMany(db.models.Predmet, { through: 'nastavnikpredmeti' });
db.models.Predmet.belongsToMany(db.models.Nastavnik, { through: 'nastavnikpredmeti' });

db.models.PredmetStudenti = sequelize.define('predmetstudenti', {}, { timestamps: false, freezeTableName: true });
db.models.Predmet.belongsToMany(db.models.Student, { through: 'predmetstudenti', as: 'studenti' });
db.models.Student.belongsToMany(db.models.Predmet, { through: 'predmetstudenti', as: 'predmeti' });

db.models.Predmet.hasMany(db.models.Prisustvo, { as: 'prisustva' });
db.models.Prisustvo.belongsTo(db.models.Predmet, { as: 'predmet' });

module.exports = db;