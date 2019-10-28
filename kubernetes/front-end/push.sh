#!/bin/bash

sudo docker login
sudo docker build -t front-end:latest ../tasker/frontend
sudo docker tag front-end:latest s3249212/front-end:latest
sudo docker push s3249212/front-end:latest