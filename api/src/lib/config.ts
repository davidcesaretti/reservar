import dotenv from "dotenv";

dotenv.config();

const config = {
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASSWORD || "1234",
  dbHost: process.env.DB_HOST || "localhost",
  dbName: process.env.DB_NAME || "reservar",
  dbPort: process.env.DB_PORT || "27017",
  dev: process.env.NODE_ENV !== "production",
  port: process.env.API_PORT || "3001",
  host: process.env.API_host || "localhost",
  cors: process.env.CORS || "localhost:3000",
  prod_access_token:
    process.env.PROD_ACCESS_TOKEN ||
    "APP_USR-1653841031742118-071404-52d96bb19db243fd74afb2ef2191fc52-790929283",
};

export default config;
