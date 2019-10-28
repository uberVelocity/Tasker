#!/bin/bash

sudo docker login
sudo docker build -t history-retriever:latest ../history_retriever
sudo docker tag history-retriever:latest s3249212/history-retriever:latest
sudo docker push s3249212/history-retriever:latest
