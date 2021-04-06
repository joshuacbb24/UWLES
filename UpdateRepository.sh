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
tmux new-session -d -s "django" "LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH /usr/bin/python3 manage.py runserver '0.0.0.0:8000'"

