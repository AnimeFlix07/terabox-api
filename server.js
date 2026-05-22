import express from "express";
import TeraBox from "./api.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("TeraBox API Running");
});

app.get("/info", async (req, res) => {
    try {
        const url = req.query.url;

        if (!url) {
            return res.status(400).json({
                error: "Provide terabox url"
            });
        }

        const tb = new TeraBox();

        const data = await tb.get(url);

        res.json(data);

    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
