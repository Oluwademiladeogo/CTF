import http from "http";
import app from "./app";
import {config} from "dotenv"
config()
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV)
const startServer = () => {
  server.listen(port, () => {
    if (process.env.NODE_ENV === "development") {
      console.log(`server running on port ${port}`);
    }
  });
};
startServer();
