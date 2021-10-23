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
            html:`<html xmlns="http://www.w3.org/1999/xhtml">
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
                            Available on&nbsp;GitHub and&nbsp;CodePen. Highly compatible. Designer friendly. More than 50%&nbsp;of&nbsp;total email opens occurred on&nbsp;a&nbsp;mobile device&nbsp;— a&nbsp;mobile-friendly design is&nbsp;a&nbsp;must for&nbsp;email campaigns.</div>
            
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
                        font-family: fantasy;" class="header">
                            Floor price of ${obj.nftname} is ${obj.webprice}! 
                    </td>
                </tr>
                
                <!-- SUBHEADER -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
                        padding-top: 0px;
                        color: #000000;
                        font-family: fantasy;" class="subheader">
                            
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
                        font-family: fantasy;" class="paragraph">
                            NFT Floorprice just went higher then ${obj.alertprice}
                    </td>
                </tr>
            
                <!-- BUTTON -->
                <!-- Set button background color at TD, link/text color at A and TD, font family ("sans-serif" or "Georgia, serif") at TD. For verification codes add "letter-spacing: 5px;". Link format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Button-Name}}&utm_campaign={{Campaign-Name}} -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                        padding-top: 25px;
                        padding-bottom: 5px;" class="button"><a
                        href="https://github.com/konsav/email-templates/" target="_blank" style="">
                            <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 500px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;"><tr><td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 40px; -webkit-border-radius: 40px; -moz-border-radius: 40px; -khtml-border-radius: 40px;"
                                bgcolor="#03B4C6"><a target="_blank" style="text-decoration: underline;
                                color: #FFFFFF; font-family: fantasy; font-size: 30px; font-weight: 400; line-height: 120%;"
                                href="${obj.weblink}">
                                    VIEW COLLECTION
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
                                href="https://raw.githubusercontent.com/konsav/email-templates/"
                            style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                                color: #000000;"
                                alt="F" title="Facebook"
                                width="44" height="44"
                                src="https://www.freeiconspng.com/uploads/discord-black-icon-1.png"></a></td>
            
                            <!-- ICON 2 -->
                            <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                                href="https://raw.githubusercontent.com/konsav/email-templates/"
                            style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                                color: #000000;"
                                alt="T" title="Twitter"
                                width="44" height="35"
                                src="https://listimg.pinclipart.com/picdir/s/369-3694761_telegram-logo-png-telegram-logo-white-png-clipart.png"></a></td>				
            
                            <!-- ICON 3 -->
                            <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                                href="https://raw.githubusercontent.com/konsav/email-templates/"
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
            html:`<html xmlns="http://www.w3.org/1999/xhtml">
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
                        font-family: fantasy;" class="header">
                            Floor price of ${obj.nftname} is ${obj.webprice}! 
                    </td>
                </tr>
                
                <!-- SUBHEADER -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
                        padding-top: 0px;
                        color: #000000;
                        font-family: fantasy;" class="subheader">
                            
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
                        font-family: fantasy;" class="paragraph">
                            NFT Floorprice just went lower then ${obj.alertprice}
                    </td>
                </tr>
            
                <!-- BUTTON -->
                <!-- Set button background color at TD, link/text color at A and TD, font family ("sans-serif" or "Georgia, serif") at TD. For verification codes add "letter-spacing: 5px;". Link format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Button-Name}}&utm_campaign={{Campaign-Name}} -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                        padding-top: 25px;
                        padding-bottom: 5px;" class="button"><a
                        href="https://github.com/konsav/email-templates/" target="_blank" style="">
                            <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 500px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;"><tr><td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 40px; -webkit-border-radius: 40px; -moz-border-radius: 40px; -khtml-border-radius: 40px;"
                                bgcolor="#03B4C6"><a target="_blank" style="text-decoration: underline;
                                color: #FFFFFF; font-family: fantasy; font-size: 30px; font-weight: 400; line-height: 120%;"
                                href="${obj.weblink}">
                                    VIEW COLLECTION
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
                                href="https://raw.githubusercontent.com/konsav/email-templates/"
                            style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                                color: #000000;"
                                alt="F" title="Facebook"
                                width="44" height="44"
                                src="https://www.freeiconspng.com/uploads/discord-black-icon-1.png"></a></td>
            
                            <!-- ICON 2 -->
                            <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                                href="https://raw.githubusercontent.com/konsav/email-templates/"
                            style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                                color: #000000;"
                                alt="T" title="Twitter"
                                width="44" height="35"
                                src="https://listimg.pinclipart.com/picdir/s/369-3694761_telegram-logo-png-telegram-logo-white-png-clipart.png"></a></td>				
            
                            <!-- ICON 3 -->
                            <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                                href="https://raw.githubusercontent.com/konsav/email-templates/"
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