module.exports = (sequelize, DataTypes) => {

    const Predmet = sequelize.define('predmet',
        {
            naziv: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            brojPredavanjaSedmicno: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            brojVjezbiSedmicno: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        });

    return Predmet;
}