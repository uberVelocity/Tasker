#!/bin/bash

sudo docker login
sudo docker build -t chat:latest ../chat
sudo docker tag chat:latest s3249212/chat:latest
sudo docker push s3249212/chat:latest
