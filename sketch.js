let currKey
let videoFiles
const videos = []
const keys = ['s', 'd', 'f', 'j', 'k', 'l']

// A class to describe a video
class VideoSample {
  constructor (videoSource, assignedKey, x, y, width, height) {
    // video path, assigned keyboard key, location and size (square)
    this.x = x
    this.y = y
    this.video = createVideo([videoSource])
    this.assignedKey = assignedKey
    this.width = width
    this.height = height
    this.playing = false
  }

  // put the video on the canvas
  display () {
    image(this.video, this.x, this.y, this.width, this.height)
  }

  // start/stop the video
  toggleVid () {
    if (this.playing) {
      this.video.stop()
    } else {
      this.video.loop()
    }
    this.playing = !this.playing
  }
}

// loads videos from the videoPaths file and assigns them keys
function loadVideos (paths, keys) {
  paths.pop()
  if (paths.length < keys.length) {
    for (let i = 0; i <= (keys.length - paths.length); i++) {
      console.log(`appending ${paths[i]}`)
      paths.push(paths[i])
    }
  }

  for (key in keys) {
    const x = key * (windowWidth / keys.length)
    const y = 0
    const width = windowWidth / keys.length
    const height = windowHeight
    console.log(`loading ${paths[key]}...`)
    videos.push(new VideoSample(`./assets/${paths[key]}`, keys[key], x, y, width, height))
  }
}

// hide the videos on setup
function hideVideos () {
  for (videoSample in videos) {
    videos[videoSample].video.hide()
  }
}

// play the instrument!
function keyTyped () {
  if (keys.includes(key)) {
    for (videoSample in videos) {
      const vid = videos[videoSample]
      if (vid.assignedKey === key) {
        vid.toggleVid()
      }
    }
  }
}

/********/
/* Main */
/********/

function preload () {
  videoFiles = loadStrings('./assets/videoPaths')
}

function setup () {
  createCanvas(windowWidth, windowHeight)
  loadVideos(videoFiles, keys)
  hideVideos()
}

function draw () {
  for (videoSample in videos) {
    videos[videoSample].display()
  }
}
