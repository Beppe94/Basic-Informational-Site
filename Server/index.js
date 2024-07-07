const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req,res) => {
    let query = url.parse(req.url, true);
    const fileName = '.' + '/InfoPages' + query.pathname + '.html';
    
    fs.readFile(fileName, (err, data) => {
        if(err) {
            fs.readFile('./InfoPages/404.html', (err404, data404) => {
                if(err404) {
                    res.writeHead(500, {'Content-Type' : 'text/html'});
                    res.write(err404);
                    return res.end();
                }
                res.writeHead(404, {'Content-Type' : 'text/html'});
                res.write(data404);
                res.end();
            })
        } else {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data);
            return res.end();
        }
    });
}).listen(8080);