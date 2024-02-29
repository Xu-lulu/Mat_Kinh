const bcrypt =  require('bcrypt')
const User = require('../Models/Users')


class HomeController{
    async Register(req,res,next) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hansed = await bcrypt.hash(req.body.password,salt);

            const DataUsers = await new User({
                username: req.body.username,
                password: hansed,
                email: req.body.email,
            });
            
            const users = await DataUsers.save();
            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async Login(req, res, next){
        try {
            const NameUser = await User.findOne({
                username: req.body.username
            })
            if (!NameUser) {
              return res.status(400).json("Incorrect username");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                NameUser.password
            )
            if (!validPassword) {
              return res.status(400).json("Incorrect password");
            }
            if(NameUser && validPassword){
                return res.status(200).json("Login Sucsessfully!")
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    home(req,res,next){
        res.send('Home')
    }
}

module.exports = new HomeController();
