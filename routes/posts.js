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




async function main() {

    const countStatusGlobal = await Post.count({status: 0});
while (0 == 0) {
const count = await Post.count();            
    const countstatus = await Post.count({status: 0});
    let i = 0;
//begin system

console.log('loop i nr', i);
            //count collection and use for loop.
            try {
                console.log('status db count: ', countstatus);  
            console.log('scanning started');
    
            const posts = await Post.find({status: 0});       
            
            const testlink = await posts[i].collection_link.toString();
            await console.log('1 testlink ', testlink);
            const mail = await posts[i].email_id.toString();
            await console.log('2 mail ', mail);
            const status = await posts[i].status;
            await console.log('3 status ', status);
            const alert = await posts[i].alert_floorprice.toString();
            await console.log('4 alert ', alert);
            const id = await posts[i]._id.toString();
            await console.log('5 posts', posts);
            const cat = await posts[i].alert_cat.toString();
            await console.log('6 cat', cat);
    
            await console.log('7 saved al database user posts');
            

 
            scraperapiClient.get(testlink) //enter link from user in database
            .then(response => {
            html = response;
            const $ = cheerio.load(html);
            console.log('0. scraped collection url of user');
    
            //Scrape name
            
            const productName = $('.Blockreact__Block-sc-1xf18x6-0');
               const collectionName = productName.find('h2').text();
               
               console.log('1. scraped name output');
               console.log('2. Output collection name', collectionName);
               
            const priceOpensea = []; //array with data html values
            $('h3').each((i, el) => {
            const title = $(el).text(); //extract values as text from html
            
            priceOpensea.push(title); // push title (extracted text value to array
            })  //h3 selector bracket close
            console.log('3. scraped opensea output');
            console.log('4. scraped price:', priceOpensea[2]);
    
//-------------------------------------------------------------------------------------------------------------

            const doSomething = async () => {
                
    await console.log('5. collection name',collectionName);
    await console.log('6. Price open sea',priceOpensea[2]);
    await console.log('7 while loop count: ', i );
    
    // await console.log('8. While loop nr: ', i ,'countdb', countstatus, 'alertprice',alert,'status post ',status , 'Website price', priceOpensea[2],'category ',cat);
       //condition check if price is higher ten given price
     await console.log('9. Openseaprice: ', priceOpensea[2], 'higher then', alert,'status post ',status ,'category ',cat && mail != "reset");
       if ( priceOpensea[2] > alert  && status == 0 && cat == ">" && mail != "reset"){
        
        console.log('10. send email to ', mail);
        console.log('111. NFT ', testlink);
        
    
        const obj = {
            weblink: testlink,
            alertprice: alert,
            webprice: priceOpensea[2],
            nftname: collectionName
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
            <center><img src="https://s3.amazonaws.com/appforest_uf/f1634954969515x790210381363402200/Nifty-neon1-transparent.png" width="250" height="250"></center>
            <center><p>NFT Floorprice just went higher then ${obj.alertprice}</p></center>
            <center><a href="${obj.weblink}">
            <img src="https://s3.amazonaws.com/appforest_uf/f1634648463681x225548769958791260/Schermafbeelding%202021-10-19%20om%2014.51.48.png" alt="Nifty notified" style="width:250px;height:75px;">
          </a></center>
          <center><p>You can check out the official collection </p><a href = "${obj.weblink}">here</a></center>
          <center>
          <p>Found what you're looking for? If you no longer wish to receive this type of email from Nifty Notified you can <a href="https://niftynotified.com/unsubscribe_email">unsubscribe</a> here.</p>
      </center>`
            };
    
            console.log('Send mail');
            sgMail
            .send(message)
            .then((respose) => console.log('Email sent...'))
            .catch((error) => console.log(error.message));

            const updatedPost = await Post.findByIdAndUpdate({_id: id}, { $set: { status: 1 }});
            console.log('database status set to 1', "loop nummer: ", i);
            
    }//end if statement
        
    // await console.log('8 tweede. While loop nr: ', i ,'countdb', countstatus, 'alertprice',alert,'status post ',status , 'Website price', priceOpensea[2],'category ',cat);
    await console.log('9. openseaprice: ', priceOpensea[2], 'is lower then ', alert,'status post ',status ,'category ',cat);
   
    if ( priceOpensea[2] < alert && status == 0 && cat == "<" && mail != "reset" ){
       
        console.log('10. send email to ', mail);
        console.log('11. NFT ', testlink);
        
    
        const obj = {
            weblink: testlink,
            alertprice: alert,
            webprice: priceOpensea[2],
            nftname: collectionName
            }
    
        //send mail
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
            <center><img src="https://s3.amazonaws.com/appforest_uf/f1634954969515x790210381363402200/Nifty-neon1-transparent.png" width="250" height="250"></center>
            <center><p>NFT Floorprice just went lower then ${obj.alertprice}</p></center>
            <center><a href="${obj.weblink}">
            <img src="https://s3.amazonaws.com/appforest_uf/f1634648463681x225548769958791260/Schermafbeelding%202021-10-19%20om%2014.51.48.png" alt="Nifty notified" style="width:250px;height:75px;">
          </a></center>
          <center><p>You can check out the official collection </p><a href = "${obj.weblink}">here</a></center>
          <center>
          <p>Found what you're looking for? If you no longer wish to receive this type of email from Nifty Notified you can <a href="https://niftynotified.com/unsubscribe_email">unsubscribe</a> here.</p>
      </center>`
            };
    
            console.log('Send mail 2');
            sgMail
            .send(message)
            .then((respose) => console.log('Email sent...'))
            .catch((error) => console.log(error.message));
    
            const updatedPost = await Post.findByIdAndUpdate({_id: id}, { $set: { status: 1 }});
            console.log('database status set to 1', "loop nummer: ", i);
            
            
    //end send mail
    //update status function 
        
        
        
        }//einde if statement
    
    
        console.log('Loop nummer ', i);
    
    
               
            }
            doSomething();
            
           
             
    }) //scraperapiClient.get(testlink).then
} catch (error) {
                
    console.log(error);
    console.log('error catched restart now');
    i = 0;
    }

    
//end system

// if condition is true 
console.log('Loop official counter number: ', i);
i += 1;
await sleep2(30000);
}
// if condition is false
i=0;
console.log('reset', 'mail status');
// await sleep2(1000);
// main();
console.log('restarted after 20 sec');
}



function sleep2(ms) {
return new Promise((accept) => {
setTimeout(() => {
    accept();
}, ms);


}) //function accept()



} //function main


main();



//loop to check status server and restart loop if crashed
// async function mainrestart() {

    
//     let count = 0;
// while (count < 20) {
    
// console.log(count,'testlink: '. testlink);
// count += 1;
// await sleeprestart(1000);
// }
// i=0;
// console.log('reset');
// main();
// }

// mainrestart();

// function sleeprestart(ms) {
// return new Promise((accept) => {
// setTimeout(() => {
//     accept();
// }, ms);


// }) //function accept()



// } //function main


//end loop restart bracket


//save asset
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
            <center><img src="https://s3.amazonaws.com/appforest_uf/f1634954969515x790210381363402200/Nifty-neon1-transparent.png" width="250" height="250"></center>
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


//Get back all the post
router.get('/resetnow', async (req, res) => {
    try {
main();
res.json('gelukt');
    } catch (err) {
        res.json({ message: err });
        }
});

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