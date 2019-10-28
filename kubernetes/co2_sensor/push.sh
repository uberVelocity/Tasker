#!/bin/bash

sudo docker login
sudo docker build -t co2-sensor:latest ../co2_sensor
sudo docker tag co2-sensor:latest s3249212/co2-sensor:latest
sudo docker push s3249212/co2-sensor:latest
