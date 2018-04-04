pipeline {
    environment {
        CI = 'true'
	DATABASE_URL = credentials('postgres-url')
	SPOTIFY_SECRET = credentials('spotify-secret') 
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') { 
            steps {
                sh 'npm test' 
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
            }
        }
    }
}
