module.exports = {
    apps: [
        {
            name: "shell",
            script: "npm",
            args: "start",
            cwd: "./apps/shell",
            env: {
                PORT: 3000,
                HOSTNAME: "0.0.0.0",
                NODE_ENV: "production",
            },
        },
        {
            name: "food-connect",
            script: "npm",
            args: "start",
            cwd: "./apps/food-connect",
            env: {
                PORT: 3001,
                HOSTNAME: "0.0.0.0",
                NODE_ENV: "production",
            },
        },
    ],
};


