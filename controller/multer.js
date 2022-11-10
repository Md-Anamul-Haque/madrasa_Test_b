
//--------------------------setup malter-----------------
const multer=require('multer');
const path=require("path");
//difaind a path
const upload_path="./public/asset/files/";

//difaind the storage
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null, upload_path);  
    },
    filename:(req,file,cb)=>{
        const tmpName = req.body.name || '_';
        const fileExt= path.extname(file.originalname) || '.jpg';
        
        // const fileName=file.originalname
        //                                 .replace(fileExt, "")
        //                                 .toLowerCase()
        //                                 .split(" ")
        //                                 .join("-")+ "-" + Date.now();

        const fileName=tmpName.replace(fileExt, "")
                                .toLowerCase()
                                .split(" ")
                                .join("-")+ "-" + Date.now();
        cb(null, fileName+fileExt)
    }
})

const upload=multer({
    storage:storage,
    limits:{
        fileSize:1000000 * 50 //1mb * 50 = 50mb,
    },
    fileFilter:(req,file,cb)=>{
        if (!file || !file.originalname) {
            console.log('file is not in multer')
            cb(null, false)
          }
        if (file.fieldname === "image") {
            if (
                file.mimetype === "application/pdf"|| 
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg"
                ) {
                cb(null, true);
            } else {
                console.log('error in multer')
                cb(new Error('only pdf file, (png, jpg or jpeg) image allowed'))
            }
        }else{
            console.log('fieldname is required "image"')
        }
    },
});
//...............malter setup end hear----------------

module.exports={upload};