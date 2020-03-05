class Snake {
  constructor() {
    this.x = 10 * vakZijde;
    this.y = 10 * vakZijde;
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


    switch (richting) {
      case "omhoog":
        break;
      case "links":
        this.lichaam[0] = this.lichaam[0] - vakZijde;
        
        this.lengte = this.lichaam.length;  //deze drie moeten in een functie ofzo
        for (let i = 2; i < this.lengte; i++) {    //maar snap niet hoe dat in een class 
          this.lichaam[i] = this.lichaam[i - 2]    //zou moeten werken
        }
        break;
      case "omhoog":
        break;
      case "omhoog":
        break;
    }
  }
}