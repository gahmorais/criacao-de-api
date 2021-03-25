import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    account = { id: data.nextId, ...account };
    data.nextId++;
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data));
    res.send(account);
  } catch (erro) {
    res.status(400).send({ error: erro.message });
  }

  res.end();
});

router.get("/", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
  } catch (erro) {
    res.status(400).send({ error: erro.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(account);
  } catch (erro) {
    res.status(400).send({ error: erro.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter((account) => {
      return account.id !== parseInt(req.params.id);
    });
    await writeFile(global.fileName, JSON.stringify(data));
    res.end();
  } catch (erro) {
    res.status(400).send({ error: erro.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    const index = data.accounts.findIndex((acc) => acc.id === account.id);
    data.accounts[index] = account;
    await writeFile(global.fileName, JSON.stringify(data));
    res.send(account);
  } catch (erro) {
    res.status(400).send({ error: erro.message });
  }
});

router.patch("/updateBalance", async (req, res) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    const index = data.accounts.findIndex((acc) => acc.id === account.id);

    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data));
    res.send(data.accounts[index])
  } catch (erro) {
    res.status(400).send({ error: erro.message });
  }
});

export default router;
