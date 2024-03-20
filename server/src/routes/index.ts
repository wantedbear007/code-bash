import express, { Request, Response } from "express";
import Operations from "../Handlers";

const app = express();
app.use(express.json());
console.log("working !");

export default class Routes {
  static startServices(): void {
    app.post("/upload", Operations.uploadSnippet);
    app.get("/allSubmissions", Operations.getCodes);

    app.listen(8080, () => {
      console.log("you can start listening at http://127.0.0.1:8080");
    });
  }
}
