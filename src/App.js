import './App.css';
import React, { useState, useEffect } from 'react';
import Square from './Square'

function App() {
  // Alustetaan peli 16. nollalla, eli pelaamattomalla ruudulla.
  // Asetetaan kaikkien ruutujen button-disabled-state falseksi.
  // Epäkohtelian algoritmi (player 1) aloittaa pelin.
  const [game, setGame] = useState(Array(16).fill('0'));
  const [player, setPlayer] = useState('1');
  const [isDisabled, setIsDisabled] = useState(Array(16).fill(false));

  // 401,104 (kaikki) voittavat pelitilanteet pelaajalla 1.
  let wins = require('./wins.json');

  // Algoritmi tekee siirron kun on sen vuoro.
  useEffect(() => {
    if (player === '1') {
      const start = new Date().getTime();
      move()
      const end = new Date().getTime();
      const time = end - start;
      console.log(`Execution time: ${time} milliseconds \n`);
    }
  }, [player])

  // Algoritmin vuorolla ruutu valiaan pickMove() funktiolla.
  // move() funktion annetaan Square (button) komponentille ja
  // käyttäjän vuorolla ruutu valitaan sieltä tulevan clicked parametrin perustella.
  // Kulloisenkin pelaaja numero asetetaan valittuun ruutuun ja peli tallennetaan.
  const move = (clicked) => {
    const index = player === '1' ? pickMove() : clicked
    game[index] = player;
    setGame(game);
    const square = [...isDisabled]
    square[index] = true;
    setIsDisabled(square); 
    player === '1' ? setPlayer('2') : setPlayer('1')
  }

  // Funktio hakee nykyistä pelitilannetta seuraavat tilanteet mextMoves() funktiolta ja
  // valitsee siltä listalta vaihtoehdon, minkä takana on eniten voittavia pelitilanteita.
  const pickMove = () => {
    const options = nextMoves();
    let pick = options[0];
    for (let i = 0; i < options.length; i++) {
      if (winsCount(pick['game']) < winsCount(options[i]['game'])) {
        pick = options[i];
      }
    }
    pick !== undefined && console.log('Wins remaining: ' + winsCount(pick['game']))
    return pick !== undefined && pick['index']
  }
  
  // Tallennetaan kaikkien pelattujen ruutujen (gameOption) indeksit ja
  // palautetaan montako sellaista peliä voittavat pelit listalla on,
  // missä pelattujen ruutujen indeksit täsmäävät voittavien pelien indekseihin.
  const winsCount = (gameOption) => {
    const indexes = squaresPlayed(gameOption);
    return wins.filter(win => !indexes.some(index => gameOption[index] !== win[index])).length;
  }

  // Palautetaan indeksit, missä indeksi ei ole nolla (pelaamaton).
  const squaresPlayed = (gameOption) => {
    let indexes = []
    for (let i = 0; i < 16; i++) {
      gameOption[i] !== '0' && indexes.push(i)
    }
    return indexes
  }

  // Palautetaan kaikki mahdolliset yhden nykyistä pelitilannetta edellä olevat siirrot
  // pelaajalle 1 (algoritmi).
  const nextMoves = () => {
    let updated = [];
    for (let i = 0; i < 16; i++) {
      if (game[i] === '0') {
        let option = [...game]
        option[i] = '1'
        updated.push({'index': i, 'game': option})
      }
    }
    return updated
  }

  return (
  <div className="App">
    <div className="Buttons">
    {game.map((value, index) => 
      <Square
        key={index}
        index={index}
        square={value}
        move={move}
        disabled={isDisabled[index]}/>
    )}
    </div>
  </div>
);
}

export default App;

