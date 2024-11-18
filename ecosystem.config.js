// module.exports = {
//   apps : [{
//     script: 'index.js',
//     watch: '.'
//   }, {
//     script: './service-worker/',
//     watch: ['./service-worker']
//   }],

//   deploy : {
//     production : {
//       user : 'SSH_USERNAME',
//       host : 'SSH_HOSTMACHINE',
//       ref  : 'origin/master',
//       repo : 'GIT_REPOSITORY',
//       path : 'DESTINATION_PATH',
//       'pre-deploy-local': '',
//       'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
//       'pre-setup': ''
//     }
//   }
// };

module.exports = {
  apps : [{
    script: 'npm start',
  }], 
  deploy : {
    production : {
      port:  '2222',
      key : '~/.ssh/id_rsa',
      user : 'siin',
      host : '121.162.75.86',
      ref  : 'origin/master',
      repo : 'https://github.com/mmh0705/stompChat_front.git',
      path : '/home/siin',
      'pre-deploy-local': '',
      'post-deploy' : 'cd /home/siin/source && source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options' : 'ForwardAgent=yes'
    }
  }
};
