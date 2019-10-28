#!/bin/bash

sudo docker login
sudo docker build -t history_receiver:latest ../history_receiver
sudo docker tag history_receiver:latest s3249212/history_receiver:latest
sudo docker push s3249212/history_receiver:latest
