module.exports = (sequelize, DataTypes) => {

    const Prisustvo = sequelize.define('prisustvo',
        {
            sedmica: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            predavanja: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            vjezbe: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            index: {
                type: DataTypes.INTEGER,
                allowNull: false
            }        
        },
        {
            freezeTableName: true,
            timestamps: false
        });

    return Prisustvo;
}