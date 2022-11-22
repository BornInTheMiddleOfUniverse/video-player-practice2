const video = document.querySelector("video");
const videoController = document.getElementById("videoController");
const psBtn = videoController.querySelector("#playPauseBtn");
const volumeBtn = videoController.querySelector("#volume");
const volumeRange = videoController.querySelector("#volumeRange");

const totalTime = document.getElementById("total-time");
const currentTime = document.getElementById("current-time");
const timeLine = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("full-screen");
const videoContainer = document.getElementById("video-container");

let volumeValue = 0.5;
video.volume = volumeValue;
let videoPlayStatus = false;
let fullScreen = document.fullscreenElement;

const handlePlayAndStop = () => {
  console.log('stop', );
  if (video.paused) {
    video.play();
    psBtn.className = "fas fa-pause";
  } else {
    video.pause();
    psBtn.className = "fas fa-play";
  }
};

const handleSound = () => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volumeValue;
    volumeBtn.className = "fas fa-volume-up";
  } else {
    video.muted = true;
    volumeRange.value = 0;
    volumeBtn.className = "fas fa-volume-mute";
  }
};

const handleVolume = (event) => {
  const {
    target: { value }
  } = event;
  if (video.muted) {
    video.muted = false;
    volumeBtn.className = "fas fa-volume-mute";
  }
  if (value === "0") {
    volumeBtn.className = "fas fa-volume-off";
  } else {
    volumeBtn.className = "fas fa-volume-up";
  }
  video.volume = volumeValue = value;
};

const handleTimeLineChange = (event) => {
  console.log('tc', );
  const { target: {value} } = event;
  video.currentTime = value;
}

const handleTimeLineMouseDown = (event) => {
  videoPlayStatus = video.paused ? false : true;
  video.pause();
  psBtn.className = video.paused ? "fas fa-play": "fas fa-pause";
}

const handleTimeLineMouseUp = (event) => {
  if(videoPlayStatus) {
    video.play();
    psBtn.className = "fas fa-pause";
  } else {
    video.pause();
    psBtn.className = "fas fa-play";
  }
}

const handleFullScreen = (event) => {
  console.log('f', );
  if(fullScreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
}

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(11, 19);
};
const handleLoadedMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
}
const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
}


window.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    handlePlayAndStop();
  }
  if ((event.key === "f") && (fullScreen == null)) {
    handleFullScreen();
  }
  if ((event.key === "Escape") && fullScreen ) {
    handleFullScreen();
  }
});


psBtn.addEventListener("click", handlePlayAndStop);
volumeBtn.addEventListener("click", handleSound);
volumeRange.addEventListener("input", handleVolume);

timeLine.addEventListener("input", handleTimeLineChange);
timeLine.addEventListener("mousedown", handleTimeLineMouseDown);
timeLine.addEventListener("mouseup", handleTimeLineMouseUp);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("loadedmetadata", handleLoadedMetaData);