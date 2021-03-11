var fs = require('fs');
var path = require('path');
var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname )
    }
});
 
var upload = multer({ storage: storage });

module.exports = upload
