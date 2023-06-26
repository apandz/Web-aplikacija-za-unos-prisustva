const db = require('../models');

(async () => {
    await db.sequelize.sync({ force: true }).then(function () {
        initialize().then(function () {
            process.exit();
        });
    });

    function initialize() {
        return new Promise(async function (resolve, reject) {
            await db.models.Nastavnik.create({ username: "USERNAME", password_hash: "$2a$10$4SY1h3fjFY9cIQr0XM0/q.pv3SFZ6.VIrIdK4VOCedxMmcT9EiyfK" });
            await db.models.Nastavnik.create({ username: "USERNAME2", password_hash: "$2a$10$jdSDniGne5q3DaZCBwDSPOn3hL29TK2G9Cxgx1UPMLVs0wVsyNtS2" });
            await db.models.Nastavnik.create({ username: "user", password_hash: "$2a$10$/ugcyOmNssj2IGOEk/sk3.UUDXtDWoEFfwcjuTOpd1DMXWyQ6r2EC" });

            await db.models.Predmet.create({ naziv: "Tehnike programiranja", brojPredavanjaSedmicno: 10, brojVjezbiSedmicno: 7 });
            await db.models.Predmet.create({ naziv: "Numerički algoritmi", brojPredavanjaSedmicno: 10, brojVjezbiSedmicno: 7 });
            await db.models.Predmet.create({ naziv: "Diskretna matematika", brojPredavanjaSedmicno: 10, brojVjezbiSedmicno: 7 });
            await db.models.Predmet.create({ naziv: "Inženjerska matematika 1", brojPredavanjaSedmicno: 10, brojVjezbiSedmicno: 7 });
            await db.models.Predmet.create({ naziv: "Inženjerska matematika 2", brojPredavanjaSedmicno: 10, brojVjezbiSedmicno: 7 });
            await db.models.Predmet.create({ naziv: "Inženjerska matematika 3", brojPredavanjaSedmicno: 10, brojVjezbiSedmicno: 7 });
            await db.models.Predmet.create({ naziv: "Matematička logika i teorija izračunljivosti", brojPredavanjaSedmicno: 10, brojVjezbiSedmicno: 7 });
            await db.models.Predmet.create({ naziv: "Linearna algebra i geometrija", brojPredavanjaSedmicno: 10, brojVjezbiSedmicno: 7 });
            await db.models.Predmet.create({ naziv: "Inženjerska fizika 1", brojPredavanjaSedmicno: 10, brojVjezbiSedmicno: 7 });
            await db.models.Predmet.create({ naziv: "Inženjerska fizika 2", brojPredavanjaSedmicno: 10, brojVjezbiSedmicno: 7 });
            await db.models.Predmet.create({ naziv: "Web tehnologije", brojPredavanjaSedmicno: 15, brojVjezbiSedmicno: 12 });
            await db.models.Predmet.create({ naziv: "Razvoj mobilnih aplikacija", brojPredavanjaSedmicno: 5, brojVjezbiSedmicno: 3 });
            await db.models.Predmet.create({ naziv: "Napredne web tehnologije", brojPredavanjaSedmicno: 10, brojVjezbiSedmicno: 7 });

            await db.models.NastavnikPredmeti.create({ nastavnikId: 1, predmetId: 1 });
            await db.models.NastavnikPredmeti.create({ nastavnikId: 1, predmetId: 2 });
            await db.models.NastavnikPredmeti.create({ nastavnikId: 1, predmetId: 3 });
            await db.models.NastavnikPredmeti.create({ nastavnikId: 2, predmetId: 4 });
            await db.models.NastavnikPredmeti.create({ nastavnikId: 2, predmetId: 5 });
            await db.models.NastavnikPredmeti.create({ nastavnikId: 2, predmetId: 6 });
            await db.models.NastavnikPredmeti.create({ nastavnikId: 2, predmetId: 7 });
            await db.models.NastavnikPredmeti.create({ nastavnikId: 2, predmetId: 8 });
            await db.models.NastavnikPredmeti.create({ nastavnikId: 2, predmetId: 9 });
            await db.models.NastavnikPredmeti.create({ nastavnikId: 2, predmetId: 10 });
            await db.models.NastavnikPredmeti.create({ nastavnikId: 3, predmetId: 11 });
            await db.models.NastavnikPredmeti.create({ nastavnikId: 3, predmetId: 12 });
            await db.models.NastavnikPredmeti.create({ nastavnikId: 3, predmetId: 13 });

            await db.models.Student.create({ index: 12345, ime: "Neko Nekić" });
            await db.models.Student.create({ index: 12346, ime: "Neko Nekić" });
            await db.models.Student.create({ index: 12347, ime: "Neko Nekić" });
            await db.models.Student.create({ index: 12348, ime: "Neko Nekić" });

            await db.models.PredmetStudenti.create({ predmetId: 11, studentIndex: 12345 });
            await db.models.PredmetStudenti.create({ predmetId: 11, studentIndex: 12346 });
            await db.models.PredmetStudenti.create({ predmetId: 11, studentIndex: 12347 });
            await db.models.PredmetStudenti.create({ predmetId: 11, studentIndex: 12348 });
            await db.models.PredmetStudenti.create({ predmetId: 12, studentIndex: 12345 });
            await db.models.PredmetStudenti.create({ predmetId: 12, studentIndex: 12346 });
            await db.models.PredmetStudenti.create({ predmetId: 12, studentIndex: 12347 });
            await db.models.PredmetStudenti.create({ predmetId: 13, studentIndex: 12345 });
            await db.models.PredmetStudenti.create({ predmetId: 13, studentIndex: 12346 });
            await db.models.PredmetStudenti.create({ predmetId: 13, studentIndex: 12347 });

            await db.models.Prisustvo.create({ sedmica: 12, predavanja: 1, vjezbe: 1, index: 12345, predmetId: 11 });
            await db.models.Prisustvo.create({ sedmica: 10, predavanja: 1, vjezbe: 1, index: 12345, predmetId: 11 });
            await db.models.Prisustvo.create({ sedmica: 12, predavanja: 1, vjezbe: 1, index: 12348, predmetId: 11 });
            await db.models.Prisustvo.create({ sedmica: 10, predavanja: 1, vjezbe: 1, index: 12348, predmetId: 11 });
            await db.models.Prisustvo.create({ sedmica: 12, predavanja: 2, vjezbe: 2, index: 12346, predmetId: 11 });
            await db.models.Prisustvo.create({ sedmica: 11, predavanja: 2, vjezbe: 2, index: 12345, predmetId: 11 });
            await db.models.Prisustvo.create({ sedmica: 11, predavanja: 2, vjezbe: 2, index: 12348, predmetId: 11 });
            await db.models.Prisustvo.create({ sedmica: 11, predavanja: 2, vjezbe: 2, index: 12346, predmetId: 11 });
            await db.models.Prisustvo.create({ sedmica: 9, predavanja: 3, vjezbe: 2, index: 12347, predmetId: 11 });
            await db.models.Prisustvo.create({ sedmica: 10, predavanja: 3, vjezbe: 2, index: 12347, predmetId: 11 });
            await db.models.Prisustvo.create({ sedmica: 11, predavanja: 3, vjezbe: 2, index: 12347, predmetId: 11 });
            await db.models.Prisustvo.create({ sedmica: 12, predavanja: 3, vjezbe: 2, index: 12347, predmetId: 11 });

            await db.models.Prisustvo.create({ sedmica: 7, predavanja: 5, vjezbe: 3, index: 12345, predmetId: 12 });
            await db.models.Prisustvo.create({ sedmica: 7, predavanja: 5, vjezbe: 2, index: 12346, predmetId: 12 });
            await db.models.Prisustvo.create({ sedmica: 7, predavanja: 4, vjezbe: 3, index: 12347, predmetId: 12 });
            await db.models.Prisustvo.create({ sedmica: 8, predavanja: 4, vjezbe: 2, index: 12346, predmetId: 12 });
            await db.models.Prisustvo.create({ sedmica: 8, predavanja: 3, vjezbe: 3, index: 12347, predmetId: 12 });
            await db.models.Prisustvo.create({ sedmica: 12, predavanja: 1, vjezbe: 1, index: 12345, predmetId: 12 });
            await db.models.Prisustvo.create({ sedmica: 10, predavanja: 1, vjezbe: 1, index: 12345, predmetId: 12 });
            await db.models.Prisustvo.create({ sedmica: 12, predavanja: 2, vjezbe: 2, index: 12346, predmetId: 12 });
            await db.models.Prisustvo.create({ sedmica: 11, predavanja: 2, vjezbe: 2, index: 12345, predmetId: 12 });
            await db.models.Prisustvo.create({ sedmica: 11, predavanja: 2, vjezbe: 2, index: 12346, predmetId: 12 });
            await db.models.Prisustvo.create({ sedmica: 9, predavanja: 3, vjezbe: 2, index: 12347, predmetId: 12 });
            await db.models.Prisustvo.create({ sedmica: 10, predavanja: 3, vjezbe: 2, index: 12347, predmetId: 12 });
            await db.models.Prisustvo.create({ sedmica: 11, predavanja: 3, vjezbe: 2, index: 12347, predmetId: 12 });
            await db.models.Prisustvo.create({ sedmica: 12, predavanja: 3, vjezbe: 2, index: 12347, predmetId: 12 });

            await db.models.Prisustvo.create({ sedmica: 12, predavanja: 1, vjezbe: 1, index: 12345, predmetId: 13 });
            await db.models.Prisustvo.create({ sedmica: 10, predavanja: 1, vjezbe: 1, index: 12345, predmetId: 13 });
            await db.models.Prisustvo.create({ sedmica: 12, predavanja: 2, vjezbe: 2, index: 12346, predmetId: 13 });
            await db.models.Prisustvo.create({ sedmica: 11, predavanja: 2, vjezbe: 2, index: 12345, predmetId: 13 });
            await db.models.Prisustvo.create({ sedmica: 11, predavanja: 2, vjezbe: 2, index: 12346, predmetId: 13 });
            await db.models.Prisustvo.create({ sedmica: 9, predavanja: 3, vjezbe: 2, index: 12347, predmetId: 13 });
            await db.models.Prisustvo.create({ sedmica: 10, predavanja: 3, vjezbe: 2, index: 12347, predmetId: 13 });
            await db.models.Prisustvo.create({ sedmica: 11, predavanja: 3, vjezbe: 2, index: 12347, predmetId: 13 });
            await db.models.Prisustvo.create({ sedmica: 12, predavanja: 3, vjezbe: 2, index: 12347, predmetId: 13 });
        });
    };
})();