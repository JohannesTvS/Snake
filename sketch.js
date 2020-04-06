/*
Wat moet er nog gebeuren:
    pauzeknop naast esc. Zou mooi zijn als het dezelfde knop is als de opnieuw knop, maar met andere tekst en functie
    geluid?
    ik vermoed dat het spel sloom voelt omdat het de 60 fps niet kan aantikken
    kan, ik merk er niet veel van, maar als het zo is komt dat omdat createcheckers lang duurt
*/

var roboto;
function preload() { // zorgt ervoor dat het ingeladen woord voor de draw
    roboto = loadFont('fonts/Roboto-Regular.ttf'); // laad het lettertype in
}

var beginScherm = true;
var pauzeScherm = false;

var vakZijde = 40;  //lengte van 1 vakje
var aantalHokjes = 13;  //aantal hokjes in de lengte en breedte
var spelVlakBreedte = aantalHokjes * vakZijde;
var positieCorrectie = -(0.5*(spelVlakBreedte + 1)); // omdat we WEBGl gebruiken om de 3d kubussen te tekenen is het vlak anders ingesteld, waarbij 0,0 het midden van de canvas is, deze regel corrigeert dat.

var beginLengte = 3;    //begin lengte van de slang
var richting = "links"; //begin richting
var laatsteRichting = richting; //richting die de slang de laatste keer is opgegaan

var fpBeweging3d = 6; //ware frames per beweging van de slang voor de 3d objecten
var spelSnelheid = 10; // fps voor de bewegingen

function setup() {
  createCanvas(spelVlakBreedte + 1, spelVlakBreedte + 1, WEBGL); // met WEBGL kan je 3D-objecten renderen
  frameRate(fpBeweging3d * spelSnelheid);
  background('black');
  slang = new Snake();
  eten = new Eten(slang);
//   createCheckers(spelVlakBreedte, vakZijde);    //tekent de achtergrond met schaakpatroon
//   slang.teken();
//   eten.teken();
  textFont(roboto); //standaardlettertype
  textSize(width / 20); //standaardgrootte van de tekst is de breedte van de canvas gedeeld door 20
  textAlign(CENTER, CENTER); //zorgt ervoor dat de text in het textvak standaard gecentreerd is
}

function draw() {
    if(beginScherm) {
        fill('white');
        rect(positieCorrectie,positieCorrectie,width,height);
        beginScherm = rectKnop(width*0.5 - 50, height*0.5 - 25, 100, 50, 'white', 'red' , beginScherm);
        fill('black');
        text("snake", 0, -50);
    }
    else if (pauzeScherm){
        fill(255);
        translate(0,0,50); // voorhoogt de positie in de hoogte, zodat ook de slang en appel onder het blok staan
        rect(positieCorrectie,positieCorrectie, spelVlakBreedte); //blok over het hele speelvlak heen
        fill(0);
        text("pauze",0,0);
        
    } 
    else {
    createCheckers(spelVlakBreedte, vakZijde);
    if (frameCount % fpBeweging3d == 0) {
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
}

function eindScherm() {
  fill('rgba(255,255,255,0.75)'); //witte kleur met doorzichtigheid zodat je het spelvlak nog een beetje kan zien
  translate(0,0,50); // voorhoogt de positie in de hoogte, zodat ook de slang en appel onder het blok staan
  rect(positieCorrectie,positieCorrectie,spelVlakBreedte,spelVlakBreedte); //blok over het hele speelvlak heen
  fill('black');
  text("game over",0,0);

  //maakt een html knop waarmee je de pagina kan herladen om opnieuw te spelen
  var knop = document.createElement("BUTTON"); //maakt de knop element
  knop.innerHTML = "speel nog een keer"; //de tekst die op de knop komt te staan
  document.body.appendChild(knop); //voegt de knop toe aan de body van het html document waar dit bestand in zit
  var opnieuwAtt = document.createAttribute("onclick"); //maakt de attribute onclick
  opnieuwAtt.value = "location.href = 'index.html';"; //de waarde die bij onclick komt te staan
  knop.attributes.setNamedItem(opnieuwAtt); //attribuut word toegevoegt
  noLoop(); //stopt de draw
}

function rectKnop(xPositie, yPositie, breedte, hoogte, kleur, kleurHover, trueFalseStatement) {
    if((mouseX >= xPositie  && mouseX <= xPositie + breedte) && (mouseY >= yPositie  && mouseY <= yPositie + hoogte)) {
        fill(kleurHover);
        if (mouseIsPressed) {
            trueFalseStatement = !trueFalseStatement;
            return trueFalseStatement;
        }
    }
    else {
        fill(kleur);   
    }
    rect(positieCorrectie + xPositie, positieCorrectie + yPositie, breedte,hoogte);
    return trueFalseStatement;
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
    case 27:    //esc
      //maakt pauzeScherm true als die false is en omgekeerd
      pauzeScherm = !pauzeScherm
    default:
      break;
  }
}