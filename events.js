const express = require('express');
const bodyParser = require("body-parser");
const connection = require("mysql");


function createRouter(db) {
    const router = express.Router();
    const app = express();
    const bodyParser = require("body-parser")
    app.use(express.json());
    app.use(bodyParser.urlencoded({
        extended:true
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(function (req, res) {
        res.end(JSON.stringify(req.body, null, 2))
    });


    router.post('/usermanagement', (req, res) => {
        const password = req.body.password;
        console.log(req.body)
        if (password === 'fpb7402') {
            res.status(200)
        } else {
            res.status(400)
        }
    })


    router.get('/getAllOrders', (req, res) => {
        db.query(
            'SELECT * FROM anmeldungen ORDER BY name_kind',
            (error, results) => {
                if (error) {g
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        );
    });

    router.get('/getSingleOrder/:id', (req, res) => {
        db.query(
            'SELECT * FROM anmeldungen WHERE id = ?', [req.params.id],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        );
    });

    router.delete('/deleteSingleOrder/:id', (req, res) => {
        db.query(
            'DELETE FROM anmeldungen WHERE id = ?', [req.params.id],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        )
    });

    router.delete('/deleteCourse/:id', (req, res) => {
        db.query(
            'DELETE FROM kurse WHERE id = ? LIMIT 1', [req.params.id],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        )
    });

    router.put('/deleteCourseFromOrder/:id', (req, res) => {
        const kurs = req.body
        db.query(
            "UPDATE anmeldungen SET ? = '' WHERE id = ?", [kurs, req.params.id],
            (error, results) => {
                if (error) {
                    console.log(error)
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        )
    });


    router.get('/getAllCourses', (req, res) => {
        db.query(
            'SELECT * FROM kurse',
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        );
    });

    router.get('/getSingleCourse/:title', (req, res) => {
        const param = req.params.title
        const sql = `SELECT * FROM kurse WHERE title LIKE ` + connection.escape(`${param}%`)
        db.query(sql, function (error, result) {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(result)
                }
            }
        );
    });

    router.get('/getCourseDetails/:id', (req, res) => {
        const id = req.params.id + '%'
        db.query(
            "SELECT * FROM anmeldungen WHERE course_prio_1 LIKE ? OR course_prio_2 LIKE ? OR course_prio_3 LIKE ? OR course_prio_4 LIKE ? OR course_prio_5 LIKE ? OR kurs1 LIKE ? OR kurs2 LIKE ? OR kurs3 LIKE ? OR kurs4 LIKE ? OR kurs5 LIKE ? OR kurs6 LIKE ? OR kurs7 LIKE ? OR kurs8 LIKE ? OR kurs9 LIKE ? OR kurs10 LIKE ?",
            [id, id, id, id, id, id, id, id, id, id, id, id, id, id, id],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        );
    });

    router.get('/getHelpers/:id', (req, res) => {
        const id = '%' + req.params.id + '%'
        db.query(
            'SELECT id, name_kind, vorname_kind, name_parent, vorname_parent, mobilephone, begleitkurs FROM `anmeldungen` WHERE begleitkurs LIKE ?', [id],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        );
    });

    router.post('/newCourse', (req, res) => {

        let title = req.body.title;
        let start = req.body.start;
        let end = req.body.end;
        let location = req.body.location;
        let preis = req.body.preis;
        let organisator = req.body.organisator;
        let kontaktnummer = req.body.kontaktnummer;
        let bemerkungen = req.body.bemerkungen;
        let maximum_teilnehmer = req.body.maximum_teilnehmer;
        let maximum_begleiter = req.body.maximum_begleiter;

        db.query(
            'INSERT INTO kurse VALUES (?,?,?,?,?,?,?,?,?,?,?)', [null, title, start, location, preis, organisator, kontaktnummer,
            bemerkungen, maximum_teilnehmer, maximum_begleiter, end],
            (error, results) => {
                console.log(error)
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            });
    });

    router.post('/newOrder', (req, res) => {

        let name_kind = req.body.name_kind;
        let vorname_kind = req.body.vorname_kind;
        let address = req.body.address;
        let location = req.body.location;
        let email = req.body.email;
        let birthdate = req.body.birthdate;
        let notes = req.body.notes;
        let name_parent = req.body.name_parent;
        let vorname_parent = req.body.vorname_parent;
        let mobilephone = req.body.mobilephone;
        let wish_course = req.body.wish_course;
        console.log(wish_course)
        let foto_permission = req.body.foto_permission;
        let car = req.body.car;
        let begleitkurs = req.body.begleitkurs;
        let course_prio1 = req.body.course_prio1;
        let course_prio2 = req.body.course_prio2;
        let course_prio3 = req.body.course_prio3;
        let course_prio4 = req.body.course_prio4;
        let course_prio5 = req.body.course_prio5;

        let course_prio1_sany = course_prio1;
        let course_prio2_sany = course_prio2;
        let course_prio3_sany = course_prio3;
        let course_prio4_sany = course_prio4;
        let course_prio5_sany = course_prio5;

        let verguenstigungen_oev = req.body.verguenstigungen_oev;
        let anmeldedatum = req.body.anmeldedatum;


       /* let kurs1;
        let kurs2;
        let kurs3;
        let kurs4;
        let kurs5;
        let kurs6;
        let kurs7;
        let kurs8;
        let kurs9;
        let kurs10;


        wish_course.forEach(() => {
            kurs1 = wish_course[0];
            kurs2 = wish_course[1];
            kurs3 = wish_course[2];
            kurs4 = wish_course[3];
            kurs5 = wish_course[4];
            kurs6 = wish_course[5];
            kurs7 = wish_course[6];
            kurs8 = wish_course[7];
            kurs9 = wish_course[8];
            kurs10 = wish_course[9];
        })
*/





        db.query(
            'INSERT INTO anmeldungen VALUES (null, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
                null, name_kind, vorname_kind, address, location, email, birthdate, notes, name_parent, vorname_parent, mobilephone, foto_permission,
                verguenstigungen_oev, course_prio1, course_prio2, course_prio3, course_prio4, course_prio5, car, begleitkurs,
                null, null, null, null, null, null, null, null, null, null],
            (error, results) => {
                console.log(error)
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    console.log(results)
                    res.status(200).json(results)
                }
            });
    });




    return router
}

module.exports = createRouter;
