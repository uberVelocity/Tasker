#!/bin/bash

kubectl apply -f front-end-deployment.yaml
kubectl apply -f front-end-service.yaml 
kubectl apply -f ingress.yaml 
kubectl apply -f back-end-deployment.yaml
kubectl apply -f back-end-service.yaml
kubectl apply -f db-service.yaml
kubectl apply -f db-deployment.yaml 



