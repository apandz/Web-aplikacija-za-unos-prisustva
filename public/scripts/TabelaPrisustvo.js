let TabelaPrisustvo = function (divRef, podaci, sedmica = 15) {
    if (divRef == null && podaci == null) {
        return null
    }
    let studenti = podaci.studenti;
    let prisustva = podaci.prisustva;
    const predmet = podaci.predmet;
    const brojPredavanjaSedmicno = podaci.brojPredavanjaSedmicno;
    const brojVjezbiSedmicno = podaci.brojVjezbiSedmicno;
    let trenutnaSedmica = sedmica;
    //privatni atributi modula
    let tabela = "";
    let validniPodaci = true;
    if (studenti.length != new Set(studenti.map(v => v.index)).size) validniPodaci = false;
    //Podaci nisu validni ako postoje dva ili više studenta s istim indeksom u listi studenata

    let map = new Map();
    if (validniPodaci) {
        prisustva.sort(
            (a, b) => {
                if (a.sedmica > b.sedmica) return 1;
                if (a.sedmica < b.sedmica) return -1;
                return 0;
            }
        )

        tabela = "<h2 id=\"trenutniPredmet\">" + predmet + "</h2>";

        tabela += "<table class=\"tabela\">";

        prvaSedmica = prisustva[0].sedmica;
        zadnjaSedmica = prisustva[prisustva.length - 1].sedmica;
        trenutnaSedmica = prvaSedmica;

        for (let i = 0; i < prisustva.length; i++) {
            const sedmicaTr = prisustva[i].sedmica;
            if ((sedmicaTr != trenutnaSedmica && sedmicaTr != trenutnaSedmica + 1) || sedmicaTr > 15 || sedmicaTr < 1) {
                validniPodaci = false;
                break;
            }
            //Podaci nisu validni ako postoji sedmica, između dvije sedmice za koje je uneseno prisustvo 
            //bar jednom studentu, u kojoj nema unesenog prisustva
            if (sedmicaTr == trenutnaSedmica + 1) {
                trenutnaSedmica++;
            }
        }

        if (validniPodaci) {
            trenutnaSedmica = zadnjaSedmica;

            tabela += "<tr><th>Ime i<br>prezime</th><th>Index</th>";
            const rimski = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];
            for (let i = 0; i < zadnjaSedmica; i++) {
                tabela += "<th>" + rimski[i] + "</th>";
            }
            if (zadnjaSedmica != 15) { tabela += "<th>" + rimski[zadnjaSedmica] + "-XV</th>"; }
            tabela += "</tr>";

            for (let i = 0; i < studenti.length; i++) {
                map.set(studenti[i].index, []);
            }
            for (let i = 0; i < prisustva.length; i++) {
                let indexMap = map.get(prisustva[i].index);
                if (indexMap == undefined) {
                    validniPodaci = false;
                    break;
                }
                //Podaci nisu validni ako postoji prisustvo za studenta koji nije u listi studenata
                indexMap.push(prisustva[i]);
            }

            if (validniPodaci) {
                for (let i = 0; i < studenti.length; i++) {
                    let student = studenti[i];
                    tabela += "<tr>"
                    tabela += "<td>"
                    tabela += student.ime
                    tabela += "</td>"
                    tabela += "<td>"
                    tabela += student.index
                    tabela += "</td>"
                    let prisustvaStudenta = map.get(student.index);
                    if (prisustvaStudenta.length != new Set(prisustvaStudenta.map(p => p.sedmica)).size) {
                        validniPodaci = false;
                        break;
                    }
                    //Podaci nisu validni ako isti student ima dva ili više unosa prisustva za istu sedmicu

                    let indexPrisustvaStudenta = 0;
                    for (let j = 1; j < prvaSedmica; j++) {
                        tabela += "<td id=\"" + student.index + "s" + j + "\"></td>";
                    }
                    for (let j = prvaSedmica; j <= zadnjaSedmica; j++) {
                        let prisustvaZaOvuSedmicu = prisustvaStudenta[indexPrisustvaStudenta];
                        if (prisustvaZaOvuSedmicu.predavanja > brojPredavanjaSedmicno || prisustvaZaOvuSedmicu.vjezbe > brojVjezbiSedmicno) {
                            validniPodaci = false;
                            break;
                        }
                        //Podaci nisu validni ako broj prisustva na predavanju/vježbi je veći od broja predavanja/vježbi sedmično

                        if (prisustvaZaOvuSedmicu.predavanja < 0 || prisustvaZaOvuSedmicu.vjezbe < 0) {
                            validniPodaci = false;
                            break;
                        }
                        //Podaci nisu validni ako broj prisustva je manji od nule

                        if (j == zadnjaSedmica) {
                            tabela += "<td id=\"" + student.index + "s" + j + "\" class=\"tabelautabeli\"><table class=\"tabela\"><tr>";
                            for (let k = 0; k < brojPredavanjaSedmicno; k++) {
                                tabela += "<th class=\"tabelaprisustvo\">P<br>" + (k + 1) + "</th>";
                            }
                            for (let k = 0; k < brojVjezbiSedmicno; k++) {
                                tabela += "<th class=\"tabelaprisustvo\">V<br>" + (k + 1) + "</th>";
                            }
                            tabela += "</tr>";
                            tabela += "<tr>";

                            for (let k = 0; k < brojPredavanjaSedmicno; k++) {
                                if (prisustvaZaOvuSedmicu == null || prisustvaZaOvuSedmicu.sedmica != j) {
                                    var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','1','0";
                                    var nijeUneseno = "<td onclick=\"promijeniNijeUneseno('" + parametri + "')\" class=\"nijeuneseno\"></td>";
                                    tabela += nijeUneseno;
                                }
                                else if (k < prisustvaZaOvuSedmicu.predavanja) {
                                    var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','" + (prisustvaZaOvuSedmicu.predavanja - 1) + "','" + prisustvaZaOvuSedmicu.vjezbe;
                                    var prisutan = "<td onclick=\"promijeniPrisutan('" + parametri + "')\" class=\"prisutan\"></td>";
                                    tabela += prisutan;
                                }
                                else {
                                    var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','" + (prisustvaZaOvuSedmicu.predavanja + 1) + "','" + prisustvaZaOvuSedmicu.vjezbe;
                                    var odsutan = "<td onclick=\"promijeniOdsutan('" + parametri + "')\" class=\"odsutan\"></td>";
                                    tabela += odsutan;
                                }
                            }
                            for (let k = 0; k < brojVjezbiSedmicno; k++) {
                                if (prisustvaZaOvuSedmicu == null || prisustvaZaOvuSedmicu.sedmica != j) {
                                    var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','0','1";
                                    var nijeUneseno = "<td onclick=\"promijeniNijeUneseno('" + parametri + "')\" class=\"nijeuneseno\"></td>";
                                    tabela += nijeUneseno;
                                }
                                else if (k < prisustvaZaOvuSedmicu.vjezbe) {
                                    var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','" + prisustvaZaOvuSedmicu.predavanja + "','" + (prisustvaZaOvuSedmicu.vjezbe - 1);
                                    var prisutan = "<td onclick=\"promijeniPrisutan('" + parametri + "')\" class=\"prisutan\"></td>";
                                    tabela += prisutan;
                                }
                                else {
                                    var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','" + prisustvaZaOvuSedmicu.predavanja + "','" + (prisustvaZaOvuSedmicu.vjezbe + 1);
                                    var odsutan = "<td onclick=\"promijeniOdsutan('" + parametri + "')\" class=\"odsutan\"></td>";
                                    tabela += odsutan;
                                }
                            }
                            tabela += "</tr></table></td>";
                            indexPrisustvaStudenta++;
                        } else {
                            let procenat = 0;
                            if (prisustvaZaOvuSedmicu.sedmica == j) {
                                procenat = Math.round((prisustvaZaOvuSedmicu.predavanja + prisustvaZaOvuSedmicu.vjezbe) * 100 / (brojPredavanjaSedmicno + brojVjezbiSedmicno));
                                indexPrisustvaStudenta++;
                            }
                            tabela += "<td id=\"" + student.index + "s" + j + "\">" + procenat + "%</td>";
                        }
                    }
                    if (!validniPodaci) break;
                    if (zadnjaSedmica != 15) tabela += "<td></td></tr>";
                }
            }
            tabela += "</table>"
        }
    }

    tabela += "<div class=\"buttonsDiv\">";
    tabela += "<button class=\"buttonArrow\" onClick=\"prethodnaSedmica()\"><img src=\"images/left.jpg\"></i></button>";
    tabela += "<button class=\"buttonArrow\" onClick=\"sljedecaSedmica()\"><img src=\"images/right.jpg\"></i></button>";
    tabela += "</div>";

    if (!validniPodaci) {
        tabela = "Podaci o prisustvu nisu validni!";
    }

    if (divRef != null) {
        divRef.innerHTML = tabela
    } else {
        trenutnaSedmica = sedmica;
    }

    //implementacija metoda
    let sljedecaSedmica = function () {
        if (trenutnaSedmica != prisustva[prisustva.length - 1].sedmica) {
            for (let i = 0; i < studenti.length; i++) {
                let student = studenti[i];
                let prisustvaStudenta = map.get(student.index);

                let prisustvoZaTrenutnuSedmicu = prisustvaStudenta.filter(p => p.sedmica == trenutnaSedmica);
                let staraCelija = "";
                let procenat = 0;
                if (prisustvoZaTrenutnuSedmicu.length != 0) {
                    procenat = Math.round((prisustvoZaTrenutnuSedmicu[0].predavanja + prisustvoZaTrenutnuSedmicu[0].vjezbe) * 100 / (brojPredavanjaSedmicno + brojVjezbiSedmicno));
                }
                staraCelija += "<td id=\"" + student.index + "s" + trenutnaSedmica + "\">" + procenat + "%</td>";

                trenutnaSedmica++;
                prisustvoZaTrenutnuSedmicu = prisustvaStudenta.filter(p => p.sedmica == trenutnaSedmica);
                let novaCelija = "<td id=\"" + student.index + "s" + trenutnaSedmica + "\" class=\"tabelautabeli\"><table class=\"tabela\"><tr>";
                for (let k = 0; k < brojPredavanjaSedmicno; k++) {
                    novaCelija += "<th class=\"tabelaprisustvo\">P<br>" + (k + 1) + "</th>";
                }
                for (let k = 0; k < brojVjezbiSedmicno; k++) {
                    novaCelija += "<th class=\"tabelaprisustvo\">V<br>" + (k + 1) + "</th>";
                }
                novaCelija += "</tr>";
                novaCelija += "<tr>";

                for (let k = 0; k < brojPredavanjaSedmicno; k++) {
                    if (prisustvoZaTrenutnuSedmicu.length == 0) {
                        var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','1','0";
                        var nijeUneseno = "<td onclick=\"promijeniNijeUneseno('" + parametri + "')\" class=\"nijeuneseno\"></td>";
                        novaCelija += nijeUneseno;
                    }
                    else if (k < prisustvoZaTrenutnuSedmicu[0].predavanja) {
                        var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','" + (prisustvoZaTrenutnuSedmicu[0].predavanja - 1) + "','" + prisustvoZaTrenutnuSedmicu[0].vjezbe;
                        var prisutan = "<td onclick=\"promijeniPrisutan('" + parametri + "')\" class=\"prisutan\"></td>";
                        novaCelija += prisutan;
                    }
                    else {
                        var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','" + (prisustvoZaTrenutnuSedmicu[0].predavanja + 1) + "','" + prisustvoZaTrenutnuSedmicu[0].vjezbe;
                        var odsutan = "<td onclick=\"promijeniOdsutan('" + parametri + "')\" class=\"odsutan\"></td>";
                        novaCelija += odsutan;
                    }
                }
                for (let k = 0; k < brojVjezbiSedmicno; k++) {
                    if (prisustvoZaTrenutnuSedmicu.length == 0) {
                        var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','0','1";
                        var nijeUneseno = "<td onclick=\"promijeniNijeUneseno('" + parametri + "')\" class=\"nijeuneseno\"></td>";
                        novaCelija += nijeUneseno;
                    }
                    else if (k < prisustvoZaTrenutnuSedmicu[0].vjezbe) {
                        var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','" + prisustvoZaTrenutnuSedmicu[0].predavanja + "','" + (prisustvoZaTrenutnuSedmicu[0].vjezbe - 1);
                        var prisutan = "<td onclick=\"promijeniPrisutan('" + parametri + "')\" class=\"prisutan\"></td>";
                        novaCelija += prisutan;
                    }
                    else {
                        var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','" + prisustvoZaTrenutnuSedmicu[0].predavanja + "','" + (prisustvoZaTrenutnuSedmicu[0].vjezbe + 1);
                        var odsutan = "<td onclick=\"promijeniOdsutan('" + parametri + "')\" class=\"odsutan\"></td>";
                        novaCelija += odsutan;
                    }
                }
                novaCelija += "</tr></table></td>";

                trenutnaSedmica--;
                let staraCelijaDokument = document.getElementById(student.index + "s" + trenutnaSedmica);
                staraCelijaDokument.innerHTML = staraCelija;
                staraCelijaDokument.classList.remove("tabelautabeli");

                let novaCelijaDokument = document.getElementById(student.index + "s" + (trenutnaSedmica + 1));
                novaCelijaDokument.innerHTML = novaCelija;
                novaCelijaDokument.classList.add("tabelautabeli");
            }
            trenutnaSedmica++;
        }
    }
    let prethodnaSedmica = function () {
        if (trenutnaSedmica != prisustva[0].sedmica) {
            for (let i = 0; i < studenti.length; i++) {
                let student = studenti[i];
                let prisustvaStudenta = map.get(student.index);

                let prisustvoZaTrenutnuSedmicu = prisustvaStudenta.filter(p => p.sedmica == trenutnaSedmica);
                let staraCelija = "";
                let procenat = 0;
                if (prisustvoZaTrenutnuSedmicu.length != 0) {
                    procenat = Math.round((prisustvoZaTrenutnuSedmicu[0].predavanja + prisustvoZaTrenutnuSedmicu[0].vjezbe) * 100 / (brojPredavanjaSedmicno + brojVjezbiSedmicno));
                }
                staraCelija += "<td id=\"" + student.index + "s" + trenutnaSedmica + "\">" + procenat + "%</td>";

                trenutnaSedmica--;
                prisustvoZaTrenutnuSedmicu = prisustvaStudenta.filter(p => p.sedmica == trenutnaSedmica);
                let novaCelija = "<td id=\"" + student.index + "s" + trenutnaSedmica + "\" class=\"tabelautabeli\"><table class=\"tabela\"><tr>";
                for (let k = 0; k < brojPredavanjaSedmicno; k++) {
                    novaCelija += "<th class=\"tabelaprisustvo\">P<br>" + (k + 1) + "</th>";
                }
                for (let k = 0; k < brojVjezbiSedmicno; k++) {
                    novaCelija += "<th class=\"tabelaprisustvo\">V<br>" + (k + 1) + "</th>";
                }
                novaCelija += "</tr>";
                novaCelija += "<tr>";

                for (let k = 0; k < brojPredavanjaSedmicno; k++) {
                    if (prisustvoZaTrenutnuSedmicu.length == 0) {
                        var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','1','0";
                        var nijeUneseno = "<td onclick=\"promijeniNijeUneseno('" + parametri + "')\" class=\"nijeuneseno\"></td>";
                        novaCelija += nijeUneseno;
                    }
                    else if (k < prisustvoZaTrenutnuSedmicu[0].predavanja) {
                        var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','" + (prisustvoZaTrenutnuSedmicu[0].predavanja - 1) + "','" + prisustvoZaTrenutnuSedmicu[0].vjezbe;
                        var prisutan = "<td onclick=\"promijeniPrisutan('" + parametri + "')\" class=\"prisutan\"></td>";
                        novaCelija += prisutan;
                    }
                    else {
                        var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','" + (prisustvoZaTrenutnuSedmicu[0].predavanja + 1) + "','" + prisustvoZaTrenutnuSedmicu[0].vjezbe;
                        var odsutan = "<td onclick=\"promijeniOdsutan('" + parametri + "')\" class=\"odsutan\"></td>";
                        novaCelija += odsutan;
                    }
                }
                for (let k = 0; k < brojVjezbiSedmicno; k++) {
                    if (prisustvoZaTrenutnuSedmicu.length == 0) {
                        var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','0','1";
                        var nijeUneseno = "<td onclick=\"promijeniNijeUneseno('" + parametri + "')\" class=\"nijeuneseno\"></td>";
                        novaCelija += nijeUneseno;
                    }
                    else if (k < prisustvoZaTrenutnuSedmicu[0].vjezbe) {
                        var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','" + prisustvoZaTrenutnuSedmicu[0].predavanja + "','" + (prisustvoZaTrenutnuSedmicu[0].vjezbe - 1);
                        var prisutan = "<td onclick=\"promijeniPrisutan('" + parametri + "')\" class=\"prisutan\"></td>";
                        novaCelija += prisutan;
                    }
                    else {
                        var parametri = predmet + "','" + student.index + "','" + trenutnaSedmica + "','" + prisustvoZaTrenutnuSedmicu[0].predavanja + "','" + (prisustvoZaTrenutnuSedmicu[0].vjezbe + 1);
                        var odsutan = "<td onclick=\"promijeniOdsutan('" + parametri + "')\" class=\"odsutan\"></td>";
                        novaCelija += odsutan;
                    }
                }
                novaCelija += "</tr></table></td>";

                trenutnaSedmica++;
                let staraCelijaDokument = document.getElementById(student.index + "s" + trenutnaSedmica);
                staraCelijaDokument.innerHTML = staraCelija;
                staraCelijaDokument.classList.remove("tabelautabeli");

                let novaCelijaDokument = document.getElementById(student.index + "s" + (trenutnaSedmica - 1));
                novaCelijaDokument.innerHTML = novaCelija;
                novaCelijaDokument.classList.add("tabelautabeli");

            }
            trenutnaSedmica--;
        }
    }
    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }
}