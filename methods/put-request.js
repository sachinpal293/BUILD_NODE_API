const requestBodyParser = require('../util/body-parser');
const writetoFile = require("../util/write-to-file");
module.exports = async (req, res) => 
{
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+1);
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/);

    if (!regexV4.test(id))
    {
        res.writeHead(400,{"Content-type": "application/json"});
        res.end(JSON.stringify({title:"Validation failed" ,message: "UUID is not valid "}));
    } else if( baseUrl === "/api/movies/" &&regexV4.test(id))
    {
        try{

            let body =  await requestBodyParser(req);
            const index = req.movies.findIndex((movie)=>{
                return movie.id === id;
            })
    
            if(index === -1)
            {
                res.statusCode = 404;
                res.write(JSON.stringify({title:"movie not found" ,message: "Route not found "}));
                res.end();
            }else
            {
                req.movies[index] = {id,...body}
                writetoFile(req.movies)
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(req.movies[index]));
            }
        }catch(e){
            console.log(e)
            res.writeHead(400,{"Content-type": "application/json"});
            res.end(JSON.stringify({title:"failed" ,message: "Request body is not valid "}));
        }
    }
    else
    {
        res.writeHead(404,{"Content-type": "application/json"});
        res.end(JSON.stringify({title:"page  found" ,message: "Route not found "}));
    }
}