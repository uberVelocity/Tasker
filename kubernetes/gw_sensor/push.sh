#!/bin/bash

sudo docker login
sudo docker build -t gw_sensor:latest ../gw_sensor
sudo docker tag gw_sensor:latest s3249212/gw_sensor:latest
sudo docker push s3249212/gw_sensor:latest
