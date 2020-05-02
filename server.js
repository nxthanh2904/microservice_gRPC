const grpc = require('grpc');
const uuidv1 = require('uuid/v1');
const mongoose = require('mongoose');
const Article = require('./model/article');
const Website = require('./model/website');
const notesProto = grpc.load('./notes.proto');
const notes = [
    { id: '1', title: 'Note 1', content: 'Content 1' },
    { id: '2', title: 'Note 2', content: 'Content 2' }
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
    insert: async (call, callback) => {
        let note = await call.request
        note.id = await uuidv1()
        await notes.push(note)
        await callback(null, note)
    },
    get: async (call, callback) => {
        let req = await call.request;
        let articles = await getByTag(req.tag);
        console.log("=====hehe====", articles);
        await callback(null, articles);
    },
    getWeb: async (call, callback) => {
        let req = await call.request;
        let website = await getWeb(req.tag);
        console.log('website==============', website);
        await callback(null, website);
    }

})
server.bind('127.0.0.1:50051',
    grpc.ServerCredentials.createInsecure());
console.log('Server is running at http://127.0.0.1:50051');
server.start();

async function getByTag(data) {
    // console.log(data);
    // const { tag } = data;
    const articles = await Article.find({ tags: data })
        .select('_id tags status mobile images link title sapo thumbnail category website text sourceCode numberOfWords sentences')
        .lean();
    console.log(articles);
    return articles;
}
async function getByWeb(data) {
    // console.log(data);
    // const { tag } = data;
   // const { web } = data;
    const articles = Articles.find({"website.name" : data})
    .select('_id tags status mobile images link title sapo thumbnail category website text sourceCode numberOfWords sentences')
    .lean();;
    return articles;

}



async function getWeb(data) {
    const website = await Website.find()
        .select('_id official name url hostnames appId').lean();
    return website;
}