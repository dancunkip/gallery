pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install' // Install project dependencies
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test' // Run project tests
            }
        }
        
      stage('Deploy to Heroku') {
            steps {
                script {
                    def herokuApp = 'gallerypipeline' // Replace with your Heroku app name
                    def herokuToken = credentials('heroku-api-token') // Replace with your Heroku API token credential ID

                    sh 'npm run build' // Build the application

                    withCredentials([string(credentialsId: herokuToken, variable: 'HEROKU_API_TOKEN')]) {
                        sh "heroku plugins:install heroku-cli-deploy" // Install Heroku CLI deploy plugin
                        sh "heroku login --interactive" // Login to Heroku using the API token

                        sh "heroku git:remote --app ${herokuApp}" // Set the Heroku remote for deployment
                        sh 'git push heroku master' // Push the code to Heroku

                        sh 'heroku run npm run migrate --app ${herokuApp}' // Run database migrations on Heroku
                    }
                }
            }
        }
    }

    
    post {
        failure {
            emailext (
                to: 'dancunkipkirui@student.moringaschool.com',
                subject: 'Project Build Failed',
                body: 'The project build has failed. Please check the Jenkins logs for more information.'
            )
        }
        success {
            script {
                def herokuURL = 'https://galleypipeline.herokuapp.com' // Replace with the actual Heroku URL
                slackSend (
                    channel: '#your-slack-channel',
                    color: 'good',
                    message: "Deployment successful! Build ID: ${env.BUILD_ID}",
                    attachments: [
                        [
                            fallback: "Deployment successful!",
                            color: 'good',
                            actions: [
                                [
                                    type: 'button',
                                    text: 'View on Heroku',
                                    url: herokuURL
                                ]
                            ]
                        ]
                    ]
                )
            }
        }
    }
}
