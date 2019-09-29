#!/bin/bash

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml 
kubectl apply -f ingress.yaml 
kubectl apply -f back-end-deployment.yaml
kubectl apply -f back-end-service.yaml 

