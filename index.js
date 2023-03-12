import express from 'express';
import connection from './database.js';

const app = express();

app.get('/person/:id?', (req, res) => {
  const {id} = req.params;

  if (id === undefined) {
    res.status(200).send('Por favor, forneça um id como parâmetro de rota.');
    return;
  }

  const sql = 'SELECT * FROM contacts WHERE contacts_id = ?;';

  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (result.length === 0) {
      res.status(404).send('Id não encontrado.');
      return;
    }

    res.send(result[0]);
  });
});

const port = 3000;

app.listen(port, () => console.log('Express server listening on port ' + port));