const express = require("express");
const app = express();
const mongoose = require("mongoose");
let { MONGO_URI } = require("./keys");
const PORT = 5000;

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

app.listen(PORT, () => {
    console.log("Server is running on", PORT);
});
