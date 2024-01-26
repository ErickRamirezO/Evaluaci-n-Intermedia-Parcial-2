const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let cuestionarioData = [];

app.post('/guardarCuestionario', (req, res) => {
  const nuevoCuestionario = req.body;
  cuestionarioData.push(nuevoCuestionario);
  res.json({ success: true, data: cuestionarioData });
});


app.get('/obtenerCuestionario', (req, res) => {
  res.json(cuestionarioData);
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
