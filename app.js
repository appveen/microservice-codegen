module.exports = function () {
    const os = require('os');
    const path = require('path');
    const express = require('express');
    const bodyParser = require('body-parser');
    const log4js = require('log4js');

    const PORT = process.env.PORT || 3000;
    const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
    const LOG_PATH = process.env.LOG_PATH || path.join(os.homedir(), '.appveen-codegen');

    log4js.configure({
        appenders: { server: { type: 'file', filename: path.join(LOG_PATH, 'server.log') } },
        categories: { default: { appenders: ['server'], level: LOG_LEVEL } }
    });

    const logger = log4js.getLogger('Server');
    const app = express();

    app.use(bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));


    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });

    app.listen(PORT, () => {
        logger.info('Server is listening on port', PORT);
    });
};