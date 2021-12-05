const generateNumbers = () => {
  const games = count();
  const possible = movesPossible(games);
  const winners = winning(possible);
  return winners
}

const { performance } = require('perf_hooks');

var startTime = performance.now()

const numbers = generateNumbers();
    
var endTime = performance.now()

console.log(`Call to generateNumbers took ${endTime - startTime} milliseconds`)
// 401,104 voittavan rivin seulomiseen kului yhteensä n. 33 sekunttia.
// Call to generateNumbers took 20736.04404115677 milliseconds
// Call to generateNumbers took 12380.596415996552 milliseconds
// parseInt("2222222222222222", 3) = 43,046,720 = 401104 wins

// Tallennetaan voittavat pelitilanteet (401,104 kpl.) win.json tiedostoon
// pelialgoritmin nopeaa hyödyntämistä varten.
var numjson = JSON.stringify(numbers);
const fs = require('fs');
fs.writeFileSync('wins.json', numjson);

//node four_by_four.js


////////////////////////////////////////////////////////////////////////////////////////////


// Luodaan lista kaikista mahdollisista 16 merkin pituisista merkkijonoista,
// jotka muodostuvat vain 0,1,2 merkeistä (n.43 miljoonaa kappaletta).
// parseInt("2222222222222222", 3) = 43,046,720
const count = () => {
  const counted = [];
  for (let i = 0;(trinary(i).length < 17); i++) {
    counted.push(frontZeros(trinary(i)));
  }
  return counted
}
// Jouduin ajamaan yllä olevan koodin kahdessa erässä,
// koska muisti ei riittänyt 43 milj. merkkijonon käsittelyyn.
// (let i = 0;(22000000); i++)...
// (let i = 22000001;(i < 43046720); i++)...

// Mikäli alun merkkijonot eivät ole kasvaneet 16 merkin pituuteen, lisätään eteen puuttuvat nollat.
const frontZeros = (str) => {
  let zeros = ''
  for (let i = str.length; i < 16; i++) {
    zeros += '0'
  }
  return zeros + str;
}

// Muutetaan kymmenen-logaritminen luku kolmi-logaritmiseksi, eli ei binääriin vaan trinääriin.
const trinary = (trin) => {
  return (trin).toString(3)
}

// Suodatetaan listalle vain sellaiset merkkijonot missä pelaaja 1 on yhden siirron pelaajaa 2 edellä.
const movesPossible = (toCheck) => {
  const passes = [];
  toCheck.map(check => {
    //movesVary(0, check) && passes.push(check)
    movesVary(1, check) && passes.push(check)
  })
  return passes
}

const movesVary = (diff, check) => {
  if (check.replace(/[^1]/g, "").length - check.replace(/[^2]/g, "").length === diff) {
    return true
  };
  return false
}

// Suodatetaan listalle vain sellaiset pelitilanteet, missä pelaajalla 1 on rivi ja/tai sarake
// ja/tai poikittainen voitto, mutta pelaajalla 2 ei ole voittoa.
const winning = (toCheck) => {
  const win = [];
  toCheck.map(check => {
    if (rowWin(check, '1111') && noWin(check, '2222')) {
      win.push(check)
    } else if (columnWin(check, '1111') && noWin(check, '2222')) {
      win.push(check)
    } else if (crossWin(check, '1111') && noWin(check, '2222')) {
      win.push(check)
    }
  })
  return win
}

const rowWin = (c, p) => {
  return (c[0]+c[1]+c[2]+c[3] === p || c[4]+c[5]+c[6]+c[7] === p || c[8]+c[9]+c[10]+c[11] === p || c[12]+c[13]+c[14]+c[15] === p ) ? true : false
}

const columnWin = (c, p) => {
  return (c[0]+c[4]+c[8]+c[12] === p || c[1]+c[5]+c[9]+c[13] === p || c[2]+c[6]+c[10]+c[14] === p || c[3]+c[7]+c[11]+c[15] === p ) ? true : false
}

const crossWin = (c, p) => {
  return (c[0]+c[5]+c[10]+c[15] === p || c[3]+c[6]+c[9]+c[12] === p) ? true : false
}

const noWin = (c, p) => {
  return (!rowWin(c, p) && !columnWin(c, p) && !crossWin(c, p)) ? true : false
}


