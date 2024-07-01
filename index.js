const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:3001', 
  methods: 'GET,POST'
}));
app.use(bodyParser.json());

const generateCards = () => {
  const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
  const shuffledCards = cardValues.sort(() => Math.random() - 0.5);
  return shuffledCards.map((value, index) => ({ id: index, value, revealed: false, matched: false }));
};

let cards = generateCards();
let moves = 0;
let lastCardIndex = null;

app.get('/api/game', (req, res) => {
  res.json({ cards, moves });
});

app.post('/api/reveal', (req, res) => {
  const { index } = req.body;
  const card = cards[index];

  if (!card.revealed && !card.matched) {
    card.revealed = true;
    moves++;
    
    if (lastCardIndex===null) {
      lastCardIndex=index;
    } else {
      if (cards[lastCardIndex].value === card.value) {
        cards[lastCardIndex].matched = true;
        card.matched = true;
      } else {
        setTimeout(() => {
          cards[lastCardIndex].revealed = false;
          card.revealed = false;
          lastCardIndex = null;
          res.json({ cards, moves });
        }, 1000);
        return;
      }
      lastCardIndex = null;
    }
  }

  const allMatched = cards.every(card => card.matched);
  res.json({ cards, moves, win: allMatched });
});

app.post('/api/reset', (req, res) => {
  cards = generateCards();
  moves = 0;
  lastCardIndex = null;
  res.json({ cards, moves });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
