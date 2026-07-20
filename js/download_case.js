const fs = require('fs');
const https = require('https');
const path = require('path');

const url = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/235c0e71-b532-4816-b1ef-b88923b17c10";
const dest = path.join('d:\\', '공공기관 웹 사이트 분석', 'portfolio', 'assets', 'case_list.png');
const file = fs.createWriteStream(dest);

https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
        file.close();
        console.log("Downloaded: case_list.png");
    });
}).on('error', function(err) {
    fs.unlink(dest, () => {});
    console.error("Error: " + err.message);
});
