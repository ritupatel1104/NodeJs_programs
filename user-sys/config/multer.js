const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

//process your file upload and save into storage
//you can save file into two place :
// 1. Into server (diskStorage)
// 2. Cloud storage (like aws)

const storage = multer.diskStorage({
//DESTINATION    
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"))
  },

  //SOURCE
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(6)
    .toString('hex') + path.extname(file.originalname);
    cb(null, uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

module.exports = upload;
