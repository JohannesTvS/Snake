var vakZijde = 40;
var kleur = 'green';

function setup() {
createCanvas(501,501);  // 40 breede/hooge * 20 hokjes + 21 lijnen
  background('black');  
    for (var rij = 0;rij < 500;rij += 50) {
    for (var kolom = 0;kolom < 500;kolom += 50) {
      fill(kleur);
      rect(kolom,rij,50,50);
      if (kleur == 'white') {
        kleur = 'black';
      }
      else {
        kleur = 'white';
      }
    }
    if (kleur=='white') {
      kleur='black';
    }
    else {
      kleur='white';
    }
  }
}

function draw() {
  stroke('green', 100);
  rect(1, 1, 200, 200);
}


