const server = require('./api/server.js');

const port = process.env.PORT || 2500;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));

server.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: "API is UP"
    })
})
