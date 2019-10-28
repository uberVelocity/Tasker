#!/bin/bash

sudo docker login
sudo docker build -t ingestion:latest ../ingestion
sudo docker tag ingestion:latest s3249212/ingestion:latest
sudo docker push s3249212/ingestion:latest
