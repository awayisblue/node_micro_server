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
                    def registry = 'docker.io'
                    def namespace = 'awayisblue'
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