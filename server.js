const grpc = require('grpc');
const uuidv1= require('uuid/v1');
const mongoose = require('mongoose');
const Article = require('./model/article');
const notesProto = grpc.load('./notes.proto');
const notes = [
    { id: '1', title: 'Note 1', content: 'Content 1'},
    { id: '2', title: 'Note 2', content: 'Content 2'}
];


const db = 'mongodb://localhost/news-vietnamnet';
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected succesfully"))
    .catch(err => console.log(err));



const server = new grpc.Server();
server.addService(notesProto.NoteService.service, {
    list: (_, callback) => {
        callback(null, notes);
    },
    insert: (call, callback) => {
        let note = call.request
        note.id = uuidv1()
        notes.push(note)
        callback(null, note)
    },
    get: async (call, callback) =>{
        let req = await call.request;
        let articles = await getByTag(req.tag);
        console.log(articles);
       await callback(null,articles);
    }
})
server.bind('127.0.0.1:50051',
            grpc.ServerCredentials.createInsecure());
console.log('Server is running at http://127.0.0.1:50051');
server.start();

async function getByTag(data) {
    // console.log(data);
     // const { tag } = data;
     const articles = await Article.find({ tags: data});
    // console.log(articles);
     return articles;
 }