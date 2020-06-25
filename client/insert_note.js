const client = require('./client');
let newNote = {
    title:"new note",
    content: "new note content"
}

client.insert(newNote, (error, note)=>{
    if(!error){
        console.log('new note create successfully', note)
    }else{
        console.log(error);
    }
})