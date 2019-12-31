const http = require('http');
const app = require('../app');


const PORT = parseInt(process.env.PORT,10) || 8010;
app.set('PORT',PORT);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Express server corriendo en puerto ${PORT}: \x1b[34m%s\x1b[0m`,`online`);
});