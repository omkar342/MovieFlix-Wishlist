const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.static("public"));

app.get("/",function(req,res){

    serveDiscoverMovie(req,res);

});

app.post("/",function(req,res){
    if (req.body.Search === "") {
        serveDiscoverMovie(req,res);
    }
    else{
        var searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=4fc655683124e873c9ae9f4cc845e5b2&language=en-US&page=1&query=";

        var search = req.body.Search;

        var finalUrl = searchUrl+search;

        // console.log(searchUrl+search);

        request(finalUrl , function(err,response,body){
            var data = JSON.parse(body);
            var obj = data.results;
            // console.log(obj);
    
            // res.sendFile(__dirname + "/index.html");
    
            var IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
    
            res.render("index" , {movieArray : obj , imageUrl : IMG_PATH} );
        })
    }
})

app.get("/trending",function(req,res){

    trendingMovies(req,res);

});

function trendingMovies(req,res){
    var trendingUrl = "https://api.themoviedb.org/3/trending/movie/day?api_key=4fc655683124e873c9ae9f4cc845e5b2";

    request(trendingUrl,function(err,response,body){
        var data = JSON.parse(body);

        var obj = data.results;

        // console.log(obj);

        var IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

        res.render("index" , {movieArray : obj , imageUrl : IMG_PATH} );
    })
}

function serveDiscoverMovie(req,res){
    var discoverUrl = "https://api.themoviedb.org/3/discover/movie?api_key=4fc655683124e873c9ae9f4cc845e5b2&language=en-US&sort_by=popularity.desc&include_adult=false"

    // var IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

    request(discoverUrl , function(err,response,body){
        var data = JSON.parse(body);
        var obj = data.results;
        // console.log(obj);

        // res.sendFile(__dirname + "/index.html");

        var IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

        res.render("index" , {movieArray : obj , imageUrl : IMG_PATH} );
    })
}

app.listen(port , function(){
    console.log(`Server is running on port ${port}`);
});