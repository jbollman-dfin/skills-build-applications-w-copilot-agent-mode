import express from 'express';
import { API_BASE_URL, PORT, connectDatabase } from './config/database.js';
import { apiRouter } from './routes.js';
const app = express();
app.use((request, response, next) => {
    const origin = request.headers.origin;
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
    if (process.env.CODESPACE_NAME) {
        allowedOrigins.push(`https://${process.env.CODESPACE_NAME}-5173.app.github.dev`);
    }
    if (origin && allowedOrigins.includes(origin)) {
        response.setHeader('Access-Control-Allow-Origin', origin);
    }
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    if (request.method === 'OPTIONS') {
        response.sendStatus(204);
        return;
    }
    next();
});
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', apiBaseUrl: API_BASE_URL, port: PORT });
});
app.use('/api', apiRouter);
app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(400).json({ error: 'Request could not be processed' });
});
connectDatabase()
    .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`OctoFit API listening on port ${PORT}`);
        console.log(`API base URL: ${API_BASE_URL}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exitCode = 1;
});
