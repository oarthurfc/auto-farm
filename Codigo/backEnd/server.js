const { createServer } = require('node:http');
const express = require('express');
const app = express();



const PORT = process.env.PORT || 3500;

app.all('*',(req, res) =>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accept('json')){
        res.json({error : '404 Not Found'});
    } else {
        res.type('txt').send('404 Not Found');
    }
    
})
 app.use(errorHandler);

    mongoose.connection.once('open', () => {
        console.log('Connected to the MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })


