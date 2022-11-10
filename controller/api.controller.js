const { DB_Card, DB_Notice } = require("../modle/api.modle.schema");

const controleStuff={
    get_stuffs:async(req,res)=>{
        all_stuff=[
            {
                image:'logo.jpeg',
                name:'Anamul haque',
                title:'testing parpas',
                about:'Veniam laborum nisi occaecat dolor veniam velit ad et eu.'
            },
            {
                image:'logo.jpeg',
                name:'Anamul haque',
                title:'testing parpas',
                about:'Veniam laborum nisi occaecat dolor veniam velit ad et eu.'
            },
            {
                image:'logo.jpeg',
                name:'Anamul haque',
                title:'testing parpas',
                about:'Veniam laborum nisi occaecat dolor veniam velit ad et eu.'
            }
        ]
        res.send(all_stuff);
    }
}
const NormalApis={
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
    getCards:async(req,res)=>{
        try {
            const type = req.params.type;
            const limit =req.query.limit || '';
            let card ;
                if (limit) {
                    card = await DB_Card.find({cardType:type},{_id:0,__v:0}).limit(limit);
                } else {
                    card = await DB_Card.find({cardType:type},{_id:0,__v:0});
                }
            if (card.length) {
                console.log('cardis', card)
                res.status(200).send({
                    message:'return meny card',
                    status:true,
                    data:card,
                });
            } else {
                console.log('cardis', card)
                res.status(200).send({
                    message:'not found',
                    status:false,
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message:error.message
            });
        }
    },
    getCard:async(req,res)=>{
        try {
            const id =req.params.id;
            const type = req.params.type;
            console.log('id',id)
            const card = await DB_Card.findOne({cardType:type,card_id:id},{_id:0,__v:0});
            if (card) {
                console.log(card)
                res.status(200).send({
                    message:'return single',
                    status:true,
                    data:card,
                });
            } else {
                res.status(200).send({
                    message:'not found',
                    status:false,
                });
            }
        } catch (error) {
            console.log(error);

            res.status(500).send({
                message:error.message,
                status:false
            });
        }
    },
}

module.exports={controleStuff,NormalApis}