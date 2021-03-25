import express from "express";
import accountsRouter from "./routes/accounts.js";
import { promises as fs } from "fs";

global.fileName = "accounts.json"

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
  } catch (erro) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
      console.log("API Started and File Created!");
    });
  }
});
