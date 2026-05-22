import express from 'express';
import { TeraBoxApp } from './api.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize the TeraBox client (you can add session handling as needed)
const terabox = new TeraBoxApp();

// Define your API endpoints here
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        await terabox.login(username, password);
        res.json({ success: true, message: 'Logged in successfully' });
    } catch (error) {
        res.status(401).json({ success: false, error: error.message });
    }
});

app.get('/api/list', async (req, res) => {
    try {
        const files = await terabox.listFiles('/');
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
