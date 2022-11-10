const { default: mongoose } = require("mongoose");

const empSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        unique:true,
    },
    title: {
        type:String,
    },
    image : {
        type:String,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});
const cardSchema = new mongoose.Schema({
    card_id : {
        type : String,
        require:true,
        unique:true,
    },
    name: {
        type:String,
    },
    title: {
        type:String,
        default:''
    },
    cardType : {
        type : String,
        default:''
    },
    address:{type:String},
    phone:{type:String},
    mail:{type:String},
    url : {
        type : String,
        default:'#'
    },
    image : {type:String},
    article:{type:String},
    createdAt : {
        type : Date,
        default : Date.now
    }
});
const NoticeSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    notice_id:{
        type:Number,
        require:true,
        unique:true,
    },
    file: {
        type:String,
        required:true
    },
    article:{type:String},
    createdAt : {
        type : Date,
        default : Date.now
    }
});
const ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    contact_id:{
        type:Number,
        require:true,
        unique:true,
    },
    mail:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    article:{type:String},
    createdAt : {
        type : Date,
        default : Date.now
    }
});
const BookSchema = new mongoose.Schema({
    bookname:{
        type:String,
        required:true,
    },
    bookType:{
        type:String,
    },
    bookTitle:{
        type:String,
    },
    book_id:{
        type:Number,
        require:true,
        unique:true,
    },
    file:{
        type:String,
        required:true
    },
    article:{type:String},
    createdAt : {
        type : Date,
        default : Date.now
    }
});
const DB_Emp = mongoose.model('emp',empSchema);
const DB_Card = mongoose.model('card',cardSchema);
const DB_Notice = mongoose.model('notice',NoticeSchema);
const DB_Contact = mongoose.model('contact',ContactSchema);
const DB_Book = mongoose.model('book',BookSchema);


module.exports={DB_Emp, DB_Card, DB_Notice, DB_Contact, DB_Book};