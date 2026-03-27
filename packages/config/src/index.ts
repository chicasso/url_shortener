export function defaultConfig() {
  return {
    port: '8080',
    jwtSecret: "secret_key",
    mongoUri: "mongodb://localhost:27017/url_shortener",
  };
}

export function getConfig() {
  const { port, mongoUri, jwtSecret } = defaultConfig();
  const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || port,
    mongoUri: process.env.MONGO_URI || mongoUri,
    jwtSecret: process.env.JWT_SECRET || jwtSecret,
    logLevel: process.env.LOG_LEVEL || 'info',
    expiresIn: Number(process.env.EXPIRES_IN),
    algorithm: process.env.ALGORITHM || 'HS256',
  };

  if (!config.mongoUri) {
    throw new Error("MONGO_URI is not defined");
  }
  if (!config.jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return config;
}
