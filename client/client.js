const grpc = require('grpc');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const  PROTO_PATH = './notes.proto'
const PORT = 4000;
const NoteService = grpc.load(PROTO_PATH).NoteService;
const client = new NoteService('grpc-server:50051',
            grpc.credentials.createInsecure());

app.use(bodyParser());
app.post('/get_article', async(req, res)=>{

    let request = req.body;
    console.log(request);

    client.get(request, (error, article)=>{
        if(!error){
            console.log('new note create successfully', article)
            res.status(200).json(article);
        }else{
            console.log(error);
        }
    })

})

app.listen(PORT, ()=> console.log(`Client is listening on ${PORT}`));
//module.exports = client;
