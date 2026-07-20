const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
    "profile_card.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/82cfa103-dcf2-475f-a423-d7d247470e4f",
    "profile_inner.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/52c6fa86-2c01-40df-9316-bf2451b41ac5"
};

const assetsDir = path.join('d:\\', '공공기관 웹 사이트 분석', 'portfolio', 'assets');

Object.entries(images).forEach(([key, url]) => {
    const dest = path.join(assetsDir, key);
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close();
            console.log("Downloaded: " + key);
        });
    }).on('error', function(err) {
        fs.unlink(dest, () => {});
        console.error("Error downloading " + key + ": " + err.message);
    });
});
