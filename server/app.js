const express = require("express");
const app = express();
const mongoose = require("mongoose");
let { MONGO_URI } = require("./config/keys");
const { resolve, dirname } = require("path");
const PORT = process.env.PORT || 5000;

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("connected to the mongo");
});

mongoose.connection.on("error", () => {
    console.log("error connecting");
});

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });

    // app.use(express.static(path.join(__dirname, "../client/build")));

    // app.get("*", (req, res) => {
    //     res.sendFile(path.join(__dirname, "../client/build/index.html"));
    // });
}

app.listen(PORT, () => {
    console.log("Server is running on", PORT);
});
