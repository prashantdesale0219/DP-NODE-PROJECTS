const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const logger = require('./middlewares/logger.middleware');
const addID = require('./middlewares/addID.middleware');
const auth = require('./middlewares/auth.middleware');

const app = express();
app.use(bodyParser.json());
app.use(logger);

app.post('/add/hero', addID, (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync('./db.json'));
    const newHero = req.body;
    db.heroes.push(newHero);
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    res.json(db.heroes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/heroes', (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync('./db.json'));
    res.json(db.heroes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.patch('/update/villain/:hero_id', auth, (req, res) => {
  try {
    const { hero_id } = req.params;
    const villain = req.body;
    const db = JSON.parse(fs.readFileSync('./db.json'));
    const hero = db.heroes.find((h) => h.id === parseInt(hero_id));

    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    hero.villains.push(villain);
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete('/delete/hero/:hero_id', auth, (req, res) => {
  try {
    const { hero_id } = req.params;
    const db = JSON.parse(fs.readFileSync('./db.json'));
    const heroIndex = db.heroes.findIndex((h) => h.id === parseInt(hero_id));

    if (heroIndex === -1) {
      return res.status(404).json({ message: "Hero not found" });
    }

    db.heroes.splice(heroIndex, 1);
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    res.json(db.heroes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
