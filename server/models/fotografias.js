module.exports = (sequelize,DataTypes)=> {
    const fotografias = sequelize.define('fotografias',{
        id: {
            autoIncrement: true,
            primaryKey:true,
            type:DataTypes.INTEGER
        },
        foto: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        imagen: DataTypes.STRING,
        numero: DataTypes.INTEGER,
        activo: DataTypes.BOOLEAN,
        usuario_creacion: DataTypes.STRING,
        autor: DataTypes.STRING
     
    });
    return fotografias;
};