import express from "express";
import TeraBox from "./api.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        status: "TeraBox API Running"
    });
});

app.get("/info", async (req, res) => {

    try {

        const url = req.query.url;

        if (!url) {
            return res.status(400).json({
                error: "Missing terabox url"
            });
        }

        const terabox = new TeraBox();

        const data = await terabox.get(url);

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
