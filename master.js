/*
Wat moet er nog gebeuren:
    draw pas starten als een knop is ingedrukt
    geluid?
    3d appels
    beter scherm als je dood bent. Mss iets van een opnieuw knop
*/


var vakZijde = 40;  //lengte van 1 vakje
var aantalHokjes = 13;  //aantal hokjes in de lengte en breedte
var spelVlakBreedte = aantalHokjes * vakZijde;
var beginLengte = 3;    //begin lengte van de slang
var richting = "links"; //begin richting
var laatsteRichting = richting; //richting die de slang de laatste keer is opgegaan

function setup() {
  createCanvas(spelVlakBreedte + 1, spelVlakBreedte + 1);
  frameRate(4);
  background('black');
  slang = new Snake();
  eten = new Eten(slang);
  createCheckers(spelVlakBreedte, vakZijde);    //tekent de achtergrond met schaakpatroon
  slang.teken();
  eten.teken();
}

function draw() {
  createCheckers(spelVlakBreedte, vakZijde);
  slang.beweeg(richting);
  laatsteRichting = richting;
  if (eten.isGegeten(slang)) {
    slang.groei(richting);
    eten = new Eten(slang);

  }
  eten.teken();
  slang.teken();
  if (slang.dood()) {
    remove();   //stopt alle p5 elementen
  }
}


function createCheckers(spelVlakBreedte, vakZijde) {    //Senne plz doe deze ik snap er niks van
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


//onderbreekt het programma op het moment dat er een knop is ingedrukt
function keyPressed() {
  switch (keyCode) {
    case 38:
      if (laatsteRichting == "omlaag") {}   //om te voorkomen dat je dood kan gaan door omhoog te gaan als je net omlaag ging
      else {
        richting = "omhoog";
      }
      break;
    case 87:
      if (laatsteRichting == "omlaag") {} 
      else {
        richting = "omhoog";
      }
      break;
    case 37:
      if (laatsteRichting == "rechts") {} 
      else {
        richting = "links";
      }
      break;
    case 65:
      if (laatsteRichting == "rechts") {} 
      else {
        richting = "links";
      }
      break;
    case 39:
      if (laatsteRichting == "links") {} 
      else {
        richting = "rechts";
      }
      break;
    case 68:
      if (laatsteRichting == "links") {} 
      else {
        richting = "rechts";
      }
      break;
    case 40:
      if (laatsteRichting == "omhoog") {} 
      else {
        richting = "omlaag";
      }
      break;
    case 83:
      if (laatsteRichting == "omhoog") {} 
      else {
        richting = "omlaag";
      }
      break;
    default:
      break;
  }
}