#!/bin/bash

sudo docker login
sudo docker build -t front-end:latest ../frontend
sudo docker push s3249212/front-end:latest
sudo docker build -t back-end:latest ../backend
sudo docker push s3249212/back-end:latest
