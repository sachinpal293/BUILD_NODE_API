module.exports = (req, res) => {
   
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+1);
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/);

    if(req.url === "/api/movies")
    {
        res.statusCode = 200;
        res.setHeader('Content-Type' , "application/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    }else if (!regexV4.test(id))
    {
        res.writeHead(400,{"Content-type": "application/json"});
        res.end(JSON.stringify({title:"Validation failed" ,message: "UUID is not valid "}));
    }else if(baseUrl === "/api/movies/" &&regexV4.test(id))
    {
       
        res.setHeader('Content-Type' , "application/json");
        let filteredmovies = req.movies.filter((m)=>{
            return m.id===id;
        })

        if(filteredmovies.length > 0)
        {
            res.statusCode = 200;
            res.write(JSON.stringify(filteredmovies));
            res.end();
        }else
        {
            res.statusCode = 404;
            res.write(JSON.stringify({title:"page  found" ,message: "Route not found "}));
            res.end();
        }
    }
    else
    {
        res.writeHead(404,{"Content-type": "application/json"});
        res.end(JSON.stringify({title:"page  found" ,message: "Route not found "}));
    }
}