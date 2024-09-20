const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




const handleLogin = async (req, res) => {
    const user =  req.body.email;
    const pwd = req.body.password;

    if (!user || !pwd) {
        return res.status(400).json({ 'message': 'Email and password are required.' });}
        const foundUser =  await  User.findOne({email : user}).exec();   

    if(!foundUser){
        return res.sendStatus(401);//unauthorized
        
    }
    //eavluate password

    const match = await bcrypt.compare(pwd, foundUser.password);

    if(match){
        const roles = Object.values(foundUser.roles);
        // create JWTS token
        const accessToken = jwt.sign(
            { 
                "UserInfo":{
                    "email": foundUser.email
                    ,"roles": roles}
            },
             process.env.ACCESS_TOKEN_SECRET,
             {expiresIn: '15m'}
            );
        const refreshToken = jwt.sign(
            {"email": foundUser.email},
             process.env.REFRESH_TOKEN_SECRET,
             {expiresIn: '1d'}
            );
            //store the refresh token in the db
            

            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            console.log(result);


        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'None', MaxAge: 24*60*60*1000});//secure: true
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
        
    }

}

module.exports= {handleLogin};