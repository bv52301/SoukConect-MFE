module.exports = {
  apps: [
    {
      name: "souk-ui",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/var/www/soukconect/apps/shell",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      interpreter: "node",
      interpreter_args: "",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      out_file: "/var/log/souk-ui.out.log",
      error_file: "/var/log/souk-ui.err.log",
      merge_logs: true,
      kill_timeout: 5000,
      listen_timeout: 10000
    }
  ]
};
