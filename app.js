const express = require('express');
const app = express();
const path = require('path');

var board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
var turn = 0;

// Set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Define default view
app.get('/', (req, res) =>  {
  res.render('index', {board});
  console.log('We got a request!');
});

// Functions for checking winner
function checkWinning(char, a, b, c, d, e) {
  if (board[a] == char && board[b] == char && board[c] == char && board[d] == char && board[e] == char) {
    return true;
  } return false;
};

function checkAll(char) {
  if (checkWinning(char, 0, 1, 2, 3, 4) == true) {
    return 1;
  } else if (checkWinning(char, 0, 5, 10, 15, 20) == true) {
    return 1;
  } else if (checkWinning(char, 0, 6, 12, 18, 24) == true) {
    return 1;
  } else if (checkWinning(char, 1, 6, 11, 16, 21) == true) {
    return 1;
  } else if (checkWinning(char, 2, 7, 12, 17, 22) == true) {
    return 1;
  } else if (checkWinning(char, 3, 8, 13, 18, 23) == true) {
    return 1;
  } else if (checkWinning(char, 4, 9, 14, 19, 24) == true) {
    return 1;
  } else if (checkWinning(char, 4, 8, 12, 16, 20) == true) {
    return 1;
  } else if (checkWinning(char, 5, 6, 7, 8, 9) == true) {
    return 1;
  } else if (checkWinning(char, 10, 11, 12, 13, 14) == true) {
    return 1;
  } else if (checkWinning(char, 15, 16, 17, 18, 19) == true) {
    return 1;
  } else if (checkWinning(char, 20, 21, 22, 23, 24) == true) {
    return 1;
  } else {
    return 0;
  }
};

// Define what happens when player clicks the board
app.get('/clicks/:id', (req, res) => {
  var spot = req.params.id;
  if (board[spot] != '') {
    console.log('Board was not updated')
  } else {
    if (turn == 0) {
      board[spot] = 'x';
      turn = 1;
      if (checkAll('x') == true) {
        console.log('Player 1 has won!');
      };
    } else if (turn == 1) {
      board[spot] = 'o';
      turn = 0;
      if (checkAll('o') == true) {
        console.log('Player 2 has won!');
      };
    } res.redirect('/');
    console.log('Board was updated');
  }
});

// Define what happens when player clicks the restart-button
app.get('/restart/', (req, res) => {
  for (var i = 0; i < 25; i++) {
    board[i] = '';
  } turn = 0;
  res.redirect('/');
});

// Set the port
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log("App is running at localhost:" + app.get('port'))
});
