pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                // Installs bundler if missing, then site deps
                sh 'gem install bundler'
                sh 'bundle install'
            }
        }
        stage('Build Site') {
            steps {
                // Builds to ./_site directory
                sh 'bundle exec jekyll build'
            }
        }
stage('Deploy') {
    steps {
        // 'web-server-deploy-key' matches the ID you set in Step 3
        sshagent(['web-server-deploy-key']) {
            // StrictHostKeyChecking=no prevents the "Are you sure?" prompt
            sh 'rsync -avz -e "ssh -o StrictHostKeyChecking=no" ./_site/ root@192.168.0.50:/var/www/html'
          }
      }
  }
}