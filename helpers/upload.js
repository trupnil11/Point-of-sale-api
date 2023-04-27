const multer = require("multer");
//console.log("upload.js called");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    //console.log(file)
    callback(null, './assets/upload');
  },

  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
module.exports = { upload, storage }


