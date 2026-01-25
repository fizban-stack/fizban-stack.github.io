pipeline {
    agent { label 'remote-web-server' } 

    stages {
        stage('Install Dependencies') {
            steps {
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
                sh 'cp -r ./_site/* /var/www/html/'
            }
        }
    }
}
