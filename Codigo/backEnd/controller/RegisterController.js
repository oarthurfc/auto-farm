const  User  = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res) => {
    const user = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    
    if (!user || !password) {
        return res.status(400).json({ 'message': 'Email and password are required.' });}
        
    //check for duplicate Emails in the db
    const duplicate = await User.findOne({email : user}).exec();
    if (duplicate) {
        return res.status(400).json({ 'message': 'Email already exists.' });
    }
    try {
        
        const hashedpassword = await bcrypt.hash(password, 10);
        
        const result = await User.create({
            "email": user,
            "username": username,
            "password": hashedpassword
        })

        console.log(result);
        
        res.status(201).json({'sucess': `New user ${user} created.`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'message': err.message });
        
    }
}

module.exports = {handleNewUser};