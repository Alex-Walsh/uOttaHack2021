import Navigationbar from "./navigationbar";
import { AppStreamCam } from "./phototaking";

import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs";

import React, { useEffect } from "react";
import { DepthwiseConv2dNative } from "@tensorflow/tfjs";

const MULTIPLIER = 1;

function drawPoint(ctx, x, y, r) {
  //console.log(x.toString() + y.toString());
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
}

function videoDimensions(video) {
  // Ratio of the video's intrisic dimensions
  var videoRatio = video.videoWidth / video.videoHeight;
  // The width and height of the video element
  var width = video.offsetWidth, height = video.offsetHeight;
  // The ratio of the element's width to its height
  var elementRatio = width/height;
  // If the video element is short and wide
  if(elementRatio > videoRatio) width = height * videoRatio;
  // It must be tall and thin, or exactly equal to the original ratio
  else height = width / videoRatio;
  return {
    width: width,
    height: height
  };
}

function distance(point1, point2) {
  return Math.hypot(point2["x"]-point1["x"], point2["y"]-point1["y"]);
}
var cough = 0;
var touch = 0;

function touchUpdate() {
  touch++;
  //document.getElementById("touch").innerHTML = touch.toString() + " Touch";
}

function coughUpdate() {
  cough++;
  //document.getElementById("cough").innerHTML = cough.toString() + " Cough";
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

var canCough = true;
var canTouch = true;
async function cooldown(event) {
  if (event === "cough" && canCough) {
    canCough = false;
    coughUpdate();
    sleep(2000).then(() => {
      canCough = true;
    });
  } else if (event === "touch" && canTouch) {
    canTouch = false;
    touchUpdate();
    sleep(2000).then(() => {
      canTouch = true;
    });
  }
}

function detect(points) { //cough
  if (distance(points[7]["position"], points[0]["position"]) <= MULTIPLIER*80 || distance(points[8]["position"], points[0]["position"]) <= MULTIPLIER*80) {
    cooldown("cough");
  }
  if (distance(points[10]["position"], points[0]["position"]) <= MULTIPLIER*80 || distance(points[9]["position"], points[0]["position"]) <= MULTIPLIER*80) {
    cooldown("touch");
  }
  //console.log(distance(points[7]["position"], points[0]["position"]));
  //console.log(cough);
}

const drawResult = (poses) => {
  const ctx = document.getElementById("what-the-ai-sees").getContext("2d");
  const canvas = document.getElementById("what-the-ai-sees");
  const video = document.getElementById("img-to-proscess");
  const size = videoDimensions(video);
  canvas.width = 512;
  canvas.height = 288;

  ctx.drawImage(video, 0, 0, 512, 288);

  //console.log(video.height.toString(), video.offsetHeight.toString(), video.videoHeight.toString());

  poses.forEach((i) => {
    //console.log(i);
    i["keypoints"].forEach((j) => {
      if(j["score"] > 0.5) drawPoint(ctx, j["position"]["x"], j["position"]["y"], 3);
    });

    detect(i["keypoints"]);

  });
};

async function checkDummies(net) {
  // const imageScaleFactor = 1;
  // const flipHorizontal = false;
  // const outputStride = 16;
  const imageElement = document.getElementById("img-to-proscess");
  // load the posenet model
  
  //console.log(imageElement);
  if (imageElement) {
    // var width = imageElement.width;
    // var height = imageElement.height;
    imageElement.height = 288;
    imageElement.width = 512;
    var poses = await net.estimateMultiplePoses(imageElement);
    //console.log(poses);
    drawResult(poses);
  }
}

async function checkVideo() {
  const net = await posenet.load({
    architecture: "ResNet50",
  });
  const videoElement = document.getElementById("img-to-proscess");
  videoElement.addEventListener("loadeddata", () => {
    setInterval(() => checkDummies(net), 100);
  });
  console.log("INIT");
}

function Tensor() {
  useEffect(() => checkVideo(), []);

  // window.setTimeout(function(){
  //   window.clearInterval(id);
  // }, 5000);

  return (
    <div className="App">
      <AppStreamCam />
      {/* <h1 id="cough">{cough} Cough</h1>
      <h1 id="touch">{touch} Touch</h1> */}
    </div>
  );
}

export default Tensor;
