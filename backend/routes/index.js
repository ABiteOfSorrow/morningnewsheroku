var express = require('express');
var router = express.Router();
var userModel = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Ajouter des articles au MyArticle
router.post('/add-article', async function(req, res, next) {

    let error = [];
    let result = false;
    let alreadyExist = false;

    let userId = req.body.userId;
    let articleTitle = req.body.articleTitle;
    let articleDesc = req.body.articleDesc;
    let articleImg = req.body.articleImg;

    try {
        console.log(req.body)

    let foundArticle = await userModel.findOne({ token: userId }, { articles: { title: articleTitle }});


    if (articleTitle == "" || articleDesc == "" || articleImg == "") {
        error.push("Contenus vides");
    } 
    
    if (foundArticle === true) {
        error.push("Cet article est déjà existe");
        alreadyExist = true;
    } 

    if (error.length == 0) {
            let newArticle = await userModel.updateOne({ token: userId }, { 
                $addToSet: { 
                    articles: {
                        title: articleTitle,
                        description: articleDesc,
                        urlToImage: articleImg,
                    }}});

    if (newArticle !== undefined && newArticle !== null) { 
            result = true;
            console.log("Article est bien enregistré");
        } else {
            console.log("Article n'est pas enregistré")
        }
            
    } 
    return res.json({result, alreadyExist, error});

    } catch (err) {
        console.log(err);
        return res.json({ result: false, error: JSON.stringify(err) });
    } 
})

// ver 2. Chargement des article (avec DB)
router.post('/get-article', async function(req, res, next) {

    let error = [];
    let result = false;

    let userId = req.body.userId;

    try {
        let foundUser = await userModel.findOne({ token: userId});
        let foundArticle = foundUser.articles
        return res.json({result: true, myArticles: foundArticle})
    }
    catch (err) {
        return res.json({ result: false, error: JSON.stringify(err) })
    }
})

// Supprimer un article && Chargement des article (avec DB)
router.post('/delete-article', async function(req, res, next) {

    let error = [];
    let result = false;

    let userId = req.body.userId;
    let articleTitle = req.body.articleTitle;

    try {
        let deleteArticle = await userModel.update({ token: userId }, {$pull: { articles: { title: articleTitle }}},{
            multi: true})
        let foundUser = await userModel.findOne({ token: userId});
        let foundArticle = foundUser.articles

        return res.json({result: true, myArticles: foundArticle, deleteArticle: deleteArticle})
    }
    catch (err) {
        return res.json({ result: false, error: JSON.stringify(err) })
    }
})

module.exports = router;
