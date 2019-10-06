const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, 'dist/'),
    devServer: {
        proxy: {
            '/api': {
                target: 'http://back-end-service.default.svc.cluster.minikube.info:5000'
            }
        }
    }
}
