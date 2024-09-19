const User = require('../model/User')
const bcrypt = require('bcrypt');






const handleLogout =  async (req, res) => {


    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204)}; // No Content


    const refreshToken = cookies.jwt;
    // Is the refresh token in the db?

    const foundUser =  User.findOne({refreshToken : refreshToken});   
    if(!foundUser){
        res.clearCookie('jwt',{ httpOnly: true});
        return res.sendstatus(204);//Forbidden
    }
    


    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result)


    res.clearCookie('jwt',{ httpOnly: true});
    res.sendStatus(204);


}

module.exports= {handleLogout};