let currKey
const videos = []
const keys = ['s', 'd', 'f', 'j', 'k', 'l']

// A class to describe a video
class VideoSample {
  constructor (videoSource, assignedKey, x, y, size) {
    // video path, assigned keyboard key, location and size (square)
    this.x = x
    this.y = y
    this.video = createVideo([videoSource])
    this.assignedKey = assignedKey
    this.size = size
    this.playing = false
  }

  display () {
    image(this.video, this.x, this.y, this.size, this.size)
  }

  toggleVid () {
    if (this.playing) {
      this.video.stop()
    } else {
      this.video.loop()
    }
    this.playing = !this.playing
  }
}

function loadVideos (path, keys) {
  for (key in keys) {
    console.log(keys[key], key)
    const x = key * (windowWidth / keys.length)
    const y = windowHeight / 2
    const size = windowWidth / keys.length
    videos.push(new VideoSample(path, keys[key], x, y, size))
  }
}

function hideVideos () {
  for (videoSample in videos) {
    videos[videoSample].video.hide()
  }
}

function keyTyped () {
  if (keys.includes(key)) {
    console.log(key)
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

function setup () {
  createCanvas(windowWidth, windowHeight)
  loadVideos('./assets/cat.webm', keys)
  hideVideos()
}

function draw () {
  for (videoSample in videos) {
    videos[videoSample].display()
  }
}
