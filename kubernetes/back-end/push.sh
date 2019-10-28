#!/bin/bash

sudo docker login
sudo docker build -t back-end:latest ../tasker/backend
sudo docker tag back-end:latest s3249212/back-end:latest
sudo docker push s3249212/back-end:latest
