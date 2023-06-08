module.exports=(sequelize,Sequelize)=>{
    const Entreprise= sequelize.define('entreprises',{
        logo:{
            type: Sequelize.BLOB,
        },
        nom:{
            type: Sequelize.STRING,
        },
        domaine:{
            type: Sequelize.STRING,
        },
        email:{
            type: Sequelize.STRING,
        },
        tel:{
            type: Sequelize.STRING,
        },
        localisation:{
            type: Sequelize.STRING,
        }
    })

    return Entreprise
}