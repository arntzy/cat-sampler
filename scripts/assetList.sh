#!/usr/bin/env bash

echo "generating file paths..."

# remove old file
rm -f ../assets/videoPaths

# generate new file
for f in ../assets/*.mp4; do
    [[ -e $f ]] || continue
    echo $(basename $f)
    echo $(basename $f) >> ../assets/videoPaths
done
