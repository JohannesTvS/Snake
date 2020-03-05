var vakZijde = 40;
var aantalHokjes = 20;
var spelVlakBreedte = aantalHokjes * vakZijde;
var beginLengte = 3;
var richting = "links";

function setup() {
  createCanvas(spelVlakBreedte + 1, spelVlakBreedte + 1);
  frameRate(1);
  background('black');
  slang = new Snake();

}


function draw(){
    createCheckers(spelVlakBreedte, vakZijde);
    slang.beweeg(richting);
    slang.teken();
console.log(richting);

}


function createCheckers(spelVlakBreedte, vakZijde) {
  for (var rij = 0; rij < spelVlakBreedte; rij += vakZijde) {
    for (var kolom = 0; kolom < spelVlakBreedte; kolom += vakZijde) {
      if ((rij % (vakZijde * 2) == 0 && kolom % (vakZijde * 2) != 0) || (kolom % (vakZijde * 2) == 0 && rij % (vakZijde * 2) != 0)) {
        fill('black');
        rect(kolom, rij, vakZijde, vakZijde);
      } else {
        fill('white');
        rect(kolom, rij, vakZijde, vakZijde);
      }
    }
  }
}

function keyPressed() {
  switch (keyCode) {
    case 38:
      richting = "omhoog";
      break;
    case 87:
      richting = "omhoog";
      break;
    case 37:
      richting = "links";
      break;
    case 65:
      richting = "links";
      break;
    case 39:
      richting = "rechts";
      break;
    case 68:
      richting = "rechts";
      break;
    case 40:
      richting = "omlaag";
      break;
    case 83:
      richting = "omlaag";
      break;
    default:
      break;
  }

}