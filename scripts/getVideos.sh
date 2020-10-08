#!/usr/bin/env bash

# Fetch a number of youtube clips by number and search string

##### Functions

usage()
{
cat << EOF
usage: bash ./getVideos.sh -c 6 -s cat
-c    | --count       (Default 6)     Service to deploy
-s    | --searchTerm  (Required)     Source branch
-h    | --help                       Brings up this menu
EOF
}

##### Main

count=12
searchTerm=

# clean up any existing videos
rm -f ../assets/*.mp4

while [ "$1" != "" ]; do
    case $1 in
        -c | --count )        shift 
                              count=$1
                              ;;
        -s | --searchTerm )   shift
                              searchTerm=$1
                              ;;
        -h | --help )         usage
                              exit
                              ;;
        * )                   usage
                              exit 1
    esac
    shift
done

if [ -z $count ]; then
    echo "count is required, provide it with the flag: -c count"
    exit
fi

if [ -z $searchTerm ]; then
    echo "searchTerm is required, provide it with the flag: -s searchTerm"
    exit
fi

echo "Downloading $((count / 2)) $searchTerm videos from youtube..."

# run the youtube-dl magic
video=0
while read line_video ; do
  read line_audio;
  echo $line_video
  echo $line_audio
  
  # ffmpeg -ss 00:00 -i $line_video -t 00:05 -c copy ../assets/${searchTerm}${video}.webm
  ffmpeg -ss 00:00 -i $line_video -ss 00:00 -i $line_audio -map 0:v? -map 1:a? -t 0:03 -c:v libx264 -c:a aac ../assets/${searchTerm}${video}.mp4

  ((video=video+1))
  echo $video
  
done < <(youtube-dl -g "ytsearch${count}:${searchTerm}")
