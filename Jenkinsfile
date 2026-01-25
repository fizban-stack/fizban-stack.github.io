pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'gem install bundler'
                sh 'bundle install'
            }
        }
        
        stage('Build Site') {
            steps {
                sh 'bundle exec jekyll build'
            }
        }
        
       
        stage('Deploy') {
            steps {
                sshagent(['web-server-deploy-key']) {
                     sh 'rsync -avz -e "ssh -o StrictHostKeyChecking=no" ./_site/ root@192.168.0.50:/var/www/html'
                }
            }
        }
    } 
} 