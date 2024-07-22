const mongoose = require('mongoose');
const env = require('dotenv').config();


async function connect(){
    try{
        await mongoose.connect(
          `mongodb+srv://toantran5515664:xululu2002@shop.ckuzmf0.mongodb.net/Shop?retryWrites=true&w=majority&appName=Shop`,
          {
            // useNewUrlParser: true,
            // useCreateIndex: true,
            // useUnifiedTopology: true,
          }
        );
        console.log("Kết nối data thành công!");
        
    }
    catch{
        console.log('Kết nối data thất bại!');
    }
}
module.exports = { connect } 