require('dotenv').config();
const {server,io}=require('./socket.io')

// let totalActiveUser=0;
// io.on('connection', (socket) => {
//     totalActiveUser++ 
//     socket.emit('totalActiveUser',totalActiveUser);

// socket.on('disconnect', () => {
//     totalActiveUser--;
//     io.emit('totalActiveUser',totalActiveUser);
// });   
// });

const config = require("./config/config");

const PORT = config.app.port;
server.listen(PORT,()=>{
    console.log(`server is runing at http://localhost:${PORT}`);
});
