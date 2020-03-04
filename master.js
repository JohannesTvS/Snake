var vakZijde = 40;
var aantalHokjes = 20;
var spelVlakBreedte = aantalHokjes*vakZijde; // per rij
function setup() {
createCanvas(spelVlakBreedte+1,spelVlakBreedte+1);  // 40 breede/hooge * 20 hokjes + 21 lijnen
  background('black');  
}

function draw() {
    createCheckers(spelVlakBreedte, vakZijde);
}

function createCheckers (spelVlakBreedte, vakZijde) {
    for (var rij = 0;rij < spelVlakBreedte;rij += vakZijde) {
        for (var kolom = 0;kolom < spelVlakBreedte;kolom += vakZijde) {
            if ((rij % (vakZijde*2) == 0 && kolom % (vakZijde*2) != 0) || (kolom % (vakZijde*2) == 0 && rij % (vakZijde*2) != 0)) {
                fill('black');
                rect(kolom,rij,vakZijde,vakZijde);
            }
            else {
            fill('white');
            rect(kolom,rij,vakZijde,vakZijde);
            }
        }
    }
}



