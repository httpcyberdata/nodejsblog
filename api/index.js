const express = require('express');
const app = express()
const dotenv = require('dotenv')
const path = require('path');
const multer = require('multer')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const authUser = require('./routes/user');
const authPost = require('./routes/posts')
const authCat = require('./routes/categories')
const fileUpload = require('express-fileupload');
const multipart = require('connect-multiparty')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


dotenv.config()
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")))
const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, '/images');
      },
      filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
      }
    });
    const upload = multer({ storage : storage}).single('files')
     
    app.post('/upload',function(req,res){
        upload(req,res,function(err) {
            if(err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    });

mongoose.connect(process.env.CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    console.log("Connected to MongoDB")
    })
    .catch((err) => { 
        console.log(err)
    })

app.use('/auth', authRoute)
app.use('/users', authUser)
app.use('/posts', authPost)
app.use('/category', authCat)
  

app.listen(5000, () => {
    console.log("backend running")
})