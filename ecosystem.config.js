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
      repo : 'https://github.com/mmh0705/stomp_chat_front.git',
      path : '/home/siin',
      'pre-deploy-local': '',
      'post-deploy' : 'cd /home/siin/source && source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options' : 'ForwardAgent=yes'
    }
  }
};
