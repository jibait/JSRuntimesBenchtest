import * as https from 'https';

const hostname: string = '127.0.0.1';
const port: number = 3000;

const startTime: number = Date.now();

const url = 'https://data.gharchive.org/2015-01-{01..31}-{0..23}.json.gz';

https.get(url, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    res.on('data', (d: Buffer) => {
        process.stdout.write(d);
    });
    res.on('end', () => {
        const endTime: number = Date.now();
        const duration: number = endTime - startTime;
        console.log(`Durée du chargement : ${duration} ms`);
    });
});

const server = https.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});