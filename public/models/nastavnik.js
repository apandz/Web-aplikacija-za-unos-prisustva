module.exports = (sequelize, DataTypes) => {

    const Nastavnik = sequelize.define('nastavnik',
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password_hash: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        });

    return Nastavnik;
}