import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());
const port = 3000;

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
}

interface Database {
  patients: Record<string, Patient>;
  prescriptions: Record<string, unknown>;
}

const database: Database = {
  patients: {},
  prescriptions: {},
};

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hello world!",
  });
});

app.get("/patients", (req: Request, res: Response) => {
  res.json(Object.values(database.patients));
});

app.get("/patients/:id", (req: Request, res: Response) => {
  const value = database.patients[req.params.id];
  if (value) {
    res.json(value);
  } else {
    res.sendStatus(404);
  }
});

app.post("/patients", (req: Request, res: Response) => {
  const { firstName, lastName } = req.body || {};
  if (!firstName || !lastName) {
    res.status(400).send("Error: Missing required fields");
  } else {
    const id = uuidv4();
    database.patients[id] = {
      id,
      firstName,
      lastName,
    };
    res.json(database.patients[id]);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
