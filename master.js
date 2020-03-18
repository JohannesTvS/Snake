/*
Wat moet er nog gebeuren:
    draw pas starten als een knop is ingedrukt
    geluid?
    beter scherm als je dood bent. Mss iets van een opnieuw knop
    snelheid van de slang niet vast maken aan de fps, voor smoothere animaties
    text werkt niet bij eindscherm
*/


var vakZijde = 40;  //lengte van 1 vakje
var aantalHokjes = 13;  //aantal hokjes in de lengte en breedte
var spelVlakBreedte = aantalHokjes * vakZijde;
var positieCorrectie = -(0.5*(spelVlakBreedte + 1)); // omdat we WEBGl gebruiken om de 3d kubussen te tekenen is het vlak anders ingesteld, waarbij 0,0 het midden van de canvas is, deze regel corrigeert dat.
var beginLengte = 3;    //begin lengte van de slang
var richting = "links"; //begin richting
var laatsteRichting = richting; //richting die de slang de laatste keer is opgegaan
var fps = 60; //ware frames per seconde
var spelSnelheid = 4; // fps voor de bewegingen

function setup() {
  createCanvas(spelVlakBreedte + 1, spelVlakBreedte + 1, WEBGL); // met WEBGL kan je 3D-objecten renderen
  frameRate(fps);
  background('black');
  slang = new Snake();
  eten = new Eten(slang);
  createCheckers(spelVlakBreedte, vakZijde);    //tekent de achtergrond met schaakpatroon
  slang.teken();
  eten.teken();
  textFont("Verdana");
  textSize(width / 3);
  textAlign(CENTER, CENTER);
}

function draw() {

  //if ()
    createCheckers(spelVlakBreedte, vakZijde);
  if (frameCount % (fps / spelSnelheid) == 0) {
  slang.beweeg(richting);
  laatsteRichting = richting;
  if (eten.isGegeten(slang)) {
    slang.groei(richting);
    eten = new Eten(slang);
  }
}
  eten.teken();
  slang.teken();
  if (slang.dood()) {
   eindScherm();   //stopt alle p5 elementen
 }

}

function eindScherm() {
  background('white');
  fill('black');
  Text("game over",0,0); // wtf waarom geen text
  noLoop();
}

//maakt de achtergrond
function createCheckers(spelVlakBreedte, vakZijde) {    
  for (var rij = 0; rij < spelVlakBreedte; rij += vakZijde) { //gaat alle rijen langs, wordt vergroot met de groote van de zijdes
    for (var kolom = 0; kolom < spelVlakBreedte; kolom += vakZijde) { //hetzelfde als boven, een for loop in een for loop zorgt dat hij alle vakjes gebruikt
      if ((rij % (vakZijde * 2) == 0 && kolom % (vakZijde * 2) != 0) || (kolom % (vakZijde * 2) == 0 && rij % (vakZijde * 2) != 0)) {
        fill('black');
        rect(positieCorrectie + kolom, positieCorrectie + rij,vakZijde,vakZijde);
      } else {
        fill('white');
        rect(positieCorrectie + kolom, positieCorrectie +  rij, vakZijde, vakZijde);
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