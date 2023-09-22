import {connectToDatabase} from "./src/services/database.service";
import routes from "./src/routes";
import express, {Express} from "express";
import App from "./src/App";
const app: Express = express();
connectToDatabase()
    .then(() => {
      const app = App();
        return app.listen(process.env.PORT, () => {
            //console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

