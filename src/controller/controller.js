const fs = require("fs");
const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
var jsonData = require("../../db.json");
const token = "09cbfc3a89c3a50acf075561e00d9235";

function fileWriter(data) {
  const jsonString = JSON.stringify(data);
  fs.writeFileSync("./db.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
    data = JSON.parse(data);
  });
}

router.get("/", (req, res) => {
  axios
    .get(`https://gnews.io/api/v4/top-headlines?token=${token}&lang=en`)
    .then((resp) => {
      let data = [...jsonData.headlines, resp.data.articles];
      jsonData.headlines = data;
      fileWriter(jsonData);
      res.send(resp.data.articles);
    });
});

router.get("/search", (req, res) => {
  axios
    .get(
      `https://gnews.io/api/v4/search?q=${req.query.q}&token=${token}&lang=en`
    )
    .then((resp) => {
      let data = [...jsonData.search, resp.data.articles];
      jsonData.search = data;
      fileWriter(jsonData);
      res.send(resp.data.articles);
    });
});

module.exports = router;
