const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const Post = require('../models/Post');
const Asset = require('../models/Asset');
const sdk = require('api');
const contracts = require('../models/contracts');
const cheerio = require('cheerio');
const scraperapiClient = require('scraperapi-sdk')('d9e600fc58fcacdbccc251fb5929bfbe');
const BSON = require('bson');
const { count } = require('../models/Post');
const Long = BSON.Long;
const sgMail = require('@sendgrid/mail') 

API_KEY = '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';

sgMail.setApiKey(API_KEY)

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

const router = express.Router();


//Get back all the post
router.get('/', async (req, res) => {
    try {
const posts = await Post.find();;
res.json(posts);
    } catch (err) {
        res.json({ message: err });
        }
});


const doSomethingMain = async () => {
    let i = 0;
    //count collection and use for loop.
    const count = await Post.count();            
    const countstatus = await Post.count({status: 0});


    if (countstatus > 0 || countstatus == 0) {
       await sleep(10000)
      console.log(i)
      console.log('status count: ', countstatus);
//code wrapped

const posts = await Post.find({status: 0});
console.log('found in db:', posts);

// Mongo DB database values saved to string
const testlink = posts[i].collection_link.toString();
const link = "'" + testlink + "'"; // get link from user in database
const mail = posts[i].email_id.toString();
const status = posts[i].status;
const alert = posts[i].alert_floorprice.toString();
const id = posts[i]._id.toString();
const cat = posts[i].alert_cat.toString();
//console.log(testlink);

if(countstatus > 0){
    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time))
      }

      

//Scrape link from mongodb database to scrape floor price with cheerio

scraperapiClient.get(testlink) //enter link from user in database
.then(response => {
html = response;
const $ = cheerio.load(html);
const articles = [] //array with data html values
$('h3').each((i, el) => {
const title = $(el).text(); //extract values as text from html
articles.push(title); // push title (extracted text value to array
//console.log('testlink', testlink);
console.log('scraped:', articles[2]);

//Put here
const doSomething = async () => {
    let i = 0;
    for (let i = 0; i < 1; i++) {
       await sleep(10000)
      console.log('Waiting 10 sec: ', 'Round:', i)
      console.log('alert: ', alert, 'is more then ', articles[2]);
      //condition check if price is higher ten given price
if (  alert > articles[2] && status == 0 && cat == ">" ){
    console.log('alert: ', alert, 'is more then ', articles[2]);
    console.log('send email to ', mail);
    console.log('NFT ', testlink);

    //send mail
    // const message = {
    //     to: mail,
    //     from: {
    //         name: 'NiftyNotified',
    //         email: 'team@niftynotified.com',
        
    //     },
    //     subject: 'Hello from sendgrid',
    //     text:'The floor price is lower then ......',
    //     html:'<center><h1 style="color:black" style="font-size:500px">You have a new notification<h1></center><center><img src="https://s3.amazonaws.com/appforest_uf/f1633819995856x409271735946314050/niftynotifiedblue.png" width="200" height="200"></center><center><p>Apegang NFT floorprice of 0.64 became below price 0.51</p></center><center><a href="https://opensea.io">Go to collection page</a></center>'
        
    //     };
        
    //     sgMail
    //     .send(message)
    //     .then((respose) => console.log('Email sent...'))
    //     .catch((error) => console.log(error.message));

    // //end send mail
    
    mainnft(); //update status function 
    // set set status to 1
    async function mainnft() {
    const updatedPost = await Post.findByIdAndUpdate({_id: id}, { $set: { status: 1 }});
    }}
    
    //condition check if price is lower ten given price
    if (  alert < articles[2] && status == 0 && cat == "<" ){
    console.log('alert: ', alert, 'is lower then ', articles[2]);
    console.log('send email to ', mail);
    console.log('NFT ', testlink);
    
//send mail
// const message = {
//     to: mail,
//     from: {
//         name: 'NiftyNotified',
//         email: 'team@niftynotified.com',
    
//     },
//     subject: 'Hello from sendgrid',
//     text:'The floor price is lower then ......',
//     html:'<center><h1 style="color:black" style="font-size:500px">You have a new notification<h1></center><center><img src="https://s3.amazonaws.com/appforest_uf/f1633819995856x409271735946314050/niftynotifiedblue.png" width="200" height="200"></center><center><p>Apegang NFT floorprice of 0.64 became below price 0.51</p></center><center><a href="https://opensea.io">Go to collection page</a></center>'
    
//     };
    
//     sgMail
//     .send(message)
//     .then((respose) => console.log('Email sent...'))
//     .catch((error) => console.log(error.message));

//end send mail


    mainnft(); //update status function 
    // set set status to 1
    async function mainnft() {
    const updatedPost = await Post.findByIdAndUpdate({_id: id}, { $set: { status: 1 }});
    }}
      
      i++
    }
  }
  
  doSomething()
//end here




}) //scraperapiClient.get(testlink).then
})  //h3 selector bracket close

}// countstatus bracket close
// console.log('timeout');

if(countstatus == 0){

console.log('scanning')
}


//code wrapped end


      i++
    }
  }
  
//  doSomethingMain()

 const sleep2 = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
  
  const doSomethingloop = async () => {
    let i = 0;
    const countstatus = await Post.count({status: 0});
while(countstatus > 0 || countstatus == 0){
    
    if(countstatus > 100){
        console.log('loop restarted now after 10 sec')
        await sleep2(10000)
        doSomethingMain()
    
    }
    if(countstatus == 100){
        console.log('Count is nu 0 10 min break')
        await sleep2(100000)
        doSomethingMain()
    
    }
    i++
}
    
      
     
  }
  
    doSomethingloop()
  
  
 
    
    




  

//Get back all the post
router.get('/contracts', async (req, res) => {
    try {
const posts = await contracts.find();;
res.json(posts);
    } catch (err) {
        res.json({ message: err });
        }
});



    //Submits a post

router.post('/', (req,res) => {
const post = new Post({
email_id: req.body.email_id,
// user_id: req.body.discord_id,
collection_link: req.body.collection_link,
alert_floorprice: req.body.alert_floorprice,
// alert_type: req.body.alert_type,
alert_cat: req.body.alert_cat,
status: req.body.status


});

post.save()
.then(data => {
res.json(data);

})
.catch(err => { 
    res.json({ message: err });
    });

});

//save asset

router.post('/assetnew', (req,res) => {
    const post = new Asset({
    email_id: req.body.email_id,
    user_id: req.body.discord_id,
    contract: req.body.contract,
    asset_number: req.body.asset_number,
    alert_price: req.body.alert_price,
    // alert_type: req.body.alert_type,
    alert_cat: req.body.alert_cat,
    status: req.body.status
    
    
    });
    
    post.save()
    .then(data => {
    res.json(data);
    
    })
    .catch(err => { 
        res.json({ message: err });
        });
    
    });

//Specific post
router.get('/:postId', async (req, res) => {
    try {
const post = await Post.findById(req.params.postId);
res.json(post);
    }catch (err) {

res.json({ message: err});

    }

    console.log(req.params.postId);
});

// Delete Post
router.delete('/:postId', async (req,res) => {
    try{
const removedPost = await Post.remove({_id: req.params.postId});
res.json(removedPost);
}catch (err) {
    res.json({ message: err});

}


});

//Update post

router.patch('/:postId', async (req,res) => {
    try{
const updatedPost = await Post.updateOne(
    {_id: req.params.postId },
{ $set: { title: req.body.title }}
);
res.json(updatedPost);
} catch (err) {
    res.json({ message: err});

}
    });

module.exports = router;