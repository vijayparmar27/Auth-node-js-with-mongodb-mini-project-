const express=require('express');
const {upload}=require('../model/image_upload');
const router=express.Router();
const routerController = require('../controllers/routes');

router.post('/save',upload.single('myimage'),routerController.save);

router.post('/update/:userId',upload.single('myimage'),routerController.update);

module.exports=router;