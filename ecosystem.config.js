module.exports = {
    apps : [{
      name: "deployment3",
      script: "bin/www",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
          PORT: process.env.PORT || 3000,
          HOST: process.env.HOST,
          NODE_ENV: "development",
          NODE_PATH: "./",
          ENABLE_NODE_LOG: "YES",
          DEBUG:"deployment:*",
      }
    }]
  };