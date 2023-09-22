import express, { Express, Request, Response } from 'express';
import routes from './routes';

const app: Express = express();

function App() {
    app.use("/signup", routes[0]);
    app.use("/login", routes[1]);
    return app;
}
export default App;