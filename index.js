const express = require("express");
const app = express();
app.use(express.json());

const newsController = require("./src/controller/controller");

app.use("/", newsController);

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
