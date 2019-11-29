// JavaScript source code
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
var conteggioTotBN = myStuff.match(/Conteggio totale stampe in bianco e nero = \d+/gm);
var conteggioTotCo = myStuff.match(/Conteggio totale stampe a colori = \d+/gm);
var sharpNOtoner = ["Modello dispositivo: MX-M453N", "Modello dispositivo: MX-M282N", "Modello dispositivo: MX-M363N", "Modello dispositivo: SHARP MX-M202D"];
var sharpBKtoner = ["Modello dispositivo: MX-M354N", "Modello dispositivo: MX-M565N", "Modello dispositivo: MX-M564N", "Modello dispositivo: MX-M266N", "Modello dispositivo: MX-M314N", "Modello dispositivo: MX-M315N", "Modello dispositivo: MX-M316N"];

//controllo data
var nomemese = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
var now = new Date();
var mesecorrente = nomemese[now.getUTCMonth()];
console.log(mesecorrente)

// controllo mese precedente
var nummeseprecedente = (now.getUTCMonth() - 1);
var meseprecedente = nomemese[nummeseprecedente];
console.log(meseprecedente)


const anno = new Date();
var annocorrente = anno.getUTCFullYear();
var appoggio = [];
var comunicaminpre = 0;
var comunicamaxpre = 0;

for (let i = 0, max = data.length; i < max; i++) {
    appoggio[i] = data[i].split(' ')
    if ((appoggio[i][3]) == meseprecedente && (appoggio[i][6]) == annocorrente && comunicaminpre == 0) {
        comunicaminpre = i
    };
};

for (let i = 0, max = data.length; i < max; i++) {
    if ((appoggio[i][3]) == meseprecedente && (appoggio[i][6]) == annocorrente && i >= comunicamaxpre) {
        comunicamaxpre = i
    }
};
console.log(comunicamaxpre, comunicaminpre);

// controllo comunicazioni mese corrente 

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

//controllo sharp202
for (let i = 0, max = modello.length; i < max; i++) {
    if ((modello[i]) == "Modello dispositivo: SHARP MX-M202D") {
        conteggioTotCo.splice(i, 0, 'Non comunicato')
    }
};

// Numero copie 

document.write(mesecorrente + "   " + annocorrente + "<br>" + "<br>");

for (let i = (comunicamax - 1), max = comunicamin; i > max; i--) {    
    document.write(`${i}`+ "--" + mittente[i] + " -------- " + modello[i] + " -------- " + conteggioTotBN[i] + "<br>");
    document.write(`${i}`+ "--" + mittente[i] + " -------- " + modello[i] + " -------- " + conteggioTotCo[i] + "<br>");
    for (let k = (comunicamaxpre - 1), max = comunicaminpre; k > max; k--) {
        if (mittente[i] == mittente[k] && modello[i] == modello[k]) {
            document.write(`${k}` + "--" + mittente[k] + " -------- " + modello[k] + " -------- " + conteggioTotBN[k] + "<br>");
            document.write(`${k}`+ "--" + mittente[k] + " -------- " + modello[k] + " -------- " + conteggioTotCo[k] + "<br>");
        } 
    }
    document.write("<br>" + "<br>");
};
