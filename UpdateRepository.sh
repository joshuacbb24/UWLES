#!/bin/bash

killall python3
killall tmux
cd ~/UWLES
git fetch --all
git reset --hard origin/master 
cd ~
rm -rf /app/**
cp -r ~/UWLES/** /app
rm -rf /app/.git**
cd /app
pip3 install --user -r requirements.txt 
tmux new-session -d -s "django" "bash startServer.sh"

