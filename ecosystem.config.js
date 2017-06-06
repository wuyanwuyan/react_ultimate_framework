module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: 'react_ultimate_framework',
            script: 'release/server.js',
            instances: 3,
            env: {
                COMMON_VARIABLE: 'true'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: 'claude',
            host: [
                {
                    "host": "localhost",
                    "port": "22"
                }
            ],
            ref: 'origin/master',
            repo: 'git@github.com:wuyanwuyan/react_ultimate_framework.git',
            path: '/Users/claude/Desktop',
            'post-deploy': 'yarn install && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
        },
        dev: {
            user: 'node',
            host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/development',
            'post-deploy': 'yarn install && npm run build && pm2 reload ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'dev'
            }
        }
    }
};
