class Eten {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
  vindPlek() {
    do {
      this.x = int(random(1, aantalHokjes + 1)) * vakZijde;
      this.y = int(random(1, aantalHokjes + 1)) * vakZijde;
    }
    while (slang.lichaam[0] == this.x && slang.lichaam[1] == this.y) //klopt nog niet, moet hele lichaam checken maar heb nu geen zin om dat te fixen
    //vgm zorgt dat er ook voor dat er soms geen eten is. Dan is een blokje ergens in de slang gespawnd.
  }
  teken() {
    fill('red');
    rect(this.x, this.y, vakZijde, vakZijde);
  }

  isGegeten() {
    if (slang.lichaam[0] == this.x && slang.lichaam[1] == this.y) {
      return true;
   } else {
      return false;
   }
 }
}