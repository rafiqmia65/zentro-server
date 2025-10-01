require("dotenv").config();
const app = require("./app");
const connectDb = require("./config/db");

const port = process.env.PORT || 5000;

// Connect Database
connectDb();

app.listen(port, () => {
  console.log(`🚀 Zentro Place app listening on port ${port}`);
});

// development branch