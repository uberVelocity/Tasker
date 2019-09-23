# Things we need to look into

- Message queues (service that runs on the front end, splits data to both cassandra and front end/mongodb).
- Deploying on Heroku not good -> Look into deploying on AWS.
- Dockerizing our app.
- Run multiple instances of the same front-end and back-end and have a load balancer assign the load. 
- The data can be fabricated.
- The functionality is not that important (how the tasks get consumed / computed which server to use).
- CSS framework: Materialize
- Serve the UI using another server. So, build for production, put the public files on a webserver and feed that to the front end.
- [Dockerize nginx static web server](https://jonathanmh.com/deploying-a-vue-js-single-page-app-including-router-with-docker/)
