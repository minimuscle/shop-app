#!/bin/sh
git log --pretty=format:user:%aN%n%ct --reverse --raw --encoding=UTF-8 --no-renames --no-show-signature > gource-auto.txt
git log --pretty="format:%ct|%B" --reverse > captions.txt
sed -i -e 's/Josh\ Thiele/minimuscle/' gource-auto.txt
sed -i -e 's/Minimuscle/minimuscle/' gource-auto.txt
gource gource-auto.txt --auto-skip-seconds 1 --date-format "%A, %d %B, %Y" --seconds-per-day 1 --file-idle-time 0 --key --bloom-intensity 0.35 --title "Shop Application Development" --caption-file captions.txt

#--logo ./app/src/notcordsmall.png \ TODO: Fix this to have the shop logo

#--user-image-dir avatars/ \ TODO: Add avatars