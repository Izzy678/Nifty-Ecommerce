import dotenv from "dotenv";
dotenv.config();

export const getEnvironmentVariables = () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPRES_IN: process.env.REFRESH_TOKEN_EXPRES_IN,
  };
};
