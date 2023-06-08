const config = require('../config/auth.config');
const {v4: uuid4} = require("uuid");

module.exports= (sequelize,Sequelize) =>{
    const RefreshToken = sequelize.define("refreshToken",{
        token:{
            type: Sequelize.STRING,
        },
        expiryDate:{
            type: Sequelize.DATE,
        }
    })

    RefreshToken.createToken = async function (employe){
        let expiredAt = new Date();

        expiredAt.setSeconds(expiredAt.getSeconds()+config.jwtRefreshExpiration);

        let _token= uuid4();

        let refreshToken = await this.create({
            token: _token,
            employeId: employe.id,
            expiryDate: expiredAt.getTime(),
        })

        return refreshToken.token;
    }

    RefreshToken.verifyExpiration =(token)=>{
        return token.expiryDate.getTime() < new Date().getTime();
    }

    return RefreshToken;
}