const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const Post = require('../models/Post');
const Asset = require('../models/Asset');
const email = require('../models/email');
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

//start system



const doSomethingMain = async () => {
    
    let i=0;
    while (true) {
        
        
        console.log('loop nr', i);
    //count collection and use for loop.
    const count = await Post.count();            
    const countstatus = await Post.count({status: 0});
    console.log('status count: ', countstatus);
    //  console.log('status i: ', i);
 

    
        console.log('scanning startedd');

       
        //code wrapped
        
        const posts = await Post.find({status: 0});
        //console.log('found in db:', posts);
        
        // Mongo DB database values saved to string
        const testlink = posts[i].collection_link.toString();
        const link = "'" + testlink + "'"; // get link from user in database
        const mail = posts[i].email_id.toString();
        const status = posts[i].status;
        const alert = posts[i].alert_floorprice.toString();
        const id = posts[i]._id.toString();
        const cat = posts[i].alert_cat.toString();
         
        const sleep = (time) => {
            return new Promise((resolve) => setTimeout(resolve, time))
          } 
        
        //Scrape link from mongodb database to scrape floor price with cheerio
        await sleep(10000);
        scraperapiClient.get(testlink) //enter link from user in database
        .then(response => {
        html = response;
        const $ = cheerio.load(html);
        
        
        
        //Scrape name
        
        const productName = $('.Blockreact__Block-sc-1xf18x6-0');
           const outputName = productName.find('h2').text();
           console.log('Output', outputName);
        
           
        const articles = []; //array with data html values
        $('h3').each((i, el) => {
        const title = $(el).text(); //extract values as text from html
        
        articles.push(title); // push title (extracted text value to array
        })  //h3 selector bracket close
        
        console.log('scraped:', articles[2]);
    
        
        //Put here
        const doSomething = async () => {
           
             if (1 == 1) {
            
              console.log('check i status: ', i ,'countdb', countstatus, 'alertsetting',alert,'category ',cat , 'Website price', articles[2]);
              
              //condition check if price is higher ten given price
        if (  alert < articles[2] && status == 0 && cat == ">" ){
            console.log('alert: ', articles[2], 'is more then ', alert);
            console.log('send email to ', mail);
            console.log('NFT ', testlink);
        
            const obj = {
                weblink: testlink,
                alertprice: alert,
                webprice: articles[2],
                nftname: outputName
                }
            //send mail
            const message = {
                to: mail,
                from: {
                    name: 'NiftyNotified',
                    email: 'team@niftynotified.com',
                
                },
                subject: `Price alert for ${obj.nftname}`,
                text:`The floor price went higher then ${obj.webprice}`,
                html:`
                <img src="https://s3.amazonaws.com/appforest_uf/f1634648651914x172105244387360060/unnamed%20%287%29.png" alt="Niftynotified" style="width:800px;height:100px;">
             <center>
                <h1 style="color:black" style="font-size:500px">Floor price of ${obj.nftname} is ${obj.webprice}! <h1></center>
                <center><img src="https://s3.amazonaws.com/appforest_uf/f1634783948394x772698948587878400/NNlogoblack.png" width="100" height="100"></center>
                <center><p>NFT Floorprice just went higher then ${obj.alertprice}</p></center>
                <center><a href="${obj.weblink}">
                <img src="https://s3.amazonaws.com/appforest_uf/f1634648463681x225548769958791260/Schermafbeelding%202021-10-19%20om%2014.51.48.png" alt="Nifty notified" style="width:250px;height:75px;">
              </a></center>
              <center><p>You can check out the official collection </p><a href = "${obj.weblink}">here</a></center>
              <center>
              <p>Found what you're looking for? If you no longer wish to receive this type of email from Nifty Notified you can <a href="https://niftynotified.com/unsubscribe_email">unsubscribe</a> here.</p>
          </center>`
            
            };
                
                sgMail
                .send(message)
                .then((respose) => console.log('Email sent...'))
                .catch((error) => console.log(error.message));
        
            // //end send mail
            
            mainnft(); //update status function 
            // set set status to 1
            async function mainnft() {
            const updatedPost = await Post.findByIdAndUpdate({_id: id}, { $set: { status: 1 }});
            }}
            
            //condition check if price is lower ten given price
            if (  alert > articles[2] && status == 0 && cat == "<" ){
            console.log('alert: ', articles[2], 'is lower then ', alert);
            console.log('send email to ', mail);
            console.log('NFT ', testlink);
            
        //send mail
        const obj = {
        weblink: testlink,
        alertprice: alert,
        webprice: articles[2],
        nftname: outputName
        }
        
        const message = {
            to: mail,
            from: {
                name: 'NiftyNotified',
                email: 'team@niftynotified.com',
            
            },
            subject: `Price alert for ${obj.nftname}`,
                text:`The floor price went lower then ${obj.webprice}`,
            html:`
            <img src="https://s3.amazonaws.com/appforest_uf/f1634648651914x172105244387360060/unnamed%20%287%29.png" alt="Niftynotified" style="width:800px;height:100px;">
            <center>
            <h1 style="color:black" style="font-size:500px">Floor price of ${obj.nftname} is ${obj.webprice}! <h1></center>
            <center><img src="https://s3.amazonaws.com/appforest_uf/f1634783948394x772698948587878400/NNlogoblack.png" width="100" height="100"></center>
            <center><p>NFT Floorprice just went lower then ${obj.alertprice}</p></center>
            <center><a href="${obj.weblink}">
            <img src="https://s3.amazonaws.com/appforest_uf/f1634648463681x225548769958791260/Schermafbeelding%202021-10-19%20om%2014.51.48.png" alt="niftynotified" style="width:250px;height:75px;">
          </a></center>
          <center><p>You can check out the official collection </p><a href = "${obj.weblink}">here</a></center>
          <center>
              <p>Found what you're looking for? If you no longer wish to receive this type of email from Nifty Notified you can <a href="https://niftynotified.com/unsubscribe_email">unsubscribe</a> here.</p>
          </center>`
            };
            
            sgMail
            .send(message)
            .then((respose) => console.log('Email sent...'))
            .catch((error) => console.log(error.message));
        
        //end send mail
        
        
            mainnft(); //update status function 
            // set set status to 1
            async function mainnft() {
            const updatedPost = await Post.findByIdAndUpdate({_id: id}, { $set: { status: 1 }});
            }}
            
        }}
      
          doSomething();

          
           
        
        
        }) //scraperapiClient.get(testlink).then
        
        if(i == countstatus-1){
            i=0;
            console.log('reset countt')


        }else{
            i++;
            console.log('plus i++')

        }
           
        
        
        //end here
    
        
            }//end system
            


      }//end while loop
    
      
    doSomethingMain();



  

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

  //Send mail

  router.post('/mail', (req,res) => {
    const postmail = new email({
    email_id: req.body.email_id,
    date: req.body.date
    
    });

    //send mail

    
    const message = {
        to: `${postmail.email_id}`,
        from: {
            name: 'NiftyNotified',
            email: 'team@niftynotified.com',
        
        },
        subject: `Confirm Email`,
        text:`Confirm email`,
        html:`
        <img src="https://s3.amazonaws.com/appforest_uf/f1634648651914x172105244387360060/unnamed%20%287%29.png" alt="Niftynotified" style="width:800px;height:100px;">
     <center>
        <h1 style="color:black" style="font-size:500px">Welcome to Niftynotified <h1></center>
        <center><img src="https://s3.amazonaws.com/appforest_uf/f1633819995856x409271735946314050/niftynotifiedblue.png" width="150" height="150"></center>
        <center><p>Confirm your email so our notifications won't miss your inbox</p></center>
        <center><a href="https://niftynotified.com/email_confirmed/${postmail.email_id}">
        <img src="https://s3.amazonaws.com/appforest_uf/f1634781766593x789815730160737400/CNFRM.png" alt="Nifty notified" style="width:250px;height:75px;">
      </a></center>
      <center>
      <p>If you no longer wish to receive this type of email from Nifty Notified you can <a href="https://niftynotified.com/unsubscribe_email">unsubscribe</a> here.</p>
  </center>`
    
    };
        
        sgMail
        .send(message)
        .then((respose) => console.log('Email sent to...', `${postmail.email_id}`))
        .catch((error) => console.log(error.message));

    // //end send mail
    
    postmail.save()
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