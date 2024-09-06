const envConfig = () => ({
  env: process.env.NODE_ENV || 'local',
  application: {
    port: parseInt(process.env.APPLICATION_PORT, 10) || 3000,
    verbose: process.env.APPLICATION_VERBOSE === 'true',
  },
  database: {
    name: process.env.DATABASE_NAME,
    url: process.env.DATABASE_URL,
  },
  http: {
    timeout: parseInt(process.env.HTTP_TIMEOUT, 10) || 5000,
    maxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS, 10) || 5,
  },
});

export default envConfig;
