const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/wikiDB");
const articleSchema = {
    title: String,
    content: String
}
const Article = mongoose.model("Article", articleSchema);
app.route("/articles")
    .get((req, res) => {
        Article.find((err, foundArticle) => {
            if (!err)
            //console.log(foundArticle);
                res.send(foundArticle);
            else
                res.send(err);
        })
    })
    .post((req, res) => {

        console.log(req.body.title);
        console.log(req.body.content);
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save((err) => {
            if (!err)
                res.send("Article Successfully added!!");
            else
                res.send(err + "Please Try Again!!!");

        });
    })
    .delete((req, res) => {
        Article.deleteMany(function(err) {
            if (!err) {
                res.send("Articles deleted Successfully");
            } else {
                res.send(err);
            }
        });
    });


app.listen(3000, () => {
    console.log("Server running on port 3000");
})