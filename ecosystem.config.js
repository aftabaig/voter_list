module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [{
      name      : 'voter_list',
      script    : 'bin/www.js',
      env: {
        NODE_ENV: 'development'
      },
      env_staging : {
        NODE_ENV: 'staging'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    staging : {
      key  : '/Users/ssasoft/.ssh/ssasoft-gitlab',
      user : 'aftab',
      host : 'tabdeeliapp.ssasoft.com',
      ref  : 'origin/master',
      repo : 'https://github.com/aftabaig/voter_list.git',
      path : '/home/aftab/voter_list',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env staging'
    }
  }
};
