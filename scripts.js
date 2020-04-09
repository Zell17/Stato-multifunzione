function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
};

const myStuff = loadFile("SHARP");

var data = myStuff.match(/From - \w+ \w+ \d+ \d+:\d+:\d+ \d+/gm);
var modello = myStuff.match(/(Modello).(dispositivo)\:.[A-Z]+.+/gm);  // old / (Modello).(dispositivo) \:.[A - Z] +\-\S + [A - Z] / gm
var mittente = myStuff.match(/(Nome).(dispositivo)\: [a-zA-Z].+/gm);
var tonerresiduoBK = myStuff.match(/((Toner).(residuo).\(Bk\)).=.\S+%/gm);
var tonerresiduoC = myStuff.match(/((Toner).(residuo).\(C\)).=.\S+%/gm);
var tonerresiduoM = myStuff.match(/((Toner).(residuo).\(M\)).=.\S+%/gm);
var tonerresiduoY = myStuff.match(/((Toner).(residuo).\(Y\)).=.\S+%/gm);
var sharpNOtoner = ["Modello dispositivo: MX-M453N", "Modello dispositivo: MX-M282N", "Modello dispositivo: MX-M363N", "Modello dispositivo: SHARP MX-M202D"];
var sharpBKtoner = ["Modello dispositivo: MX-M354N", "Modello dispositivo: MX-M565N", "Modello dispositivo: MX-M564N", "Modello dispositivo: MX-M266N", "Modello dispositivo: MX-M314N", "Modello dispositivo: MX-M315N", "Modello dispositivo: MX-M316N"];

//controllo data

//controllo data
var nomemese = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
var now = new Date();
var mesecorrente = nomemese[now.getUTCMonth()];
console.log(mesecorrente)

//mesecorrente = "Jan";

// controllo mese precedente
var nummeseprecedente = (now.getUTCMonth() - 1);
var meseprecedente = nomemese[nummeseprecedente];
console.log(meseprecedente)

const anno = new Date();


var annocorrente = anno.getUTCFullYear();
var appoggio = [];
var comunicamin = 0;
var comunicamax = 0;

for (let i = 0, max = data.length; i < max; i++) {  
    appoggio[i] = data[i].split(' ')
    if ((appoggio[i][3]) == mesecorrente && (appoggio[i][6]) == annocorrente && comunicamin == 0) {
        comunicamin = i
           };
};

for (let i = 0, max = data.length; i < max; i++) {
 if ((appoggio[i][3]) == mesecorrente && (appoggio[i][6]) == annocorrente && i >= comunicamax) {
      comunicamax = i
         }
};


// controllo sharp toner per modelli

for (let i = 0, max = modello.length; i < max; i++) {
    for (let k = 0, max = sharpBKtoner.length; k < max; k++) {
        if ((modello[i]) == sharpNOtoner[k]) {
            tonerresiduoC.splice(i, 0, 'Non comunicato') && tonerresiduoBK.splice(i, 0, 'Non comunicato') && tonerresiduoM.splice(i, 0, 'Non comunicato') && tonerresiduoY.splice(i, 0, 'Non comunicato')
        } else {
            if ((modello[i]) == sharpBKtoner[k])
            tonerresiduoC.splice(i, 0, 'Non presente') && tonerresiduoM.splice(i, 0, 'Non presente') && tonerresiduoY.splice(i, 0, 'Non presente');
        };
    };
};


// risultato



 var comunicazioni = 0
for (let i = comunicamin, max = comunicamax; i < max; i++) {
    comunicazioni++;
    let node = document.createElement("div");
    node.setAttribute('id', 'risultato2');
    node.setAttribute('class', 'visualizzazione2', 'rettangolo');
    node.innerHTML = `${i}` + " " + mittente[i] + " " + modello[i] + "<br>" + tonerresiduoBK[i] + "<br>" + tonerresiduoC[i] + "<br>" + tonerresiduoM[i] + "<br>" + tonerresiduoY[i] + "<br>";
    document.getElementById("risultato2").appendChild(node);
};

document.getElementById("risultato").innerHTML = (mesecorrente + " " + annocorrente + " Hai ricevuto " + comunicazioni + " comunicazioni dai Multifunzione Sharp" + "<br>" + "<br>");