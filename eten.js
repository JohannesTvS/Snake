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
      push();

      // tekent de appel
      fill('red');
      noStroke();
      lights(); //geeft een lichte schaduw op de appel, waardoor er diepte merkbaar is
      translate(positieCorrectie + 0.5*vakZijde + this.x * vakZijde, positieCorrectie + 0.5*vakZijde + this.y * vakZijde, 0);
      rotateZ(frameCount * 0.5); // draait hem op de z-as  
      sphere(0.35*vakZijde);
      
      // tekent het steeltje van de appel
      fill('brown');
      translate(0,0,0.15*vakZijde);
      box(0.1*vakZijde, 0.1*vakZijde, 0.5*vakZijde);
      
      // tekent het blaadje van de appel
      fill('green');
      translate(0.1*vakZijde,0,0.225*vakZijde);
      box(0.4*vakZijde, 0.2*vakZijde, 0);
      pop();

      //rect(positieCorrectie + this.x * vakZijde, positieCorrectie + this.y * vakZijde, vakZijde, vakZijde);
      //translate(this.x * vakZijde, this.y * vakZijde);
    }

    isGegeten(slangNaam) {
        //returnt true als het hoofd op dezelfde plek zit als het eten, returnt anders false
      return (slangNaam.lichaam[0] == this.x && slangNaam.lichaam[1] == this.y)
    }
}
