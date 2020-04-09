    // JavaScript source code
var mostracopie = function numerocopie() {

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

    var data = []
    data = myStuff.match(/From - \w+ \w+ \d+ \d+:\d+:\d+ \d+/gm);
    var modello = myStuff.match(/(Modello).(dispositivo)\:.[A-Z]+.+/gm);  // old / (Modello).(dispositivo) \:.[A - Z] +\-\S + [A - Z] /gm
    var mittente = myStuff.match(/(Nome).(dispositivo)\: [a-zA-Z].+/gm);
    var conteggioTotBN = myStuff.match(/Conteggio totale stampe in bianco e nero = \d+/gm);
    var conteggioTotCo = myStuff.match(/Conteggio totale stampe a colori = \d+/gm);
    var sharpNOtoner = ["Modello dispositivo: MX-M453N", "Modello dispositivo: MX-M282N", "Modello dispositivo: MX-M363N", "Modello dispositivo: SHARP MX-M202D"];
    var sharpBKtoner = ["Modello dispositivo: MX-M354N", "Modello dispositivo: MX-M565N", "Modello dispositivo: MX-M564N", "Modello dispositivo: MX-M266N", "Modello dispositivo: MX-M314N", "Modello dispositivo: MX-M315N", "Modello dispositivo: MX-M316N"];
    //controllo data
    var nomemese = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
    var now = new Date();
    var mesecorrente = nomemese[now.getUTCMonth()];
    const anno = new Date();
    var annocorrente = anno.getUTCFullYear();
    console.log(mesecorrente)

 // mesecorrente = "Feb";

    // controllo mese precedente

    var nummeseprecedente;
    var meseprecedente;

    if (mesecorrente == "Jan") {
        nummeseprecedente = 11
        meseprecedente = nomemese[11]
        annocorrente = (annocorrente - 1)
    } else {
        nummeseprecedente = (now.getUTCMonth() - 1)
        meseprecedente = nomemese[nummeseprecedente]
    };
  //  meseprecedente = "Jan"
    console.log(mesecorrente)
    console.log(meseprecedente)

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

    console.log(comunicamaxpre, comunicaminpre, annocorrente);
    annocorrente = anno.getUTCFullYear();
    console.log(comunicamaxpre, comunicaminpre, annocorrente);


    // controllo comunicazioni mese corrente 

    var comunicamin = 0;
    var comunicamax = 0;


    for (let i = 0, max = data.length; i < max; i++) {
        appoggio[i] = data[i].split(' ')
        if ((appoggio[i][3]) == mesecorrente && (appoggio[i][6]) == annocorrente && comunicamin == 0) {
            comunicamin = i
        };
    };

    console.log(comunicamin, comunicamax);

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

    var conteggioTotBNN = [];
    var conteggioTotCON = [];
    for (let i = 0, max = conteggioTotBN.length; i < max; i++) {
        let appoggio2 = [];
        let appoggio3 = [];
        appoggio2[i] = conteggioTotBN[i].split(' ');
        appoggio3[i] = conteggioTotCo[i].split(' ');
        conteggioTotBNN[i] = parseInt(appoggio2[i][8], 10);
        conteggioTotCON[i] = parseInt(appoggio3[i][6], 10);
    };

    console.log(mittente.length, conteggioTotBN.length, modello.length);
    document.getElementById("risultato").innerHTML = (mesecorrente + "   " + annocorrente + "<br>" + "<br>");

    var contacomunicazionipre = 0;
    var contacomunicazioni = 0;


    if (mittente.length == conteggioTotBN.length && modello.length == mittente.length) {
        for (let i = comunicamin, max = comunicamax; i < max; i++) {
            contacomunicazioni++;
            let ncopieBn = 0
            let ncopieCo = 0
            let lettprec = false
            for (let k = comunicaminpre, max = comunicamaxpre; k < max; k++) {
                if (mittente[i] == mittente[k] && modello[i] == modello[k]) {
                    lettprec = true
                    contacomunicazionipre++;
                    var node = document.createElement("div")
                    node.setAttribute('id', 'risultato2')
                    node.setAttribute('class', 'visualizzazione2', 'rettangolo')
                    ncopieBn = conteggioTotBNN[i] - conteggioTotBNN[k]
                    ncopieCo = conteggioTotCON[i] - conteggioTotCON[k]
                    node.innerHTML = `${i}` + " " + mittente[i] + " " + modello[i] + " " + "<br>" + "<br>" + conteggioTotBN[i] + "<br>" + conteggioTotCo[i] + "<br>" + modello[k] + "<br>" + conteggioTotBN[k] + "<br>" + conteggioTotCo[k] + "<br>" + "n.copie bianco e nero effettuate = " + ncopieBn + " " + "n. copie colori effettuate = " + ncopieCo + "<br>"
                    document.getElementById("risultato2").appendChild(node)
                }                
            }
            if (lettprec == false) {
                var node2 = document.createElement("div")
                node2.setAttribute('id', 'risultato2')
                node2.setAttribute('class', 'visualizzazione2', 'rettangolo')
                node2.innerHTML = `${i}` + " " + mittente[i] + " " + modello[i] + " " + "<br>" + "<br>" + conteggioTotBN[i] + "<br>" + conteggioTotCo[i]
                document.getElementById("risultato2").appendChild(node2)
            } 
        }
    } else {
        document.getElementById("risultato2").innerHTML = ("errore Mittenti ed Email non allineati");
    };
    console.log(comunicamax, comunicamaxpre, comunicamin, comunicaminpre, contacomunicazioni, contacomunicazionipre);
};

mostracopie();

//SHARP STUDIO MAIONE MILONE MINERVINO MURGE spazio
//INFO@cantierenauticastore.com non c'è nome dispositivo
//HOTEL PLAZA 1 mai a settimana
//SHARP APICELLA SA 1 mail a settimana