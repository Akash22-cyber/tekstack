const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    switch (req.url) {
        case '/':
            res.end('Welcome to the Home Page!');
            break;
        case '/about':
            res.end('About Us: We are developers.');
            break;
        case '/contact':
            res.end('Contact Us at: contact@example.com');
            break;
        case '/services':
            res.end('We provide Development Service.');
            break;
        case '/help':
            res.end('Help Page: How can we assist you today?');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            break;
    }
});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
