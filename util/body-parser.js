module.exports = async (request) =>{
    return new Promise((resolve,reject) =>
    {
        try{

        let body = ""
        request.on("data",(chunk) =>
        {
            body += chunk;
        });
        request.on("end",() =>{
            resolve(JSON.parse(body));
        })
        }catch(e)
        {
            console.log(e);
            reject(e);
        }
    })
}