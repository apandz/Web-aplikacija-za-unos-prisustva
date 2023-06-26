const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const session = require('express-session');
const db = require('./public/models');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use(express.json());

app.use(bodyParser.json());

app.use(session({
    secret: 'wt18808',
    resave: true,
    saveUninitialized: true
}));

app.get('/predmet/:NAZIV', async (req, res) => {
    let predmet = req.params.NAZIV;
    if (req.session.username == null) {
        var greska = "Nastavnik nije loginovan";
        res.status(400).send(JSON.stringify({ "greska": greska }));
    } else {
        var podaci = await db.models.Predmet.findOne({ where: { naziv: predmet }, include: ["studenti", "prisustva"] });
        podaci = podaci.dataValues;

        podaci.studenti = podaci.studenti.map(s => {
            var dataValues = s.dataValues; return { index: dataValues.index, ime: dataValues.ime };
        });

        podaci.prisustva = podaci.prisustva.map(p => p.dataValues);

        podaci.predmet = podaci.naziv;

        res.send(podaci);
    }
});

app.get('/predmeti', (req, res) => {
    if (req.session.username == null) {
        var greska = "Nastavnik nije loginovan";
        res.status(400).send(JSON.stringify({ "greska": greska }));
    } else {
        res.send(JSON.stringify(req.session.predmeti));
    }
});

app.post('/login', async (req, res) => {
    if (req.session.username == null) {
        var js = req.body;

        const hashedPassword = await new Promise(async (resolve, reject) => {
            var nastavnik = await db.models.Nastavnik.findOne({ where: { username: js.username } });
            nastavnik = nastavnik.dataValues;
            var predmetiId = await db.models.NastavnikPredmeti.findAll({ attributes: ["predmetId"], where: { nastavnikId: nastavnik.id } });
            var predmeti = [];

            for (let i = 0; i < predmetiId.length; i++) {
                var novi = await db.models.Predmet.findOne({ where: { id: predmetiId[i].dataValues.predmetId } });
                predmeti.push(novi.dataValues.naziv);
            }

            req.session.predmeti = predmeti;

            resolve(JSON.stringify(nastavnik.password_hash));
        });

        var len = hashedPassword == null ? 0 : hashedPassword.length;
        const correctPassword = hashedPassword == null ? false : await new Promise((resolve, reject) => {
            bcrypt.compare(js.password, hashedPassword.substring(1, len - 1), (error, result) => {
                if (error) resolve(false);
                resolve(result);
            });
        });

        var ispravniPodaci = hashedPassword != null && correctPassword;

        if (ispravniPodaci) {
            req.session.username = js.username;
        } else {
            req.session.predmeti = null;
        }

        var poruka = ispravniPodaci ? "Uspješna prijava" : "Neuspješna prijava";
        res.send(JSON.stringify({ "poruka": poruka }));
    }
});

app.post('/logout', (req, res) => {
    req.session.username = null;
    req.session.predmeti = null;
    res.send();
});

app.post('/prisustvo/predmet/:NAZIV/student/:index', async (req, res) => {
    var js = req.body;
    const sedmica = js.sedmica;
    const predavanja = js.predavanja;
    const vjezbe = js.vjezbe;
    const predmet = req.params.NAZIV;
    const index = req.params.index;

    var predmetId = await db.models.Predmet.findOne({ where: { naziv: predmet } });
    predmetId = predmetId.dataValues.id;
    console.log(predmetId);
    await db.models.Prisustvo.findOne({
        where: {
            sedmica: sedmica, index: index, predmetId: predmetId
        }
    }).then(async prisustvo => {
        if (!prisustvo) {
            await db.models.Prisustvo.create({
                sedmica: sedmica, predavanja: predavanja, vjezbe: vjezbe, index: index, predmetId: predmetId
            });
        } else {
            await prisustvo.update({ predavanja: parseInt(predavanja), vjezbe: parseInt(vjezbe) });
        }
    }).catch((error) => {
        throw new Error(error);
    });

    const predmeti = req.session.predmeti;
    let noviPodaci = [];
    for (let i = 0; i < predmeti.length; i++) {
        var podaci = await db.models.Predmet.findOne({ where: { naziv: predmeti[i] }, include: ["studenti", "prisustva"] });
        podaci = podaci.dataValues;

        podaci.studenti = podaci.studenti.map(s => {
            var dataValues = s.dataValues; return { index: dataValues.index, ime: dataValues.ime };
        });

        podaci.prisustva = podaci.prisustva.map(p => p.dataValues);

        podaci.predmet = podaci.naziv;

        noviPodaci.push(podaci);
    }

    res.send(noviPodaci);
});

app.listen(PORT);