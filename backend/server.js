const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "My JavaScript backend is running!"
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});