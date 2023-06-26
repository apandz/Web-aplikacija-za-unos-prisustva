module.exports = (sequelize, DataTypes) => {

    const Student = sequelize.define('student',
        {
            index: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: false,
                primaryKey: true
            },
            ime: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        });

    return Student;
}