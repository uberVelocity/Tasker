#!/bin/bash

kubectl delete deployment front-end-deployment 
kubectl delete service front-end-service 
kubectl delete ingress tasker-ingress 
kubectl delete deployment back-end-deployment 
kubectl delete service back-end-service 
