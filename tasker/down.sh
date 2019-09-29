#!/bin/bash

kubectl delete deployment front-end-deployment 
kubectl delete service node-echo-service 
kubectl delete ingress node-echo-ingress 
kubectl delete deployment back-end-deployment 
kubectl delete service back-end-service 
