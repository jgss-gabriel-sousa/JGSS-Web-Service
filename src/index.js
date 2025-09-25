require("dotenv").config();

const express = require("express");
const cors = require("cors");

const gpTycoonRoutes = require("./routes/gpTycoon");
const hnmRoutes = require("./routes/hnm");
const generalRoutes = require("./routes/general");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/gp-tycoon", gpTycoonRoutes);
app.use("/hnm", hnmRoutes);
app.use("/", generalRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
