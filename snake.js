class Snake {

  constructor() {
    this.x = round(aantalHokjes / 2) * vakZijde;
    this.y = round(aantalHokjes / 2) * vakZijde;
    this.lichaam = []
    for (let i = 0; i < beginLengte; i++) {
      this.lichaam.push(this.x + i * vakZijde, this.y);
    }
    this.lengte = this.lichaam.length;
  }

  teken() {

    fill("blue");
    for (let i = 0; i < this.lengte; i += 2) {
      rect(this.lichaam[i], this.lichaam[i + 1], vakZijde, vakZijde);
    }
  }


  beweeg(richting) {

    this.beweegStaart = function() {
      this.lengte = this.lichaam.length;
      for (let i = this.lengte - 1; i > 1; i--) {
        this.lichaam[i] = this.lichaam[i - 2];
        
      }
    }

    switch (richting) {
      case "omhoog":
        this.beweegStaart();
        this.lichaam[1] = this.lichaam[1] - vakZijde;
        break;
      case "links":
        
        this.beweegStaart();
        this.lichaam[0] = this.lichaam[0] - vakZijde;
        break;
      case "rechts":
        this.beweegStaart();
        this.lichaam[0] = this.lichaam[0] + vakZijde;
        break;
      case "omlaag":
        this.beweegStaart();
        this.lichaam[1] = this.lichaam[1] + vakZijde;
        break;
      default:
        break;
    }
  }
}