const express = require("express");
const morgan = require("morgan");
const quotesRouter = require("./routes/quotesRouter"); //can be any variable name

const app = express();
const PORT = 4800;

app.use(express.json());
app.use(morgan("dev"));
//middelware to direct endpoint requests to quotesRouter
app.use("/quotes", quotesRouter);

app.get("/", (req, res) => {
  res.send("<h1>My First Quote API</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
