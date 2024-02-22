const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config({path:'./config.env'});
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'USERPHOTO',
        allowedFormats:['jpeg','jpg','png']
    }
})

module.exports={
    cloudinary,
    storage
}