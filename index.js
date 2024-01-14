require("dotenv").config();

const express = require("express");
const app = express();
const apiUrl = `${process.env.BASE_URL}:${process.env.PORT}`;
const PORT = process.env.PORT || 5050;
const cors = require("cors");
app.use(express.static("public/images"));
app.use(middleware);
app.use(cors());
app.use(express.json());

function middleware(req, res, next) {
  console.log(new Date().toLocaleDateString());
  console.log(req.url);
  next();
}

const videoRoutes = require("./routes/videos");

app.use("/videos", videoRoutes);

app.use("/", (req, res) => {
  res.send("you are hitting the server");
});

app.listen(PORT, () => {
  console.log(`listening on post ${apiUrl}`);
});
