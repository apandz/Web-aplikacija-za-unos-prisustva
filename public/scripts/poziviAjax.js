const PoziviAjax = (() => {
    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo
    //odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv, fnCallback) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'predmet/' + naziv, true);
        xhttp.onreadystatechange = function () {
            var jsonRes = JSON.parse(xhttp.responseText);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                fnCallback(null, jsonRes);
            }
            else if (xhttp.readyState == 4) {
                fnCallback(xhttp.status, null);
            }
        };
        xhttp.send();
    }

    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'predmeti', true);
        xhttp.onreadystatechange = function () {
            var jsonRes = JSON.parse(xhttp.responseText);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                fnCallback(null, jsonRes);
            }
            else if (xhttp.readyState == 4) {
                fnCallback(xhttp.status, jsonRes.greska);
            }
        };
        xhttp.send();
    }

    function impl_postLogin(username, password, fnCallback) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'login', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onreadystatechange = function () {
            var jsonRes = JSON.parse(xhttp.response);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                fnCallback(null, jsonRes.poruka);
            }
            else if (xhttp.readyState == 4) {
                fnCallback(xhttp.status, jsonRes.poruka);
            }
        };
        xhttp.send(JSON.stringify({
            "username": username,
            "password": password
        }));
    }

    function impl_postLogout(fnCallback) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'logout', true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                fnCallback(null, "");
            }
            else if (xhttp.readyState == 4) {
                fnCallback(xhttp.status, "");
            }
        };
        xhttp.send();
    }

    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv, index, prisustvo, fnCallback) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'prisustvo/predmet/' + naziv + '/student/' + index, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var jsonRes = JSON.parse(xhttp.response);
                fnCallback(null, jsonRes);
            }
            else if (xhttp.readyState == 4) {
                fnCallback(xhttp.status, "");
            }
        };
        xhttp.send(prisustvo);
    }

    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getPredmet: impl_getPredmet,
        getPredmeti: impl_getPredmeti,
        postPrisustvo: impl_postPrisustvo
    };
})();