module.exports = {
  apps: [
    {
      name: "souk-ui",
      cwd: "/var/www/soukconect/apps/shell",
      script: "node_modules/.bin/next",
      args: "start -p 3000",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 5,
      min_uptime: "30s"
    }
  ]
};
