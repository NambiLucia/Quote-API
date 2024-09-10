const {app} =require('./new-server')


const PORT = 4800;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
