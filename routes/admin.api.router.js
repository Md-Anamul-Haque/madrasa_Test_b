const router = require('express').Router();
const path = require('path');
const AdminController = require('../controller/admin.api.controller');
const { upload } = require('../controller/multer');


router.get('/',(req,res)=>{
    res.send('admin data');
 });


router.post('/card/:type',upload.single('image'), AdminController.addCard);
router.put('/card/:type/:id',upload.single('image'), AdminController.updateCard);
router.delete('/card/:type/:id',AdminController.deleteCard);


router.get('/notices',AdminController.getNotices);
router.get('/notice/:id',AdminController.getNotice);
router.post('/notice',upload.single('image'),AdminController.addNotice);
router.put('/notice/:id',AdminController.updateNotice);
router.delete('/notice/:id',AdminController.deleteNotice);

router.post('/book', upload.single('image'), AdminController.addBook)
module.exports = router