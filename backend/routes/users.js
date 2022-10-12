var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var bcrypt = require('bcrypt');
var uid2 = require('uid2');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/sign-up', async function(req, res, next) {
    
    let error = [];
    let result = false;
    let alreadyExist = null;

    let signUpUsername = req.body.signUpUsername;
    let signUpEmail = req.body.signUpEmail;
    let signUpPassword = req.body.signUpPassword;

    const cost = 10
    const hash = bcrypt.hashSync(signUpPassword, cost)

    let emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    var foundUser = await userModel.findOne({ email: signUpEmail });

    try {

    if(signUpUsername == "" || signUpEmail == "" || signUpPassword == "") {
        error.push("Chmaps vides");
    } else if (foundUser) {
        error.push("Utilisateur est déjà existe");
        alreadyExist = true;
    } else if (!emailRegex.test(signUpEmail)){
        error.push("Email n'est pas correcte");
    } else if (signUpPassword.length < 5) {
        error.push(`Longuer de password est trop court (au moins 6 mots)`);
    } 

    if (error.length == 0) {
            var newUser = new userModel ({
                    name: signUpUsername,
                    email: signUpEmail,
                    password: hash,
                    token: uid2(32)})

        var userSaved = await newUser.save()
        }

    if (userSaved) {
        result = true;
        console.log("Utilisateur Registered");
    } else {
        console.log("Utilisateur n'est pas enregistrer")
    }
        
    } catch (err) {
            console.log(err);
        }
    
        res.json({result, alreadyExist, error});
})


router.post('/sign-in', async function(req, res, next) {

    let error = [];
    let result = false;
    let userId = "";

    let signInEmail = req.body.signInEmail;
    let signInPassword = req.body.signInPassword;

    let foundUser = await userModel.findOne({ email: signInEmail })
    let camparePassword = bcrypt.compareSync(signInPassword, foundUser.password)

    try {

        if(signInEmail == "" || signInPassword == "") {
            error.push("Chmaps vides")
        } else if(!foundUser) {
            error.push("Utilisateur n'est pas existe");
        } else if(camparePassword === false) {
            error.push("Email ou Mot de Pass n'est pas correcte");
        }

        if (camparePassword){
            result = true;
            userId = foundUser.token;
            console.log("User Log-in");
        } 

    } catch (err) {
            console.log(err);
        }
        
    res.json({result, userId, error});
})


module.exports = router;
