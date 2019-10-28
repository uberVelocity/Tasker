#!/bin/bash

sudo docker login
sudo docker build -t co2_sensor:latest ../co2_sensor
sudo docker tag co2_sensor:latest s3249212/co2_sensor:latest
sudo docker push s3249212/co2_sensor:latest
