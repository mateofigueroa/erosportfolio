const { Router } = require('express');
const router = Router();

const Photo = require('../models/Photo');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require('fs-extra');

router.get('/', async (req, res) => {
    const photos = await Photo.find();
    res.render('images', { photos });
})

router.get('/images/add', async (req, res) => {
    const photos = await Photo.find();
    res.render('image_form', { photos });
});

router.post('/images/add', async (req, res) => {
    const { title, name, technique, size, date } = req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const newPhoto = new Photo({
        title,
        name,
        technique,
        size,
        date,
        imageURL: result.url,
        public_id: result.public_id
    });
    await newPhoto.save();
    await fs.unlink(req.file.path);
    res.redirect(req.get('referer'));
})

router.delete('/images/:public_id', async (req, res) => {
    const id = req.params.public_id;

    Photo.findOneAndDelete({public_id: id}, function (err){
        if(err) console.error(err);
    });
    
    
    res.redirect(req.get('referer'));

});

module.exports = router;