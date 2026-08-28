import express from 'express';
import { connectDatabase } from './config/database.js';
import { apiRouter } from './routes.js';
const app = express();
const port = Number(process.env.PORT || 8000);
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
app.use('/api', apiRouter);
app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(400).json({ error: 'Request could not be processed' });
});
connectDatabase()
    .then(() => {
    app.listen(port, () => {
        console.log(`OctoFit API listening on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exitCode = 1;
});
