//variabelen voor het lettertype en het geluid
var roboto; 
var gameOverGeluid;
var eetGeluid;

// zorgt ervoor dat het ingeladen woord voor de draw
function preload() { 

    // laad het lettertype in
    roboto = loadFont('fonts/Roboto-Regular.ttf'); 

    //geeft het geluidstype aan
    soundFormats('wav');

    //laat de geluiden in
    gameOverGeluid = loadSound('geluid/gameOver.wav');
    eetGeluid = loadSound('geluid/eetGeluid.wav');
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

var fpsAnimatie = 60; //ware frames voor animatie van bijvoorbeeld de appel
var spelSnelheid = 5; // fps voor de bewegingen


function setup() {
  createCanvas(spelVlakBreedte + 1, spelVlakBreedte + 1, WEBGL); // met WEBGL kan je 3D-objecten renderen
  frameRate(fpsAnimatie);
  textFont(roboto); //standaardlettertype
  textSize(width / 20); //standaardgrootte van de tekst is de breedte van de canvas gedeeld door 20
  textAlign(CENTER, CENTER); //zorgt ervoor dat de text in het textvak standaard gecentreerd is

  slang = new Snake();  //maakt een instance van het object Snake
  eten = new Eten(slang);   //maakt een nieuwe appel en krijgt de gegevens van slang mee
}


//alles in deze loop wordt fps keer per seconde herhaald
function draw() {
    if(beginScherm) {   //als we in het beginscherm zitten wordt dit uitgevoerd
        maakSchaakPatroon(spelVlakBreedte, vakZijde);   //tekent de achtergrond met schaakpatroon
        beginScherm = rectKnop(width*0.5 - 50, height*0.5 - 25, 100, 50, 'white', 'red' , beginScherm, 'start');
        push();
        fill('black');
        textSize(100);
        text("snake", 0, -150);
        textSize(20);
        text("press W A S D or arrow keys to move", 0, 40);
        text("press esc to pause the game", 0, 60);
        pop();
    }
    else if (pauzeScherm){
        fill(0);
        text("pauze",0,0);
    } 
    else {
    maakSchaakPatroon(spelVlakBreedte, vakZijde);
    //als de slang 6 keer per seconde beweegt bij 60 fps, moet de slang bewegen bij elke framecount waar framecount % 10 == 0
    if (frameCount % Math.floor(fpsAnimatie / spelSnelheid) == 0) {
        slang.beweeg(richting);
        laatsteRichting = richting;
        if (eten.isGegeten(slang)) {
            slang.groei(richting);
            eten = new Eten(slang);
            eetGeluid.play();
        }
     }
    eten.teken();
    slang.teken();
    if (slang.dood()) {
        gameOverGeluid.play();
        eindScherm();
        }
   }
}

function eindScherm() {
  fill('rgba(255,255,255,0.6)'); //witte kleur met doorzichtigheid zodat je het spelvlak nog een beetje kan zien
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

function rectKnop(xPositie, yPositie, breedte, hoogte, kleur, kleurHover, trueFalseStatement, buttonText) {
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
    fill('black');
    text(buttonText, positieCorrectie + xPositie, positieCorrectie + yPositie, breedte,hoogte);
    return trueFalseStatement;
}


//maakt de achtergrond
function maakSchaakPatroon(spelVlakBreedte, vakZijde) {    
  for (var rij = 0; rij < spelVlakBreedte; rij += vakZijde) { //gaat alle rijen langs, wordt vergroot met de groote van de zijdes
    for (var kolom = 0; kolom < spelVlakBreedte; kolom += vakZijde) { //hetzelfde als boven, een for loop in een for loop zorgt dat hij alle vakjes gebruikt
        push();
        noStroke();
      if ((rij % (vakZijde * 2) == 0 && kolom % (vakZijde * 2) != 0) || (kolom % (vakZijde * 2) == 0 && rij % (vakZijde * 2) != 0)) {
        fill('rgb(40,110,40)');
        rect(positieCorrectie + kolom, positieCorrectie + rij,vakZijde,vakZijde);
      } else {
        fill('rgb(40,150,40)');
        rect(positieCorrectie + kolom, positieCorrectie +  rij, vakZijde, vakZijde);
      }
      pop();
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