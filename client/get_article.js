const client = require('./client');
let request = {
   req : "abc",
   tag: "trẻ hơn tuổi"
}

client.get(request, (error, article)=>{
    if(!error){
        console.log('new note create successfully', article)
    }else{
        console.log(error);
    }
})