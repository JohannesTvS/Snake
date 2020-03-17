class Eten {
  constructor(slangNaam) {
    this.x = 0;
    this.y = 0;
    this.vindPlek(slangNaam);
 }
  
  vindPlek(slangNaam) {
      do {  //zoekt een willekeurige x en y voor het eten
        this.x = floor(random(1, aantalHokjes)); 
        this.y = floor(random(1, aantalHokjes));
    }
      while (!slangNaam.plekVrij(this.x,this.y));   //vraag aan plekVrij of het eten niet op een plek zit waar de slang al is
   }



    teken() {
      fill('red');
      rect(this.x * vakZijde, this.y * vakZijde, vakZijde, vakZijde);
    }

    isGegeten(slangNaam) {
        //returnt true als het hoofd op dezelfde plek zit als het eten, returnt anders false
      return (slangNaam.lichaam[0] == this.x && slangNaam.lichaam[1] == this.y)
    }
}
