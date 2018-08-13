pipeline {
    agent {
        label 'docker'
    }

    environment {
        NODE_PORT = 3200
    }

    stages {
        stage('Build') {
            steps {
                sh 'printenv'
                echo 'Building..'
                sh 'yarn'
            }
        }
        stage('Lint') {
            steps {
                sh 'yarn lint'
            }
        }
        stage('Deploy') {
            when { branch 'master' }
            steps {
                script {
                    def name = 'node_micro_server'
                    def registry = 'http://192.168.0.160:5000'
                    def namespace = 'custom_namespace'
                    echo "Deploying to ${name} in ${registry}"
                    docker.withRegistry(registry) {
                        def image = docker.build("${namespace}/${name}:${env.BUILD_ID}")

                        image.inside {
                          sh 'yarn --prod=false'
                        }
                        image.push()
                        image.push('latest')
                    }
                }
            }
        }
    }

    post {
      always {
        echo 'clean up!'
        cleanWs()
      }
    }
}