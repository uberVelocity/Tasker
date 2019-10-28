#!/bin/bash

sudo docker login
sudo docker build -t packager:latest ../packager
sudo docker tag packager:latest s3249212/packager:latest
sudo docker push s3249212/packager:latest
