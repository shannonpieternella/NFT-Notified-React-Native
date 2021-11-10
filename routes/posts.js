const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const Post = require('../models/Post');
const Asset = require('../models/Asset');
const email = require('../models/email');
const sdk = require('api');
const contracts = require('../models/contracts');
const collections = require('../models/collections');
const cheerio = require('cheerio');
const scraperapiClient = require('scraperapi-sdk')('d9e600fc58fcacdbccc251fb5929bfbe');
const BSON = require('bson');
const { count, collection } = require('../models/Post');
const Long = BSON.Long;
const sgMail = require('@sendgrid/mail') 
const postmark = require("postmark");
const { post } = require('scraperapi-sdk/src/scrape-url-request');
const client = new postmark.Client("aba6fd3e-f215-4519-baa8-94614a8ca920");


API_KEY = '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';

sgMail.setApiKey(API_KEY)

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  } 

const router = express.Router();


router.get('/filter/:postId', async (req,res) => {
    try{
const updatedPost = await collections.findOne(
    {collection_name: req.params.postId },
// { $set: { title: req.body.title }}
);
res.json(updatedPost);
} catch (err) {
    res.json({ message: err});

}
    });

    // change individual post

    router.get('/updatepost/:postId/:uniqueId', async (req,res) => {
        try{
    if(req.params.postId == "true"){
        const updatedPost3 = await Post.findByIdAndUpdate({_id: req.params.uniqueId}, { $set: { pushswitch: true }});
        res.json("Updated True");
    } else {
        const updatedPost4 = await Post.findByIdAndUpdate({_id: req.params.uniqueId}, { $set: { pushswitch: false }});
        res.json("Updated false");
    }
           
    
    } catch (err) {
        res.json({ message: err});
    
    }
        });   
    //User collection display settings 

    router.get('/usersettings/:postId', async (req,res) => {
        try{
    const updatedPost = await Post.find(
        {email_id: req.params.postId}, //creer dit in collectie
    // { $set: { title: req.body.title }}
    );
    res.json(updatedPost);
    } catch (err) {
        res.json({ message: err});
    
    }
        });

//filtercollection

router.post('/filtercollection', (req,res) => {
    
    const filter=req.body.filternow;
   
    
    res.json(filter);
    
    
  
        

    }); //end request

    

//Get back all the post
router.get('/', async (req, res) => {
    try {
const posts = await Post.find();;
res.json(posts);
    } catch (err) {
        res.json({ message: err });
        }
});

//Get back all collections
router.get('/collecties', async (req, res) => {
    try {
const posts = await collections.find();;
res.json(posts);
    } catch (err) {
        res.json({ message: err });
        }
});

//Get back all collections queries
router.get('/collectiequery/:search', async (req, res) => {
    try {
       const searchnow = req.params.search;
const posts = await Post.find({email_id: {$regex:searchnow}});;
res.json(posts);
    } catch (err) {
        res.json({ message: err });
        }
});

//Get back all the post
router.get('/delete', async (req, res) => {
    try {
const posts = await Post.deleteMany({status:1});;
res.json(posts);
    } catch (err) {
        res.json({ message: err });
        }
});






async function main() {

    const countStatusGlobal = await collections.count();
    let i = -1;
    
while (i < countStatusGlobal) {
const countCollectie = await collections.count();            
    const collections1 = await collections.find();
    i += 1;
    //console.log('Collecties count', countCollectie, 'Collecties', collections1);  
//begin system

try {
    const collectieURL = await collections1[i].collection_link.toString();
   // await console.log('1. CollectieURL ', collectieURL);
    const floorPrijs = await collections1[i].floorprice.toString();
   // await console.log('2. Floorprice ', floorPrijs);
    const CollectieNaam = await collections1[i].collection_name.toString();
   // await console.log('3. CollectieNaam ', CollectieNaam);
    const id = await collections1[i]._id.toString();
          //  await console.log('4 ID', id);
//Scrape function

scraperapiClient.get(collectieURL)
.then(response => {
 //console.log(response)
 html = response
 
 //console.log(html)
 const $ = cheerio.load(html)

//  //scrape price
   const productPrice = $('.Overflowreact__OverflowContainer-sc-10mm0lu-0');
    const outputPrice = productPrice.eq(2).text();
    //console.log('5. Outputprice', i , outputPrice);

   //scrape name

   const productName = $('.Blockreact__Block-sc-1xf18x6-0');
   const outputName = productName.find('h2').text();
   console.log('OutputNamesrc', outputName);

    
    const doSomething = async () => {

        const updatedPost = await collections.findByIdAndUpdate({_id: id}, { $set: { floorprice: outputPrice }});
                  // console.log('6. database', collectieURL, "prijs geupdate naar: ", outputPrice);

                  const updatedPost2 = await collections.findByIdAndUpdate({_id: id}, { $set: { collection_name: outputName }});
                  // console.log('6. database', collectieURL, "prijs geupdate naar: ", outputPrice);
           }
       
        doSomething();
       
       //end scrapefunction
    

    

 }) // end scraper

 



} catch (error) {
    
} // catch bracket
 

await sleep2(10000);
//console.log('sleep 10sec');
} 

// if condition is false
i=-1;
main();
//console.log('reset', 'condition false');

}



function sleep2(ms) {
return new Promise((accept) => {
setTimeout(() => {
    accept();
}, ms);


}) //function accept()



} //function main


main();

async function compareFunction() {
    const countStatusGlobal = await Post.count();
    const countCollectionsOfficialDb = await collections.count();
    let i = -1;
    
while (i < countCollectionsOfficialDb) {
        
    i += 1;

    try {
        
 await sleep2(1000);
    

    //Krijg alle collections url updates prices in db //save object then extract values with dots
    const collectiesWeb = await collections.find();
    const collectionWebUrl = await collectiesWeb[i].collection_link.toString();
    const collectionDbPrice = await collectiesWeb[i].floorprice.toString();
    const collectionName = await collectiesWeb[i].collection_name.toString();
    console.log("count of all posts: ", i);

    const collectiesUserCount = await Post.count({status:0, collection_link:collectionWebUrl});
    for (let x = 0; x < collectiesUserCount; x++) {
        //User form db gegevens
        
    const collectiesUser = await Post.find({status:0, collection_link:collectionWebUrl});    
    const emailId = await collectiesUser[x].email_id.toString();
    const collectionUrlUser = await collectiesUser[x].collection_link.toString();
    const collectionPriceUser = await collectiesUser[x].alert_floorprice.toString();
    const collectionAlert = await collectiesUser[x].alert_cat.toString();
    const userId = await collectiesUser[x]._id.toString();
    const collectionUserStatus = await collectiesUser[x].status.toString();


    console.log(collectionUrlUser, '==', collectionWebUrl, '&&', collectionDbPrice, '<', collectionPriceUser, '&&', collectionAlert, '==', "<");
    console.log("user id",userId);
    if(collectionUrlUser == collectionWebUrl && collectionDbPrice < collectionPriceUser && collectionAlert == "<" && collectionName != "noname"){
console.log('Email sent to', emailId)
console.log('Price was Lower');

//Email function

const obj = {
    weblink: collectionUrlUser,
    alertprice: collectionPriceUser,
    webprice: collectionDbPrice,
    nftname: collectionName
    } 

client.sendEmail({
  "From": "team@niftynotified.com",
  "To": emailId,
  "Subject": `Price alert for ${obj.nftname}`,
  "TextBody": `The floor price went lower then ${obj.webprice}`,
  "HtmlBody": `<html>
  <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0;">
       <meta name="format-detection" content="telephone=no"/>
  
      <!-- Responsive Mobile-First Email Template by Konstantin Savchenko, 2015.
      https://github.com/konsav/email-templates/  -->
  
      <style>
  /* Reset styles */ 
  body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;}
  body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; }
  img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
  #outlook a { padding: 0; }
  .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
  .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
  
  /* Rounded corners for advanced mail clients only */ 
  @media all and (min-width: 560px) {
      .container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px;}
  }
  
  /* Set color for auto links (addresses, dates, etc.) */ 
  a, a:hover {
      color: #127DB3;
  }
  .footer a, .footer a:hover {
      color: #FFFFFF;
  }
  
       </style>
  
      <!-- MESSAGE SUBJECT -->
      <title>Niftynotified</title>
  
  </head>
  
  <!-- BODY -->
  <!-- Set message background color (twice) and text color (twice) -->
  <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
      background-color: #FFFFFF;
      color: #FFFFFF;"
      bgcolor="#FFFFFF"
      text="#FFFFFF">
  
  <!-- SECTION / BACKGROUND -->
  <!-- Set message background color one again -->
  <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background"><tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
      bgcolor="#FFFFFF">
  
  <!-- WRAPPER -->
  <!-- Set wrapper width (twice) -->
  <table border="0" cellpadding="0" cellspacing="0" align="center"
      width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
      max-width: 560px;" class="wrapper">
  
      <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
              padding-top: 20px;
              padding-bottom: 20px;">
  
              <!-- PREHEADER -->
              <!-- Set text color to background color -->
              <div style="display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0;
              color: #F0F0F0;" class="preheader">
                  </div>
  
              <!-- LOGO -->
              <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2. URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content=logo&utm_campaign={{Campaign-Name}} -->
              <a target="_blank" style="text-decoration: none;"
                  href="https://github.com/konsav/email-templates/"><img border="0" vspace="0" hspace="0"
                  src="https://s3.amazonaws.com/appforest_uf/f1634648651914x172105244387360060/unnamed%20%287%29.png"
                  width="640" height="100"
                  alt="Logo" title="Logo" style="
                  color: #FFFFFF;
                  font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
  
          </td>
      </tr>
  
  <!-- End of WRAPPER -->
  </table>
  
  <!-- WRAPPER / CONTEINER -->
  <!-- Set conteiner background color -->
  <table border="0" cellpadding="0" cellspacing="0" align="center"
      bgcolor="#FFFFFF"
      width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
      max-width: 560px;" class="container">
  
      <!-- HEADER -->
      <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
      <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 35px; font-weight:normal; line-height: 130%;
              padding-top: 0px;
              color: #000000;
              font-family: Tahoma;" class="header">
                  Floor price of ${obj.nftname} is ${obj.webprice}! 
          </td>
      </tr>
      
      <!-- SUBHEADER -->
      <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
      <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
              padding-top: 0px;
              color: #000000;
              font-family: Tahoma;" class="subheader">
                  
          </td>
      </tr>
  
      <!-- HERO IMAGE -->
      <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 (wrapper x2). Do not set height for flexible images (including "auto"). URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Ìmage-Name}}&utm_campaign={{Campaign-Name}} -->
      <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
              padding-top: 0px;" class="hero"><a target="_blank" style="text-decoration: none;"
              href="https://s3.amazonaws.com/appforest_uf/f1634954464827x859168007813302800/Naamloos-13.png"><img src="https://s3.amazonaws.com/appforest_uf/f1634954969515x790210381363402200/Nifty-neon1-transparent.png" width="225" height="150"></a></td>
      </tr>
  
      <!-- PARAGRAPH -->
      <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
      <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 300; line-height: 160%;
              padding-top: 0px; 
              color: #000000;
              font-family: Tahoma;" class="paragraph">
                  NFT Floorprice just went lower then ${obj.alertprice}
          </td>
      </tr>
  
      <!-- BUTTON 2-->
      <!-- Set button background color at TD, link/text color at A and TD, font family ("sans-serif" or "Georgia, serif") at TD. For verification codes add "letter-spacing: 5px;". Link format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Button-Name}}&utm_campaign={{Campaign-Name}} -->
      <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
              padding-top: 25px;
              padding-bottom: 5px;" class="button"><a
              href="https://github.com/konsav/email-templates/" target="_blank" style="">
              <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 500px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;"><tr><td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 40px; -webkit-border-radius: 40px; -moz-border-radius: 40px; -khtml-border-radius: 40px;"
              bgcolor="#FFFFFF"><a href="${obj.weblink}?search[sortAscending]=true&search[sortBy]=PRICE&search[toggles][0]=BUY_NOW">
                  <img src="https://s3.amazonaws.com/appforest_uf/f1634648463681x225548769958791260/Schermafbeelding%202021-10-19%20om%2014.51.48.png" alt="Nifty notified" style="width:350px;height:100px;">
                </a>
              </td></tr></table></a>
          </td>
      </tr>
  
      <!-- LINE -->
      <!-- Set line color -->
      <tr>	
          
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
              padding-top: 25px;" class="line"><hr
              color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
          </td>
      </tr>
  
      <!-- PARAGRAPH -->
      <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
      <tr>
          
      </tr>
  
  <!-- End of WRAPPER -->
  </table>
  
  <!-- WRAPPER -->
  <!-- Set wrapper width (twice) -->
  <table border="0" cellpadding="0" cellspacing="0" align="center"
      width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
      max-width: 560px;" class="wrapper">
  
      <!-- SOCIAL NETWORKS
      <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
      <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
              padding-top: 25px;" class="social-icons"><table
              width="256" border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse: collapse; border-spacing: 0; padding: 0;">
              <tr>
  
                  <!-- ICON 1 -->
                  <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                      href="https://discord.gg/SUpaEYwHa4"
                  style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                      color: #000000;"
                      alt="F" title="Facebook"
                      width="44" height="44"
                      src="https://www.freeiconspng.com/uploads/discord-black-icon-1.png"></a></td>
  
                  <!-- ICON 2 -->
                  <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                      href="https://t.me/niftynotified"
                  style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                      color: #000000;"
                      alt="T" title="Twitter"
                      width="44" height="35"
                      src="https://listimg.pinclipart.com/picdir/s/369-3694761_telegram-logo-png-telegram-logo-white-png-clipart.png"></a></td>				
  
                  <!-- ICON 3 -->
                  <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                      href="https://mobile.twitter.com/goniftynotified"
                  style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                      color: #000000;"
                      alt="G" title="Google Plus"
                      width="44" height="35"
                      src="https://toppng.com/uploads/preview/follow-me-gold-twitter-icon-vector-11563031490l4vyrkbrdu.png"></a></td>		
  
                  
              </tr> -->
              </table>
          </td>
      </tr>
  
      <!-- FOOTER -->
      <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
      <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
              padding-top: 20px;
              padding-bottom: 20px;
              color: #000000;
              font-family: sans-serif;" class="footer">
  
                  Found what you're looking for? If you no longer wish to receive this type of email from Nifty Notified you can unsubscribe.
  
   <a href="https://niftynotified.com/unsubscribe_email" target="_blank" style="text-decoration: underline; color: #000000; font-family: sans-serif; font-size: 13px; font-weight: 400; line-height: 150%;">here</a> .
  
                  
  
          </td>
      </tr>
  
  <!-- End of WRAPPER -->
  </table>
  
  <!-- End of SECTION / BACKGROUND -->
  </td></tr></table>
  
  </body>
  </html>`
});

//End email function




const doSomething = async () => {

    const updatedPost = await Post.findByIdAndUpdate({_id:userId}, { $set: { status: 1 }});
              // console.log('6. database', collectieURL, "prijs geupdate naar: ", outputPrice);

       }
   
    doSomething();

    }

    if(collectionUrlUser == collectionWebUrl && collectionDbPrice > collectionPriceUser && collectionAlert == ">" && collectionName != "noname"){
        console.log('Email sent to', emailId);
        console.log('Price was Higher');
        

    //Send mail function
    const obj = {
        weblink: collectionUrlUser,
        alertprice: collectionPriceUser,
        webprice: collectionDbPrice,
        nftname: collectionName
        } 
    
    client.sendEmail({
      "From": "team@niftynotified.com",
      "To": emailId,
      "Subject": `Price alert for ${obj.nftname}`,
      "TextBody": `The floor price went higher then ${obj.webprice}`,
      "HtmlBody": `<html>
      <head>
          <meta http-equiv="content-type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0;">
           <meta name="format-detection" content="telephone=no"/>
      
          <!-- Responsive Mobile-First Email Template by Konstantin Savchenko, 2015.
          https://github.com/konsav/email-templates/  -->
      
          <style>
      /* Reset styles */ 
      body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;}
      body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; }
      img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
      #outlook a { padding: 0; }
      .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
      
      /* Rounded corners for advanced mail clients only */ 
      @media all and (min-width: 560px) {
          .container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px;}
      }
      
      /* Set color for auto links (addresses, dates, etc.) */ 
      a, a:hover {
          color: #127DB3;
      }
      .footer a, .footer a:hover {
          color: #FFFFFF;
      }
      
           </style>
      
          <!-- MESSAGE SUBJECT -->
          <title>Niftynotified</title>
      
      </head>
      
      <!-- BODY -->
      <!-- Set message background color (twice) and text color (twice) -->
      <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
          background-color: #FFFFFF;
          color: #FFFFFF;"
          bgcolor="#FFFFFF"
          text="#FFFFFF">
      
      <!-- SECTION / BACKGROUND -->
      <!-- Set message background color one again -->
      <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background"><tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
          bgcolor="#FFFFFF">
      
      <!-- WRAPPER -->
      <!-- Set wrapper width (twice) -->
      <table border="0" cellpadding="0" cellspacing="0" align="center"
          width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
          max-width: 560px;" class="wrapper">
      
          <tr>
              <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                  padding-top: 20px;
                  padding-bottom: 20px;">
      
                  <!-- PREHEADER -->
                  <!-- Set text color to background color -->
                  <div style="display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0;
                  color: #F0F0F0;" class="preheader">
                      </div>
      
                  <!-- LOGO -->
                  <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2. URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content=logo&utm_campaign={{Campaign-Name}} -->
                  <a target="_blank" style="text-decoration: none;"
                      href="https://github.com/konsav/email-templates/"><img border="0" vspace="0" hspace="0"
                      src="https://s3.amazonaws.com/appforest_uf/f1634648651914x172105244387360060/unnamed%20%287%29.png"
                      width="640" height="100"
                      alt="Logo" title="Logo" style="
                      color: #FFFFFF;
                      font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
      
              </td>
          </tr>
      
      <!-- End of WRAPPER -->
      </table>
      
      <!-- WRAPPER / CONTEINER -->
      <!-- Set conteiner background color -->
      <table border="0" cellpadding="0" cellspacing="0" align="center"
          bgcolor="#FFFFFF"
          width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
          max-width: 560px;" class="container">
      
          <!-- HEADER -->
          <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
          <tr>
              <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 35px; font-weight:normal; line-height: 130%;
                  padding-top: 0px;
                  color: #000000;
                  font-family: Tahoma;" class="header">
                      Floor price of ${obj.nftname} is ${obj.webprice}! 
              </td>
          </tr>
          
          <!-- SUBHEADER -->
          <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
          <tr>
              <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
                  padding-top: 0px;
                  color: #000000;
                  font-family: Tahoma;" class="subheader">
                      
              </td>
          </tr>
      
          <!-- HERO IMAGE -->
          <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 (wrapper x2). Do not set height for flexible images (including "auto"). URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Ìmage-Name}}&utm_campaign={{Campaign-Name}} -->
          <tr>
              <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
                  padding-top: 0px;" class="hero"><a target="_blank" style="text-decoration: none;"
                  href="https://s3.amazonaws.com/appforest_uf/f1634954464827x859168007813302800/Naamloos-13.png"><img src="https://s3.amazonaws.com/appforest_uf/f1634954969515x790210381363402200/Nifty-neon1-transparent.png" width="225" height="150"></a></td>
          </tr>
      
          <!-- PARAGRAPH -->
          <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
          <tr>
              <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 300; line-height: 160%;
                  padding-top: 0px; 
                  color: #000000;
                  font-family: Tahoma;" class="paragraph">
                      NFT Floorprice just went higher then ${obj.alertprice}
              </td>
          </tr>
      
          <!-- BUTTON 1-->
          <!-- Set button background color at TD, link/text color at A and TD, font family ("sans-serif" or "Georgia, serif") at TD. For verification codes add "letter-spacing: 5px;". Link format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Button-Name}}&utm_campaign={{Campaign-Name}} -->
          <tr>
              <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                  padding-top: 25px;
                  padding-bottom: 5px;" class="button"><a
                  href="https://github.com/konsav/email-templates/" target="_blank" style="">
                  <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 500px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;"><tr><td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 40px; -webkit-border-radius: 40px; -moz-border-radius: 40px; -khtml-border-radius: 40px;"
                  bgcolor="#FFFFFF"><a href="${obj.weblink}?search[sortAscending]=true&search[sortBy]=PRICE&search[toggles][0]=BUY_NOW">
                      <img src="https://s3.amazonaws.com/appforest_uf/f1634648463681x225548769958791260/Schermafbeelding%202021-10-19%20om%2014.51.48.png" alt="Nifty notified" style="width:350px;height:100px;">
                    </a>
                  </td></tr></table></a>
              </td>
          </tr>
      
          <!-- LINE -->
          <!-- Set line color -->
          <tr>	
              
              <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                  padding-top: 25px;" class="line"><hr
                  color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
              </td>
          </tr>
      
          <!-- PARAGRAPH -->
          <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
          <tr>
              
          </tr>
      
      <!-- End of WRAPPER -->
      </table>
      
      <!-- WRAPPER -->
      <!-- Set wrapper width (twice) -->
      <table border="0" cellpadding="0" cellspacing="0" align="center"
          width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
          max-width: 560px;" class="wrapper">
      
          <!-- SOCIAL NETWORKS
          <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
          <tr>
              <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                  padding-top: 25px;" class="social-icons"><table
                  width="256" border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse: collapse; border-spacing: 0; padding: 0;">
                  <tr>
      
                      <!-- ICON 1 -->
                      <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                          href="https://discord.gg/SUpaEYwHa4"
                      style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                          color: #000000;"
                          alt="F" title="Facebook"
                          width="44" height="44"
                          src="https://www.freeiconspng.com/uploads/discord-black-icon-1.png"></a></td>
      
                      <!-- ICON 2 -->
                      <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                          href="https://t.me/niftynotified"
                      style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                          color: #000000;"
                          alt="T" title="Twitter"
                          width="44" height="35"
                          src="https://listimg.pinclipart.com/picdir/s/369-3694761_telegram-logo-png-telegram-logo-white-png-clipart.png"></a></td>				
      
                      <!-- ICON 3 -->
                      <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                          href="https://mobile.twitter.com/goniftynotified"
                      style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                          color: #000000;"
                          alt="G" title="Google Plus"
                          width="44" height="35"
                          src="https://toppng.com/uploads/preview/follow-me-gold-twitter-icon-vector-11563031490l4vyrkbrdu.png"></a></td>		
      
                      
                  </tr> -->
                  </table>
              </td>
          </tr>
      
          <!-- FOOTER -->
          <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
          <tr>
              <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
                  padding-top: 20px;
                  padding-bottom: 20px;
                  color: #000000;
                  font-family: sans-serif;" class="footer">
      
                      Found what you're looking for? If you no longer wish to receive this type of email from Nifty Notified you can unsubscribe.
      
       <a href="https://niftynotified.com/unsubscribe_email" target="_blank" style="text-decoration: underline; color: #000000; font-family: sans-serif; font-size: 13px; font-weight: 400; line-height: 150%;">here</a> .
      
                      
      
              </td>
          </tr>
      
      <!-- End of WRAPPER -->
      </table>
      
      <!-- End of SECTION / BACKGROUND -->
      </td></tr></table>
      
      </body>
      </html>`
    });
    //End send mail function



        const doSomething = async () => {

            const updatedPost = await Post.findByIdAndUpdate({_id:userId}, { $set: { status: 1 }});
                      // console.log('6. database', collectieURL, "prijs geupdate naar: ", outputPrice);
               }
           
            doSomething();
           
        
            }
    
    console.log("Count",collectiesUserCount);
console.log('sleep 0sec gangg', i);  


      }// end for loop
      
    

} catch (error) {
        console.log(error);
}//end catch bracket

} // if condition is false


i=-1;
compareFunction();
console.log('reset', 'condition false gang', i);

}



function sleep3(ms) {
return new Promise((accept) => {
setTimeout(() => {
    accept();
}, ms);


}) //function accept()


}// brack function end






compareFunction()


//Submits collections post

router.post('/collectionsnow', (req,res) => {
    const CollectionPost = new collections({
    collection_link: req.body.collection_link,
    floorprice: req.body.floorprice,
    collection_name: req.body.collection_name
    
    });
    
    CollectionPost.save()
    .then(data => {
    res.json(data);
    
    })
    .catch(err => { 
        res.json({ message: err });
        });

        

    }); //end request



 //Submits user post

 router.post('/', async (req,res) => {
    const post = new Post({
    email_id: req.body.email_id,
    collection_link: req.body.collection_link,
    alert_floorprice: req.body.alert_floorprice,
    alert_cat: req.body.alert_cat,
    status: req.body.status,
    pushkey: req.body.pushkey,
    pushswitch: req.body.pushswitch,
    imgprofile: req.body.imgprofile
    });
    
    post.save()
    .then(data => {
    res.json(data);
    console.log('Post succeed sessh2');  

          })
    .catch(err => { 
        res.json({ message: err });
        });

      


 //check if nft is in database
    const savedb = await collections.count({collection_link:post.collection_link})
     if(savedb == 0){
        console.log('count seh', savedb);
        const CollectionPost = new collections({
            collection_link: req.body.collection_link,
            floorprice: 0,
            collection_name: "noname"
            
            });
            
            CollectionPost.save()
            .then(data => {
            res.json(data);
            
            })
            .catch(err => { 
                res.json({ message: err });
                });
     }
        
    
    });


    


    
      //Send mail
    
      router.post('/mail', (req,res) => {
        const postmail = new email({
        email_id: req.body.email_id,
        date: req.body.date
        
        });
    
        //send mail
    
        
        client.sendEmail({
            "From": "team@niftynotified.com",
            "To": `${postmail.email_id}`,
            "Subject": `Confirm Email`,
            "TextBody": `Confirm Email`,
            "HtmlBody": `<html>
            <head>
                <meta http-equiv="content-type" content="text/html; charset=utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
                 <meta name="format-detection" content="telephone=no"/>
            
                <!-- Responsive Mobile-First Email Template by Konstantin Savchenko, 2015.
                  -->
            
                <style>
            /* Reset styles */ 
            body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;}
            body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; }
            img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
            #outlook a { padding: 0; }
            .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
            .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
            
            /* Rounded corners for advanced mail clients only */ 
            @media all and (min-width: 560px) {
                .container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px;}
            }
            
            /* Set color for auto links (addresses, dates, etc.) */ 
            a, a:hover {
                color: #127DB3;
            }
            .footer a, .footer a:hover {
                color: #FFFFFF;
            }
            
                 </style>
            
                <!-- MESSAGE SUBJECT -->
                <title>Niftynotified</title>
            
            </head>
            
            <!-- BODY -->
            <!-- Set message background color (twice) and text color (twice) -->
            <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
                background-color: #FFFFFF;
                color: #FFFFFF;"
                bgcolor="#FFFFFF"
                text="#FFFFFF">
            
            <!-- SECTION / BACKGROUND -->
            <!-- Set message background color one again -->
            <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background"><tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
                bgcolor="#FFFFFF">
            
            <!-- WRAPPER -->
            <!-- Set wrapper width (twice) -->
            <table border="0" cellpadding="0" cellspacing="0" align="center"
                width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
                max-width: 560px;" class="wrapper">
            
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                        padding-top: 20px;
                        padding-bottom: 20px;">
            
                        <!-- PREHEADER -->
                        <!-- Set text color to background color -->
                        <div style="display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0;
                        color: #F0F0F0;" class="preheader">
                            </div>
            
                        <!-- LOGO -->
                        <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2. URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content=logo&utm_campaign={{Campaign-Name}} -->
                        <a target="_blank" style="text-decoration: none;"
                            href=""><img border="0" vspace="0" hspace="0"
                            src="https://s3.amazonaws.com/appforest_uf/f1634648651914x172105244387360060/unnamed%20%287%29.png"
                            width="640" height="100"
                            alt="Logo" title="Logo" style="
                            color: #FFFFFF;
                            font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
            
                    </td>
                </tr>
            
            <!-- End of WRAPPER -->
            </table>
            
            <!-- WRAPPER / CONTEINER -->
            <!-- Set conteiner background color -->
            <table border="0" cellpadding="0" cellspacing="0" align="center"
                bgcolor="#FFFFFF"
                width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
                max-width: 560px;" class="container">
            
                <!-- HEADER -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 35px; font-weight:normal; line-height: 130%;
                        padding-top: 0px;
                        color: #000000;
                        font-family: Tahoma;" class="header">
                            Welcome to Niftynotified
                    </td>
                </tr>
                
                <!-- SUBHEADER -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
                        padding-top: 0px;
                        color: #000000;
                        font-family: Tahoma;" class="subheader">
                            
                    </td>
                </tr>
            
                <!-- HERO IMAGE -->
                <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 (wrapper x2). Do not set height for flexible images (including "auto"). URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Ìmage-Name}}&utm_campaign={{Campaign-Name}} -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
                        padding-top: 0px;" class="hero"><a target="_blank" style="text-decoration: none;"
                        href="https://s3.amazonaws.com/appforest_uf/f1634954464827x859168007813302800/Naamloos-13.png"><img src="https://s3.amazonaws.com/appforest_uf/f1634954969515x790210381363402200/Nifty-neon1-transparent.png" width="225" height="150"></a></td>
                </tr>
            
                <!-- PARAGRAPH -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 300; line-height: 160%;
                        padding-top: 0px; 
                        color: #000000;
                        font-family: Tahoma;" class="paragraph">
                            Confirm your email so our notifications won't miss your inbox
                    </td>
                </tr>
            
                <!-- BUTTON 3-->
                <!-- Set button background color at TD, link/text color at A and TD, font family ("sans-serif" or "Georgia, serif") at TD. For verification codes add "letter-spacing: 5px;". Link format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Button-Name}}&utm_campaign={{Campaign-Name}} -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                        padding-top: 25px;
                        padding-bottom: 5px;" class="button"><a
                        href="" target="_blank" style="">
                        <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 500px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;"><tr><td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 40px; -webkit-border-radius: 40px; -moz-border-radius: 40px; -khtml-border-radius: 40px;"
                        bgcolor="#FFFFFF"><a href="https://niftynotified.com/email_confirmed/${postmail.email_id}">
                            <img src="https://s3.amazonaws.com/appforest_uf/f1634781766593x789815730160737400/CNFRM.png" alt="Nifty notified" style="width:350px;height:100px;">
                          </a>
                        </td></tr></table></a>
                    </td>
                </tr>
            
                <!-- LINE -->
                <!-- Set line color -->
                <tr>	
                    
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                        padding-top: 25px;" class="line"><hr
                        color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
                    </td>
                </tr>
            
                <!-- PARAGRAPH -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                <tr>
                    
                </tr>
            
            <!-- End of WRAPPER -->
            </table>
            
            <!-- WRAPPER -->
            <!-- Set wrapper width (twice) -->
            <table border="0" cellpadding="0" cellspacing="0" align="center"
                width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
                max-width: 560px;" class="wrapper">
            
                <!-- SOCIAL NETWORKS
                <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                        padding-top: 25px;" class="social-icons"><table
                        width="256" border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse: collapse; border-spacing: 0; padding: 0;">
                        <tr>
            
                            <!-- ICON 1 -->
                            <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                                href="https://discord.gg/SUpaEYwHa4"
                            style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                                color: #000000;"
                                alt="F" title="Facebook"
                                width="44" height="44"
                                src="https://www.freeiconspng.com/uploads/discord-black-icon-1.png"></a></td>
            
                            <!-- ICON 2 -->
                            <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                                href="https://t.me/niftynotified"
                            style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                                color: #000000;"
                                alt="T" title="Twitter"
                                width="44" height="35"
                                src="https://listimg.pinclipart.com/picdir/s/369-3694761_telegram-logo-png-telegram-logo-white-png-clipart.png"></a></td>				
            
                            <!-- ICON 3 -->
                            <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                                href="https://mobile.twitter.com/goniftynotified"
                            style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                                color: #000000;"
                                alt="G" title="Google Plus"
                                width="44" height="35"
                                src="https://toppng.com/uploads/preview/follow-me-gold-twitter-icon-vector-11563031490l4vyrkbrdu.png"></a></td>		
            
                            
                        </tr> -->
                        </table>
                    </td>
                </tr>
            
                <!-- FOOTER -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
                        padding-top: 20px;
                        padding-bottom: 20px;
                        color: #000000;
                        font-family: sans-serif;" class="footer">
            
                            Found what you're looking for? If you no longer wish to receive this type of email from Nifty Notified you can unsubscribe.
            
             <a href="https://niftynotified.com/unsubscribe_email" target="_blank" style="text-decoration: underline; color: #000000; font-family: sans-serif; font-size: 13px; font-weight: 400; line-height: 150%;">here</a> .
            
                            
            
                    </td>
                </tr>
            
            <!-- End of WRAPPER -->
            </table>
            
            <!-- End of SECTION / BACKGROUND -->
            </td></tr></table>
            
            </body>
            </html>`
          });
          
    
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
    





    }); // end request

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
const removedPost = await Post.removea({_id: req.params.postId});
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