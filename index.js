const express = require("express");
const hypixelApi = require("no-key-hypixel-api");

const app = express();

const port = 6969;

const APIKey = "beta";

const noPlayerDefined = {
    "success": false,
    "cause": "No player provided"
};

const noApiKey = {
    "success": false,
    "cause": "No API key provided"
};

const invalidApiKey = {
    "success": false,
    "cause": "Invalid API key"
};

const invalidPlayerError = {
    "success": false,
    "cause": "Invalid player provided"
}

app.get("/", (req, res) => {
    res.send(`<h1>Hey! Welcome to the Express JS API.</h1>
    <a href = '/api/v1/player'>Player API</a>
    <p>Report bugs to Supelion#4275 on Discord.</p>`);
    res.end();
});

app.get("/api/v1/player", async (req, res) => {
    const { player, key } = req.query;

    // All possible errors
    if (!player) {
        res.json(noPlayerDefined);
        res.end();
        return
    };

    if (!key) {
        res.json(noApiKey);
        res.end();
        return
    };

    if (key != APIKey) {
        res.json(invalidApiKey);
        res.end();
        return
    };

    try {
        const playerStats = await hypixelApi.PlayerInfo(player);
        res.json(playerStats);
        res.end();
    } catch {
        res.json(invalidPlayerError)
        res.end();
    };
});

app.listen(port, () => {
    console.log(`Server listening to requests on port ${port}`);
});