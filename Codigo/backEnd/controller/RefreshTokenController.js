const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');





const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401)};
    const refreshToken = cookies.jwt;

    const foundUser =  await User.findOne({refreshToken : refreshToken });
    if(!foundUser){
        return res.sendstatus(403);//Forbidden
    }
    //eavluate jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if(err || foundUser.email !== decoded.email) return res.sendStatus(403); //Invalid Token
                const roles = Object.values(foundUser.roles);
                const accessToken = jwt.sign(
                    {
                        "UserInfo":{
                            "email": decoded.email
                            ,"roles": roles
                        }
                    },
                     process.env.ACCESS_TOKEN_SECRET,
                     {expiresIn: '15m'}
                    );
                res.json({accessToken});

            }

    )


}

module.exports= {handleRefreshToken};