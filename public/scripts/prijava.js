function provjeri() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    PoziviAjax.postLogin(username, password, (error, data) => {
        document.getElementById('poruka').textContent = data;
        if (data == "Uspješna prijava") {
            document.getElementById('poruka').classList.remove("neuspjesno");
            document.getElementById('poruka').classList.add("uspjesno");
            window.setTimeout(function () {
                location.href = "predmeti.html";
            }, 1000);
        } else {
            document.getElementById('poruka').classList.add("neuspjesno");
        }
    });
}

function odjavi() {
    PoziviAjax.postLogout((error, data) => {
        window.location.href = "prijava.html";
    });
}

function dajPredmete() {
    PoziviAjax.getPredmeti((error, data) => {
        if (error == null) {
            let predmeti = "";
            let pocetak = "<div class=\"menibox\"><div class=\"meniitem\"><a href=\"#\" onclick=\"iscrtajTabelu('";
            let sredina = "')\">";
            let kraj = "</a></div></div>\n";
            for (let i = 0; i < data.length; i++) {
                predmeti += pocetak;
                predmeti += data[i];
                predmeti += sredina;
                predmeti += data[i];
                predmeti += kraj;
            }
            document.getElementById('scrollable').innerHTML = predmeti;
        }
    });
}