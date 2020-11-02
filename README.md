# cat-sampler

The cat-sampler instrument takes a list of video files located in `assets/` and places them in the browser attached to the `s, d, f, j, k, l` keys to start/stop the video loops.

You can put your own 6 videos in `assets/` and then edit `assets/videoPaths` to make sure `$ cat assets/videoPaths` shows the correct file list (filenames only)....

Example output of `$ cat assets/videoPaths`:

```bash
nachos0.mp4
nachos10.mp4
nachos2.mp4
nachos4.mp4
nachos6.mp4
nachos8.mp4
```

### OR...


- To generate material from inside the `scripts/` directory (might not always work!):
   
```bash
$ ./getVideos.sh -c 6 -s <searchTerm>`
$ ./assetList.sh
```

- Serve p5 and press the keys! 