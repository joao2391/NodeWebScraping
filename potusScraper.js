const rp = require('request-promise');
const url = 'https://www.google.com.br/';
const $ = require('cheerio');
const puppeteer = require('puppeteer');
// rp(url)
//   .then(function(html){
//     //success!
//     console.log($('div > p', html).length);
//     console.log($('div > p', html));
//   })
//   .catch(function(err){
//     //handle error
// });
(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  // Type into search box.
  await page.click('.vdLsw gsfi input', 'teste');
  await page.setRequestInterception(true);
  
  // Request intercept handler... will be triggered with 
  // each page.goto() statement
  page.on('request', interceptedRequest => {

      // Here, is where you change the request method and 
      // add your post data
      var data = {
          'method': 'POST',
          'postData': 'paramFoo=valueBar&paramThis=valueThat'
      };

      // Request modified... finish sending! 
      interceptedRequest.continue(data);
  });

  await browser.close();
})();
