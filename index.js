const express = require("express");
const morgan = require("morgan");
const fs = require("node:fs");
const quotesRouter = require("./routes/quotesRouter"); //can be any variable name
const authorsRouter = require("./routes/authorsRouter");
const path = require('path');


const app = express();
const PORT = 4800;

app.use(express.json());

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'Logs', 'request_logs.txt'), { flags: 'a' })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


//middelware to direct endpoint requests to quotesRouter
app.use("/quotes", quotesRouter);
app.use("/authors", authorsRouter);

app.get("/", (req, res) => {
  res.send("<h1>My First Quote API</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
