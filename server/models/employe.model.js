module.exports =(sequelize,Sequelize)=>{
    const Employe = sequelize.define('employes',{
        photo: {
            type: Sequelize.BLOB,
        },
        username:{
            type: Sequelize.STRING,
        },
        email:{
            type: Sequelize.STRING,
        },
        tel:{
            type: Sequelize.STRING,
        },
        password:{
            type: Sequelize.STRING,
        },
        resetToken: {
            type: Sequelize.STRING,
        },
        resetTokenExpiration:{
            type: Sequelize.DATE,
        }
    })

    return Employe
}