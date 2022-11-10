const router = require('express').Router();
const path = require('path');
const { controleStuff, GetData, _card_controler, NormalApis } = require('../controller/api.controller');
const { upload } = require('../controller/multer');
router.get('/',(req,res)=>{
    res.send('json data');
 })
 
router.get('/about/logo',(req,res)=>{
    let data= {
        logo:'logo.jpeg',
        heading:'Great for your awesome project',
        text:`Putting together a page has never been easier than matching together pre-made components. From landing pages presentation to login areas, you can easily customise and built your pages.`,
        
     }
    res.send(data)
    // res.send('hello')
})

router.get('/cards/:type',NormalApis.getCards);
router.get('/card/:type/:id',NormalApis.getCard);

router.get('/cards/:type',NormalApis.getNotices);
router.get('/card/:type/:id',NormalApis.getNotice);

// router.put('/card/:id', _card_controler.Put)
// router.delete('/card/:id', _card_controler.Delete)
// router.get('/stuffs',controleStuff.get_stuffs)
// router.get('/stuffs/:id',controleStuff.get_stuffs)
router.get((req,res)=>{
    res.send('route not found')
})
module.exports = router