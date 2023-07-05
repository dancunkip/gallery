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
                    def herokuApp = 'gallerypipeline' 
                    def herokuToken = credentials('8519b567-8357-4399-9196-b98c267045ec') /

                    sh 'npm run build' // Build the application

                    withCredentials([string(credentialsId: herokuToken, variable: 'HEROKU_API_TOKEN')]) {
                        sh "heroku plugins:install heroku-cli-deploy" 
                        sh "heroku login --interactive" 
                        sh "heroku git:remote --app ${herokuApp}" 
                        sh 'git push heroku master' 

                        sh 'heroku run npm run migrate --app ${herokuApp}' 
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
                def herokuURL = 'https://gallerypipeline-327f0f007f30.herokuapp.com/' 
                slackSend (
                    channel: '#dankipip1',
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
