export function defaultConfig() {
  return {
    port: 3000,
  };
}

export function getConfig() {
  const { port } = defaultConfig();
  const config = {
    port: process.env.PORT || port,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
  };

  if (!config.mongoUri) {
    throw new Error("MONGO_URI is not defined");
  }
  if (!config.jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return config;
}
