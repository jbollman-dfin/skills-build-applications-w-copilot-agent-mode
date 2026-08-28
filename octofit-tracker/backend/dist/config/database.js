import mongoose from 'mongoose';
export const PORT = Number(process.env.PORT || 8000);
export const API_BASE_URL = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
export async function connectDatabase() {
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
}
export default mongoose.connection;
