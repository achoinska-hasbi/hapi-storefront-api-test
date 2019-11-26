env.REPO_NAME = 'hapi-storefronts-api'
K8S_ENV = env.BRANCH_NAME

pipeline {
    agent {
        kubernetes {
            label env.REPO_NAME
                        yaml  """
kind: Pod
metadata:
  name: $REPO_NAME
spec:
  imagePullSecrets:
  - name: regcred
  containers:
  - name: plugin
    tty: true
    image: xolocalvendors/bebuildbox:8-latest
    command:
    - cat
  - name: docker
    image: docker
    imagePullPolicy: Always
    tty: true
    volumeMounts:
      - name: docker-sock-volume
        mountPath: /var/run/docker.sock
  volumes:
  - name: docker-sock-volume
    hostPath:
      path: /var/run/docker.sock
"""
        }
    }
    environment {
        VERSION = sh(returnStdout: true, script:'git rev-parse HEAD').trim()
    }
    stages {
        stage('notify slack'){
            when { branch 'production' }
            steps{
                notifySlackOfBuildStart('#local-ops-notify')
            }
        }
        stage('npm Install'){
            when { branch 'production' }
            steps{
                container('plugin'){
                    sh "make install"
                }
            }
        }
        stage('Run Tests'){
            when { branch 'production' }
            steps{
                container('plugin'){
                    // We don't set the NODE_ENV until this point so that the dev dependencies are included in the npm install
                    script{ env.NODE_ENV = env.BRANCH_NAME }
                    sh """
                                curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
                                chmod +x ./cc-test-reporter
                                ./cc-test-reporter before-build
                                make test
                                ./cc-test-reporter after-build --id e1e29571047e1b69764936dd4860fa680e631682f99a66b7b4a848ab7313de59 --exit-code 0
                        """
                }
            }
        }
        stage('Build and Publish Package') {
            when { branch 'production' }
            steps {
                container('plugin') {
                    withCredentials([string(credentialsId: 'local-registry-key', variable: 'LOCAL_REGISTRY_KEY')]) {
                        sh "make build-and-upload"
                    }
                }
            }
        }
    }
    post {
        always {
            notifySlackOfBuildResult(currentBuild.currentResult, currentBuild.durationString, '#local-ops-notify')
        }
    }
}
