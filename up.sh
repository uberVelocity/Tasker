#!/bin/sh

_CASSANDRA="sudo docker exec -it cassandradb cqlsh -u admin -p q1w2e3r4"
_DEV="npm run dev"
_SERVE="npm run serve"
# Powers on Tasker application
i3-msg workspace 6 & cd /home/merkel/Documents/University/wacc/full-stack/tasker/backend/server & urxvt --hold -e $_DEV & cd /home/merkel/Documents/University/wacc/full-stack/tasker/frontend & urxvt --hold -e $_SERVE & cd /home/merkel/Documents/University/wacc/full-stack/history_retriever/server & urxvt --hold -e $_DEV & cd /home/merkel/Documents/University/wacc/full-stack/chat/server & urxvt --hold -e $_DEV & sudo urxvt --hold -e $_CASSANDRA & sudo urxvt --hold -e $_CASSANDRA &
