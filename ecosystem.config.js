module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // First application
        {
            name: 'cq_biying_web',
            script: './release/server.js',
            instances: 1,
            error_file: "./logs/app-err.log",//错误输出日志
            out_file: "./logs/app-out.log",  //日志
            env: {
                COMMON_VARIABLE: 'true'
            },
            env_production: {
                NODE_ENV: 'production'
            },
        }
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: 'xiangsheng',
            host: [
                {
                    "host": "121.41.91.93",
                    "port": "6677"
                }
            ],
            ref: 'origin/bitnews360',
            repo: 'https://github.com/wuyanwuyan/react_ultimate_framework.git',
            path: '/data/cq-biying-web',
            "post-setup": "ls -la",
            'post-deploy': 'yarn install --production=false && yarn run build && sudo pm2 startOrRestart ecosystem.config.js --env production',
            env: {
                "NODE_ENV": "production"
            }
        },
        dev: {
            user: 'xiangsheng',
            host: [
                {
                    "host": "121.41.91.93",
                    "port": "6677"
                }
            ],
            ref: 'origin/bitnews360',
            repo: 'https://github.com/wuyanwuyan/react_ultimate_framework.git',
            path: '/data/cq-biying-web',
            'post-deploy': 'yarn install --production=false && npm run build && sudo pm2 reload ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'dev'
            }
        }
    }
};

// 第一次部署，要 pm2 deploy ecosystem.config.js production setup
