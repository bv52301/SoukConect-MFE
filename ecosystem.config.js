module.exports = {
  apps: [
    {
      name: "souk-ui",

      // IMPORTANT: run next via node, not via shell
      script: "node",

      // Path to Next.js binary
      args: "node_modules/next/dist/bin/next start -p 3000",

      cwd: "/var/www/soukconect/apps/shell",

      env: {
        NODE_ENV: "production",
        PORT: 3000
      },

      // Explicit interpreter safety
      interpreter: "/usr/bin/node",
      interpreter_args: "",

      // Stability settings
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,

      // Logging
      out_file: "/var/log/souk-ui.out.log",
      error_file: "/var/log/souk-ui.err.log",
      merge_logs: true,

      // Startup / shutdown
      kill_timeout: 5000,
      listen_timeout: 10000
    }
  ]
};
