require("dotenv").config();
const apiUrl = `${process.env.BASE_URL}:${process.env.PORT}`;
const PORT = process.env.PORT || 5050;
const express = require("express");
const app = express();
// app.use(middleware);
const cors = require("cors");
app.use(cors());

const videoRoutes = require("./routes/videos");

app.use(express.json());

// function middleware(req, res, next) {
//   console.log(new Date().toLocaleDateString());
//   console.log(req.url);
//   next();
// }

app.use(express.static("public/images"));

app.use("/videos", videoRoutes);

app.use("/", (req, res) => {
  res.send("you are hitting the server");
});

app.listen(PORT, () => {
  console.log(`listening on post ${apiUrl}`);
});
