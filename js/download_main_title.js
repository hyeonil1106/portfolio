const fs = require('fs');
const https = require('https');
const path = require('path');

const url = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5eccbffd-cd36-4d29-a2cd-23a62e485598";
const dest = path.join('d:\\', '공공기관 웹 사이트 분석', 'portfolio', 'assets', 'main_title.png');
const file = fs.createWriteStream(dest);

https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
        file.close();
        console.log("Downloaded: main_title.png");
    });
}).on('error', function(err) {
    fs.unlink(dest, () => {});
    console.error("Error: " + err.message);
});
