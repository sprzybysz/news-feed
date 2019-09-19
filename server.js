const http = require('http');
require('dotenv').config();

const server = http.createServer((req, res) => {
    res.writeHead(200);

    switch(req.url) {
        case '/admin':
            res.end('Admin page');
            break;
        default:
            res.end('News page');
            break;

    }
})

server.listen(process.env.PORT, () => {
    console.log('Server listening at port ' + process.env.PORT);
});