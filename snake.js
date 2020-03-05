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
}