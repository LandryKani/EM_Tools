const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
// Configuration de chai
chai.use(chaiHttp);
chai.should();

describe('Password Reset Tests', () => {
  it('should send a password reset email', (done) => {
    chai.request('http://localhost:3005/api')
      .post('/reset-password/email').set('content-type','application/x-www-form-urlencoded')
      .send({ email: 'geo575mbeussi@gmail.com' })
      .end((err, res,body) => {

        if(err){
            console.log("voic l'erreur",err)
        }
        else{
            console.log("voici la response",res)
        }
        // assert.equal(err, null);
        // res.should.have.status(200);
        // done();
      })
  });

  it('should reset the password with a valid resetToken', (done) => {
    // Simulation de la génération d'un token de réinitialisation de mot de passe
    const resetToken = '068bee4035bccdaba4855b4ac3df958b00580fdc';
    console.log("ejsldjf",resetToken)
    chai.expect(resetToken,"consolel this one expected")
    
    chai.request('http://localhost:3005/api')
      .post(`/reset-password/${resetToken}`)
      .send({
        password: 'nouveaumotdepasse1',
        confirmPassword: 'nouveaumotdepasse1'
      })
      .end((err, res) => {
        if(err){
            console.log("voci l'erreur : ",err)
        }else{
            console.log("voici le resultat",res)
        }
        // assert.equal(err, null);
        // res.should.have.status(200);
        // done();
      })
  });
});