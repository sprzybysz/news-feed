const http = require('http');
fs = require('fs');
path = require('path');
handlebars = require('handlebars');

require('dotenv').config();

const articles = [
    {
        url: 'https://example.com',
        title1: 'Example 1',
    },
    {
        url: 'https://example.com',
        title1: 'Example 2',
    }
]
    

const servePage = (res, pageName, data) => {
    fs.readFile('views/' + pageName, 'utf-8', (err, html) => {
        if(err) {
            console.log(err);
            res.writeHead(500);
            res.end();
        } else {
            res.writeHead(200);
            const templateFunction = handlebars.compile(html);
            res.end(templateFunction(data || {}));
        }
    })
}
// public files
const serverPublicFile = (res, url) => {
    res.writeHead(200);
    let stream = fs.createReadStream(path.join(__dirname, url));
    stream.pipe(res);
}

const server = http.createServer((req, res) => {

    if (req.url.startsWith('/public')) {
        serverPublicFile(res, req.url);
        return;
    }

    switch(req.url) {
        case '/admin':
            servePage(res, 'admin.html');
            break;
        case '/settings':
            servePage(res, 'settings.html')
            break;
        default:
            servePage(res, 'home.html', {
                heading: 'News - Hello World',
                articles
            })
            break;

    }
})

server.listen(process.env.PORT, () => {
    console.log('Server listening at port ' + process.env.PORT);
});