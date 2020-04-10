class Snake {
  constructor() {
    this.x = round(aantalHokjes / 2);   //start het hoofd van de slang in het midden, midden + 0,5 bij een oneven aantal hokjes
    this.y = round(aantalHokjes / 2);
    this.lichaam = [];

    for (let i = 0; i < beginLengte; i++) { //plaatst de rest van de slang rechts achter het hoofd
      this.lichaam.push(this.x + i, this.y);
    }
    this.lengte = this.lichaam.length;
  }


  teken() {
    fill("blue");
    for (let i = 0; i < this.lengte; i += 2) {
      push();
      translate(positieCorrectie + this.lichaam[i] * vakZijde + 0.5*vakZijde, positieCorrectie + this.lichaam[i + 1] * vakZijde + 0.5*vakZijde, 0);
      box(vakZijde);
      pop();
    }
  }

    //controleert of het eten niet op een plek komt waar de slang al is
  plekVrij(etenx, eteny) {
    //maakt een array met alle waarden met een even index, dit zijn de x-coordinaten
    let lichaamX = this.lichaam.filter(function(element, index) { 
      return (index % 2 == 0);
    });
    //maakt een array met alle waarden met een oneven index, dit zijn de y-coordinaten
    let lichaamY = this.lichaam.filter(function(element, index) {
      return (index % 2 == 1);
    });

    //controleert van elk 'lichaamsdeel' of de coordinaten overeenkomen met de coordinaten van het eten
    for (let index = 0; index < lichaamX.length; index++) {
      if (lichaamX[index] == etenx) {
        if (lichaamY[index] == eteny) {
          return false;
        }
      }
    }
    return true;
  }

    //voegt een nieuw blokje toe met dezelfde coordinaten als het achterste punt
  groei() {
    this.lichaam.push(this.lichaam[this.lengte - 2], this.lichaam[this.lengte - 1]);
  }


 //controleer of het hooofd de staart raakt
//doet excact hetzelfde als plekVrij, alleen zijn etenX-Y vervangen door het hoofd en wordt dit keer niet ook in het hoofd doorzocht
  dood() {
    let lichaamX = this.lichaam.filter(function(element, index) {
      return (index % 2 == 0);
    });
    let lichaamY = this.lichaam.filter(function(element, index) {
      return (index % 2 == 1);
    });

    for (let index = 2; index < lichaamX.length; index++) { //index = 2 omdat het hoofd op index 0 en 1 zit
      if (lichaamX[index] == lichaamX[0]) {
        if (lichaamY[index] == lichaamY[0]) {
          return true;
        }
      }
    }
//controleer of de slang buiten het veld is   
    if (lichaamX[0] < 0 || lichaamY[0] < 0 || lichaamX[0] >= aantalHokjes || lichaamY[0] >= aantalHokjes) {
      return true;
    }
    return false;

  }

//beweegt de slang in de aangegeven richting
  beweeg(richting) {

    this.beweegStaart = function() {    //schuift elk blokje van de slang naar het blokje voor zich
      this.lengte = this.lichaam.length;
      for (let i = this.lengte - 1; i > 1; i--) {   //begin achter en schuif tot het blokje voor het hoofd
        this.lichaam[i] = this.lichaam[i - 2];

      }
    }

    switch (richting) { //beweeg het hoofd
      case "omhoog":
        this.beweegStaart();
        this.lichaam[1] = this.lichaam[1] - 1;
        break;
      case "links":

        this.beweegStaart();
        this.lichaam[0] = this.lichaam[0] - 1;
        break;
      case "rechts":
        this.beweegStaart();
        this.lichaam[0] = this.lichaam[0] + 1;
        break;
      case "omlaag":
        this.beweegStaart();
        this.lichaam[1] = this.lichaam[1] + 1;
        break;
      default:
        break;
    }
  }
}