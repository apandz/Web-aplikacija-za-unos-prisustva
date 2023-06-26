let prisustvo = () => { };
let div = document.getElementById("divSadrzaj");
let sljedecaSedmica = () => { };
let prethodnaSedmica = () => { };

function iscrtajTabelu(predmet) {
    var trenutniPredmet = document.getElementById("trenutniPredmet");
    if (trenutniPredmet == null || trenutniPredmet.innerText != predmet) {
        PoziviAjax.getPredmet(predmet, (error, data) => {
            if (error == null) {
                //instanciranje
                prisustvo = TabelaPrisustvo(div, data);

                //pozivanje metoda
                sljedecaSedmica = function () {
                    return prisustvo.sljedecaSedmica();
                }
                prethodnaSedmica = function () {
                    return prisustvo.prethodnaSedmica();
                }
            }
        });
    }
}

function iscrtajTabeluPonovo(naziv, index, sedmica, predavanja, vjezbe, brojPredavanjaSedmicno, brojVjezbiSedmicno, prisutan, odsutan) {
    let novaCelija = "<td id=\"" + index + "s" + sedmica + "\" class=\"tabelautabeli\"><table class=\"tabela\"><tr>";
    for (let k = 0; k < brojPredavanjaSedmicno; k++) {
        novaCelija += "<th class=\"tabelaprisustvo\">P<br>" + (k + 1) + "</th>";
    }
    for (let k = 0; k < brojVjezbiSedmicno; k++) {
        novaCelija += "<th class=\"tabelaprisustvo\">V<br>" + (k + 1) + "</th>";
    }
    novaCelija += "</tr>";
    novaCelija += "<tr>";

    for (let k = 0; k < brojPredavanjaSedmicno; k++) {
        var parametri = naziv + "','" + index + "','" + sedmica + "','" + (parseInt(predavanja) + 1) + "','" + parseInt(vjezbe);
        var odsutan = "<td onclick=\"promijeniOdsutan('" + parametri + "')\" class=\"odsutan\"></td>";
        var parametri = naziv + "','" + index + "','" + sedmica + "','" + (parseInt(predavanja) - 1) + "','" + parseInt(vjezbe);
        var prisutan = "<td onclick=\"promijeniPrisutan('" + parametri + "')\" class=\"prisutan\"></td>";
        if (k < predavanja) novaCelija += prisutan;
        else novaCelija += odsutan;
    }
    for (let k = 0; k < brojVjezbiSedmicno; k++) {
        var parametri = naziv + "','" + index + "','" + sedmica + "','" + parseInt(predavanja) + "','" + (parseInt(vjezbe) + 1);
        var odsutan = "<td onclick=\"promijeniOdsutan('" + parametri + "')\" class=\"odsutan\"></td>";
        var parametri = naziv + "','" + index + "','" + sedmica + "','" + parseInt(predavanja) + "','" + (parseInt(vjezbe) - 1);
        var prisutan = "<td onclick=\"promijeniPrisutan('" + parametri + "')\" class=\"prisutan\"></td>";
        if (k < vjezbe) novaCelija += prisutan;
        else novaCelija += odsutan;
    }
    novaCelija += "</tr></table></td>";

    let celijaDokument = document.getElementById(index + "s" + sedmica);
    celijaDokument.innerHTML = novaCelija;
}

function promijeniNijeUneseno(naziv, index, sedmica, predavanja, vjezbe) {
    PoziviAjax.postPrisustvo(naziv, index, JSON.stringify({ sedmica: sedmica, predavanja: predavanja, vjezbe: vjezbe }), (error, data) => {
        if (error) throw (error);
        
        data = data.filter(function (n, i) {
            return n.predmet == naziv;
        });

        prisustvo = TabelaPrisustvo(null, data[0], sedmica);
        sljedecaSedmica = function () {
            return prisustvo.sljedecaSedmica();
        }
        prethodnaSedmica = function () {
            return prisustvo.prethodnaSedmica();
        }

        iscrtajTabeluPonovo(naziv, index, sedmica, predavanja, vjezbe, data[0].brojPredavanjaSedmicno, data[0].brojVjezbiSedmicno);
    });
}

function promijeniPrisutan(naziv, index, sedmica, predavanja, vjezbe) {
    PoziviAjax.postPrisustvo(naziv, index, JSON.stringify({ sedmica: sedmica, predavanja: predavanja, vjezbe: vjezbe }), (error, data) => {
        if (error) throw (error);

        data = data.filter(function (n, i) {
            return n.predmet == naziv;
        });

        prisustvo = TabelaPrisustvo(null, data[0], sedmica);
        sljedecaSedmica = function () {
            return prisustvo.sljedecaSedmica();
        }
        prethodnaSedmica = function () {
            return prisustvo.prethodnaSedmica();
        }

        iscrtajTabeluPonovo(naziv, index, sedmica, predavanja, vjezbe, data[0].brojPredavanjaSedmicno, data[0].brojVjezbiSedmicno);
    });
}

function promijeniOdsutan(naziv, index, sedmica, predavanja, vjezbe) {
    PoziviAjax.postPrisustvo(naziv, index, JSON.stringify({ sedmica: sedmica, predavanja: predavanja, vjezbe: vjezbe }), (error, data) => {
        if (error) throw (error);

        data = data.filter(function (n, i) {
            return n.predmet == naziv;
        });

        prisustvo = TabelaPrisustvo(null, data[0], sedmica);
        sljedecaSedmica = function () {
            return prisustvo.sljedecaSedmica();
        }
        prethodnaSedmica = function () {
            return prisustvo.prethodnaSedmica();
        }

        iscrtajTabeluPonovo(naziv, index, sedmica, predavanja, vjezbe, data[0].brojPredavanjaSedmicno, data[0].brojVjezbiSedmicno);
    });
}