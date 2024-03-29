const express = require('express');
const bodyParser = require('body-parser');
const card_images = require('../database/mysql/utils/card_images');
const display_images = require('../database/mysql/utils/display_images');
const related_images = require('../database/mysql/utils/related_images');

const app = express();
const port = 8080;

app.use(express.static('../public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/:id', (req, res) => {
  if (req.params.id === 'favicon.ico') {
    res.end();
    return;
  }

  return card_images.get({id: req.params.id})
    .then((results) => {
      console.log('Success:', results[0][0]);
      const result = JSON.stringify(results[0][0]);
      res.send(result);
    })
    .catch((error) => {
      console.log('Error:', error);
      res.redirect('/');
    });
});

app.get('/display/:id', (req, res) => {
  if (req.params.id === 'favicon.ico') {
    res.end();
    return;
  }

  return display_images.get({id: req.params.id})
    .then((results) => {
      console.log('Success:', results[0][0]);
      res.end();
    })
    .catch((error) => {
      console.log('Error:', error);
      res.end();
    });
});

app.get('/related/:id', (req, res) => {
  if (req.params.id === 'favicon.ico') {
    res.end();
    return;
  }

  return related_images.get({ids: req.body.data})
    .then((results) => {
      console.log('Success:', JSON.stringify(results[0]));
      res.end();
    })
    .catch((error) => {
      console.log('Error:', error);
      res.end();
    });
});

app.listen(port, () => {
  console.log(`Listening on PORT:${port}`);
});
