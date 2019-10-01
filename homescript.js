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
var tonerresiduoBK = myStuff.match(/((Toner).(residuo).\(Bk\)).=.\S+%/gm);
var tonerresiduoC = myStuff.match(/((Toner).(residuo).\(C\)).=.\S+%/gm);
var tonerresiduoM = myStuff.match(/((Toner).(residuo).\(M\)).=.\S+%/gm);
var tonerresiduoY = myStuff.match(/((Toner).(residuo).\(Y\)).=.\S+%/gm);
var sharpNOtoner = ["Modello dispositivo: MX-M453N", "Modello dispositivo: MX-M282N", "Modello dispositivo: MX-M363N", "Modello dispositivo: SHARP MX-M202D"];
var sharpBKtoner = ["Modello dispositivo: MX-M354N", "Modello dispositivo: MX-M565N", "Modello dispositivo: MX-M564N", "Modello dispositivo: MX-M266N", "Modello dispositivo: MX-M314N", "Modello dispositivo: MX-M315N", "Modello dispositivo: MX-M316N"];

//controllo data

const mese = new Date();
var mesecorrente = mese.getUTCMonth();

if (mesecorrente == 0) {
    mesecorrente = 'Jan'
} else
    if (mesecorrente == 1) {
        mesecorrente = 'Feb'
    } else
        if (mesecorrente == 2) {
            mesecorrente = 'Mar'
        } else
            if (mesecorrente == 3) {
                mesecorrente = 'Apr'
            } else
                if (mesecorrente == 4) {
                    mesecorrente = 'May'
                } else
                    if (mesecorrente == 5) {
                        mesecorrente = 'Jun'
                    } else
                        if (mesecorrente == 6) {
                            mesecorrente = 'Jul'
                        } else
                            if (mesecorrente == 7) {
                                mesecorrente = 'Aug'
                            } else
                                if (mesecorrente == 8) {
                                    mesecorrente = 'Sep'
                                } else
                                    if (mesecorrente == 9) {
                                        mesecorrente = 'Oct'
                                    } else
                                        if (mesecorrente == 10) {
                                            mesecorrente = 'Nov'
                                        } else
                                            if (mesecorrente == 11) {
                                                mesecorrente = 'Dic'
                                            };



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

// urgenze

document.write(mesecorrente + "   " + annocorrente + "<br>" + "<br>");
var urgente = "Toner residuo (Bk) = 25%"
for (let i = comunicamin, max = comunicamax; i < max; i++) {
    if ((tonerresiduoBK[i]) <= urgente && (tonerresiduoBK[i]) != 'Non comunicato' ) {
        document.write(`${i}` + " ---- " + mittente[i] + " -------- " + modello[i] + " -------- " + tonerresiduoBK[i] + "<br>");
        document.write(`${i}` + " ---- " + mittente[i] + " -------- " + modello[i] + " -------- " + tonerresiduoC[i] + "<br>");
        document.write(`${i}` + " ---- " + mittente[i] + " -------- " + modello[i] + " -------- " + tonerresiduoM[i] + "<br>");
        document.write(`${i}` + " ---- " + mittente[i] + " -------- " + modello[i] + " -------- " + tonerresiduoY[i] + "<br>");
        document.write("<br>" + "<br>");
    };
};