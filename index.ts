import express, { Express, Request, Response } from "express";
import Server from "./src/app";

const app: Express = express();
const server: Server = new Server(app);
server.start();
