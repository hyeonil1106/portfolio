const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
    "frame_254.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/1c00b345-e2ed-425f-89b9-7c31a6bca36b",
    "frame_244.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0fae5283-fc3d-45f0-9643-b4aaf9719258",
    "frame_168.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/44a1104b-a450-40a7-95d7-b14ed3bf3e83",
    "frame_246.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b606f3fc-98b2-4931-b3f9-8c1dc65aaa3c",
    "profile.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/247e0030-2029-4041-a2c3-6df33860fd51",
    "rectangle_33.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/00a6e68c-3167-48f6-9e5f-d70045a8c872",
    "background.jpg": "https://s3-alpha-sig.figma.com/img/3429/a662/98380fab75c313fe28689384ab2106ad?Expires=1785110400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sUOadm8Omr4lR-LyjaV~ea6fM2pcTCAO99cg45dx1z71f6wTNNQDlrKrt1G8C5Nqa4KVuToh5eaO5J~tlPZF8DjLVYTXsZBovdMumi7R5fHu~bbO6ziD5SZhN9a2ptca33lh8D5b8bqU5L1Lix~pdZgh4W13oa1kHGdsFkcsCiF2n2CSHmPMeMIhLHREOJmbNpD2GwpwVQk6MBs4R9MthclMF2wRpoAgurmAOZNSwUyank~WRAoRfyF~co-Uf8NrsP9GvX-8oY7rgaRfOLck~pRr50JkMk3fbGE1FpmayEdv4js7s734GkIqkiRSkGruYK2ykXF3PbPE5NHQH80W5w__"
};

const assetsDir = path.join('d:\\', '공공기관 웹 사이트 분석', 'portfolio', 'assets');

Object.entries(images).forEach(([key, url]) => {
    const dest = path.join(assetsDir, key);
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close();  // close() is async, call cb after close completes.
            console.log("Downloaded: " + key);
        });
    }).on('error', function(err) {
        fs.unlink(dest, () => {});
        console.error("Error downloading " + key + ": " + err.message);
    });
});
