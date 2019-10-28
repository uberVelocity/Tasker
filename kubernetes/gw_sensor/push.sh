#!/bin/bash

sudo docker login
sudo docker build -t gw-sensor:latest ../gw_sensor
sudo docker tag gw-sensor:latest s3249212/gw-sensor:latest
sudo docker push s3249212/gw-sensor:latest
