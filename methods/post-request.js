const crypto = require('crypto');
const requestBodyParser = require('../util/body-parser');
const writetoFile = require("../util/write-to-file");
module.exports =  async (req, res) => {

    if(req.url === "/api/movies")
    {
        try{
            let body = await requestBodyParser(req);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            writetoFile(req.movies);
            res.writeHead(201 , { 'Content-Type': 'application/json'});
            res.end();
        }catch(err){
            console.log(err)
            res.writeHead(400,{"Content-type": "application/json"});
            res.end(JSON.stringify({title:"failed" ,message: "Request body is not valid "}));
        }
    } else
    {
        res.writeHead(404,{"Content-type": "application/json"});
        res.end(JSON.stringify({title:"page  found" ,message: "Route not found "}));
    }
}
