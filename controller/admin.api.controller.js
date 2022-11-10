const { DB_Notice, DB_Card, DB_Book } = require("../modle/api.modle.schema");
const fs = require('fs');
const AdminController={
    getNotices:async(req,res)=>{
        try {
            const Limit = req.query.limit || '';
            let notices;
            if(typeof Limit ==='number'){
                notices = await DB_Notice.find({}).sort({notice_id:-1}).limit(Limit);
            }else{
                notices = await DB_Notice.find({}).sort({notice_id:-1});
            }
            if (notices) {
                res.status(200).send({
                    message:'notices is found',
                    status:true,
                    data:notices
                })
            }else{
                res.status(404).send({
                    message:'notice is not found!',
                    status:false,
                })
            }

        } catch (error) {
            res.status(500).send({
                message:error.message,
                status:false
            });
        }
    },
    getNotice:async(req,res)=>{
        console.log(req.params.id)
        try {
            const notice_id = parseInt(req.params.id);
            let notice;
            console.log(typeof notice_id )
            notice = await DB_Notice.findOne({notice_id});
            if (notice) {
                res.status(200).send({
                    message:'notice is found',
                    status:true,
                    data: notice
                })
            }else{
                res.status(404).send({
                    message:'notice is not found!',
                    status:false,
                })
            }

        } catch (error) {
            res.status(500).send({
                message:error.message,
                status:false
            });
        }
    },
    addNotice:async(req,res)=>{
        try {
            const {title, article}=req.body;
            let data= {title, article};
            if (req.file && req.file.filename) {
                data.file=req.file.filename;
             }
            const maxId = await DB_Notice.find().sort({notice_id: -1}).limit(1) || [{notice_id:1}] ;
            data.notice_id=maxId.length > 0 ? maxId[0].notice_id + 1 : 1;
            const newNotice= new DB_Notice(data);
            const notice = await newNotice.save();

            if (notice) {
                res.status(201).send({
                    message:'notice created success',
                    status:true,
                    data:notice
                })
            }else{
                try {
                    if (req.file && req.file.filename) {
                        const filePath = `./public/asset/files/${req.file.filename}`; 
                        fs.unlinkSync(filePath);
                    }
                } catch (err) {}
                res.status(404).send({
                    message:'notice is not create!',
                    status:false,
                })
            }

        } catch (error) {
            console.log(error)
            try {
                if (req.file && req.file.filename) {
                    const filePath = `./public/asset/files/${req.file.filename}`; 
                    fs.unlinkSync(filePath);
                }
            } catch (err) {}
            res.status(500).send({
                message:error.message,
                status:false
            });
        }
    },
    updateNotice:async(req,res)=>{
        console.log('start update')
        try {
            const notice_id = parseInt(req.params.id);
            console.log(req.body)
            const notice=await DB_Notice.findOneAndUpdate({notice_id}, req.body,{new:true});
            console.log(notice)
            if (notice) {
                res.status(201).send({
                    message:'notice update success',
                    status:true,
                    data:notice
                })
            }else{
                res.status(201).send({
                    message:'notice is not update!',
                    status:false,
                })
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message:error.message,
                status:false
            });
        }
    },
    deleteNotice:async(req,res)=>{
        console.log(req.params.id)
        try {
            const notice_id = req.params.id;
           try {
            const dataDemo = await DB_Notice.findOne({notice_id:notice_id});
            const filePath = `./public/asset/files/${dataDemo.file}`; 
            fs.unlinkSync(filePath);
           } catch (error) {
            console.log('error delete notice file delete')
           }
            let notice = await DB_Notice.deleteOne({notice_id:notice_id});
            console.log(notice)
            if (notice) {
                res.status(200).send({
                    message:'notice is delete',
                    status:true,
                    data: notice
                })
            }else{
                res.status(404).send({
                    message:'notice is not delete!',
                    status:false,
                })
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message:error.message,
                status:false
            });
        }
    },
// ----------------------------------------------------------------------------------------
    addCard:async(req,res)=>{
        try {
            const type = req.params.type;
            let data=req.body;
            data.cardType = type;
            if (req.file && req.file.filename) {
                data.image=req.file.filename;
             }
            const maxId = await DB_Card.find().sort({card_id: -1}).limit(1) || [{card_id:1}] ;
            data.card_id=maxId.length > 0 ? parseInt(maxId[0].card_id ) + 1 : 1;
            const newcaCard= new DB_Card(data);
            const Card = await newcaCard.save();
             console.log(Card)
            if (Card) {
                res.status(201).send({
                    message:'Card created success',
                    status:true,
                    data:Card
                })
            }else{
                try {
                    if (req.file && req.file.filename) {
                        const filePath = `./public/asset/files/${req.file.filename}`; 
                        fs.unlinkSync(filePath);
                    }
                } catch (err) {}
                res.status(404).send({
                    message:'Card is not create!',
                    status:false,
                })
            }

        } catch (error) {
            console.log(error)
            try {
                if (req.file && req.file.filename) {
                    const filePath = `./public/asset/files/${req.file.filename}`; 
                    fs.unlinkSync(filePath);
                }
            } catch (err) {}
            res.status(500).send({
                message:error.message,
                status:false
            });
        }
    },
    updateCard:async(req,res)=>{
        try {
            const card_id = req.params.id;
            console.log(card_id)
            let data ={...req.body};
            if (req.file && req.file.filename) {
                data.image = req.file.filename;
                try {
                    const {image} = await DB_Card.findOne({card_id})|| [{image:1}] ;
                    console.log('image old is',image)
                    const filePath = `./public/asset/files/${image}`; 
                        fs.unlinkSync(filePath);
                } catch (error) {
                    console.log('error catch in put card with delete file/image')
                }
             }
             console.log('data is',data)

             const Card=await DB_Card.findOneAndUpdate({card_id}, {...data},{new:true});
            if (Card) {
                res.status(201).send({
                    message:'update success',
                    status:true,
                    data:Card
                })
            }else{
                res.status(200).send({
                    message:'is not update!',
                    status:false,
                })
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message:error.message,
                status:false
            });
        }
    },
    deleteCard:async(req,res)=>{
        console.log(req.params.id)
        try {
            const card_id = req.params.id;
            // const dataDemo = await DB_Card.findOne({card_id});
            // const filePath = `./public/asset/files/${dataDemo.file}`; 
            // fs.unlinkSync(filePath);
            try {
                const {image} = await DB_Card.findOne({card_id})|| [{image:''}] ;
                console.log('image old is',image)
                const filePath = `./public/asset/files/${image}`; 
                    fs.unlinkSync(filePath);
            } catch (error) {
                console.log('error catch in delete card with delete file/image')
            }
            const card = await DB_Card.deleteOne({card_id});
            console.log(card)
            if (card) {
                res.status(200).send({
                    message:'is delete',
                    status:true,
                    data: card
                })
            }else{
                res.status(404).send({
                    message:'is not delete!',
                    status:false,
                })
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message:error.message,
                status:false
            });
        }
    },
// ------------------------------------------------------------------
    addBook:async(req,res)=>{
        try {
            const {bookname} = req.body;
            const bookTitle = req.body.bookTitle || '';
            const bookType = req.body.bookType || '';
            const article = req.body.article || '';

            let data={bookname, bookTitle, bookType, article};
            if (req.file && req.file.filename) {
                data.file=req.file.filename;
             }
            const maxId = await DB_Book.find().sort({book_id: -1}).limit(1) || [{book_id:1}] ;
            data.book_id=maxId.length > 0 ? parseInt(maxId[0].book_id ) + 1 : 1;
            const newBook = new DB_Book(data);
            const book = await newBook.save();
             console.log(book)
            if (book) {
                res.status(201).send({
                    message:'book created success',
                    status:true,
                    data:book
                })
            }else{
                try {
                    if (req.file && req.file.filename) {
                        const filePath = `./public/asset/files/${req.file.filename}`; 
                        fs.unlinkSync(filePath);
                    }
                } catch (err) {}
                res.status(404).send({
                    message:'book is not create!',
                    status:false,
                })
            }

        } catch (error) {
            console.log(error)
            try {
                if (req.file && req.file.filename) {
                    const filePath = `./public/asset/files/${req.file.filename}`; 
                    fs.unlinkSync(filePath);
                }
            } catch (err) {}
            res.status(500).send({
                message:error.message,
                status:false
            });
        }
    }
}

module.exports=AdminController;