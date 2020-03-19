/*
Wat moet er nog gebeuren:
    draw pas starten als een knop is ingedrukt
    geluid?
    opnieuwknop moet nog onder de game over staan, misschien knop in javascript ipv html
*/

var roboto;
function preload() { // zorgt ervoor dat het ingeladen woord voor de draw
    roboto = loadFont('fonts/Roboto-Regular.ttf'); // laad het lettertype in
}

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
  textFont(roboto); //standaardlettertype
  textSize(width / 20); //standaardgrootte van de tekst is de breedte van de canvas gedeeld door 20
  textAlign(CENTER, CENTER); //zorgt ervoor dat de text in het textvak standaard gecentreerd is
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
   eindScherm();
 }

}

function eindScherm() {
  fill('rgba(255,255,255,0.75)'); //witte kleur met doorzichtigheid zodat je het spelvlak nog een beetje kan zien
  translate(0,0,50); // voorhoogt de positie in de hoogte, zodat ook de slang en appel onder het blok staan
  rect(positieCorrectie,positieCorrectie,spelVlakBreedte,spelVlakBreedte); //blok over het hele speelvlak heen
  fill('black');
  text("game over",0,0);

  //maakt een html knop waarmee je de pagina kan herladen om opnieuw te spelen
  var opnieuwKnop = document.createElement("BUTTON"); //maakt de knop element
  opnieuwKnop.innerHTML = "speel nog een keer"; //de tekst die op de knop komt te staan
  document.body.appendChild(opnieuwKnop); //voegt de knop toe aan de body van het html document waar dit bestand in zit
  var opnieuwAtt = document.createAttribute("onclick"); //maakt de attribute onclick
  opnieuwAtt.value = "location.href = 'index.html';"; //de waarde die bij onclick komt te staan
  opnieuwKnop.attributes.setNamedItem(opnieuwAtt); //attribuut word toegevoegt
  noLoop(); //stopt de draw
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