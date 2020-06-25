const client = require('./client');
let request = {
   req : "abc",
   tag: "trẻ hơn tuổi"
}

client.getWeb(request, (error, website)=>{
    if(!error){
        console.log('website', website)
    }else{
        console.log(error);
    }
})