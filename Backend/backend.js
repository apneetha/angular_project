var express = require("express");
const axios = require("axios");
var app = express();
const cors = require('cors');
const { query } = require("express");
app.use(cors());

const header = {Authorization : `Bearer qnDP1JKiOEkTox46ZDqBn20cB3pdap6lD9KkhyObP4_KfMiCYlR54LEW3X4k7PQFooaXiqzoXN4KNq4jgi6lPqeI8QxUOEhJTI7XxbQmoH2uiWbU5yU06HLuSLtTY3Yx`};

app.set('trust proxy', true);


//const url="https://google.com"

app.get("/search", async (req, response, next) => {
    console.log("'/' call");

    var query=require ('url').parse(req.url,true).query;
    console.log(query.term);

    const url="https://api.yelp.com/v3/businesses/search?term="+query.term+"&latitude="+query.latitude+"&longitude="+query.longitude+"&categories="+query.categories+"&radius="+query.distance+"&limit=10"
    console.log(url); 
   try {
     //res.send(`HellowORLS`);
    // const res = await axios.get(url,{headers : { Authorization : `Bearer vs-ygwslqp6EgLL83Z5_K4Jspv3GabTpcFABYolfS75mXweV_KOqvVgsg5xYUnW-tb0D3jkc37CHHGf4IkL9kheCs5tieorVrM_HVvlIttuDQFSeoYrTtByMgFguY3Yx`}});
    const res= await axios.get(url,{headers : header}); 
    response.json(res.data);
    console.log(res.data);
    }
   catch (err) {
    next(err)
   }
  })

  app.get("/autocomplete/:text", async (req, response, next) => {

    url='https://api.yelp.com/v3/autocomplete?text='+req.params.text
    console.log(url)

    try { const res= await axios.get(url,{headers : header}); 
        //Formatting JSON response

        console.log(res.data)
        var categories = res.data.categories;
        console.log(categories)
        var terms = res.data.terms;
        console.log(terms)

        var jsonArr = []

        for(var i = 0; i < categories.length; i++)
        {
            jsonArr.push({
                id: i,
                title: categories[i].title
            });
        }

        for(var j=0;j<terms.length;j++)
        {
            jsonArr.push({
                id: j+i,
                title: terms[j].text
            });
        }

       
        business = response.json(jsonArr);
        
     }
    catch (err) {
     next(err)
    }
   })



app.get("/businessinfo/:id", async (req, response, next) => {
  //console.log("'/' call");

 // var querys=require ('url').parse(req.url,true).query;
 console.log(req.params.id);

  const url1="https://api.yelp.com/v3/businesses/" + req.params.id;
  console.log(url1); 
 try {
   //res.send(`HellowORLS`);
  // const res = await axios.get(url,{headers : { Authorization : `Bearer vs-ygwslqp6EgLL83Z5_K4Jspv3GabTpcFABYolfS75mXweV_KOqvVgsg5xYUnW-tb0D3jkc37CHHGf4IkL9kheCs5tieorVrM_HVvlIttuDQFSeoYrTtByMgFguY3Yx`}});
  var res1= await axios.get(url1,{headers : header}); 
  response.json(res1.data);
  console.log(res1.data);
  }
 catch (err) {
  next(err)
 }
})

app.get("/reviews/:rid", async (req, response, next) => {
  //console.log("'/' call");

 // var querys=require ('url').parse(req.url,true).query;
 console.log(req.params.rid);

  const url2="https://api.yelp.com/v3/businesses/" + req.params.rid + "/reviews";
  console.log(url2); 
 try {
   //res.send(`HellowORLS`);
  // const res = await axios.get(url,{headers : { Authorization : `Bearer vs-ygwslqp6EgLL83Z5_K4Jspv3GabTpcFABYolfS75mXweV_KOqvVgsg5xYUnW-tb0D3jkc37CHHGf4IkL9kheCs5tieorVrM_HVvlIttuDQFSeoYrTtByMgFguY3Yx`}});
  var res2= await axios.get(url2,{headers : header}); 
  response.json(res2.data);
  console.log(res2.data);
  }
 catch (err) {
  next(err)
 }
})




const port= 8080;
app.listen(port,()=>
        console.log(`http://localhost:${port}`)
);