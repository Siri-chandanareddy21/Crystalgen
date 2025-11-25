import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
////////////
pipeline {
    agent any
    tools{
        maven 'MAVEN_HOME'
    }
    stages {
        stage('git repo & clean') {
            steps {
                //bat "rmdir  /s /q mavenjava"
                bat "git clone https://github.com/Harshinampally/Hibernate.git"
                bat "mvn clean -f Hibernate"
            }
        }
        stage('install') {
            steps {
                bat "mvn install -f Hibernate" 
            }
        }
        stage('test') {
            steps {
                bat "mvn test -f Hibernate"
            }
        }
        stage('package') {
            steps {
                bat "mvn package -f Hibernate"
            }
        }
    }
}\
