const express = require("express");
const { v4: uuid4 } = require("uuid");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  const video = fs.readFileSync("./data/videos.json", "utf8");
  res.send(JSON.parse(video));
});

router.get("/:id", (req, res) => {
  const videoData = fs.readFileSync("./data/videos.json", "utf8");
  const videoArray = JSON.parse(videoData);
  const foundVideo = videoArray.find((video) => video.id === req.params.id);
  res.send(foundVideo);
});

router.post("/", (req, res) => {
  const videoString = fs.readFileSync("./data/videos.json", "utf8");
  const postVideoArray = JSON.parse(videoString);
  const newData = {
    id: uuid4(),
    title: req.body.title,
    description: req.body.description,
    channel: "Kappy",
    likes: Math.floor(Math.random() * 100000),
    views: Math.floor(Math.random() * 1000000),
    timestamp: new Date().getTime(),
    comments: [],
  };
  postVideoArray.push(newData);
  res.json(newData);
  fs.writeFile(
    "./data/videos.json",
    JSON.stringify(postVideoArray),
    (error) => {
      if (error) {
        console.log(error);
      } else {
        res.send("video upload successfully");
      }
    }
  );
});

module.exports = router;
