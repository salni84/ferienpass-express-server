const express = require('express');
const bodyParser = require("body-parser");


function createRouter(db) {
    const router = express.Router();
    const app = express();
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(function (req, res) {
        res.end(JSON.stringify(req.body, null, 2))
    });


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

    router.get('/sub/:parent', (req, res) => {
        db.query(
            'SELECT * FROM subprocess WHERE parent = ? order by position', [req.params.parent],
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


    router.get('/department/:parent', (req, res) => {
        db.query(
            'SELECT * FROM departmentprocess WHERE parent = ? order by position', [req.params.parent],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        );
    });

    router.get('/department', (req, res) => {
        db.query(
            'SELECT * FROM departmentprocess order by position', [req.params.parent],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        );
    });

    router.get('/sub', (req, res) => {
        db.query(
            'SELECT * FROM subprocess order by position', [req.params.parent],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        );
    });

    router.get('/detail/:parent', (req, res) => {
        db.query(
            'SELECT * FROM detailprocess WHERE parent = ? order by position', [req.params.parent],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        );
    });

    router.get('/document/:coreElement', (req, res) => {
        db.query(
            'SELECT * FROM documents WHERE coreElement = ? order by id', [req.params.coreElement],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        );
    });

    router.get('/documents/:parent', (req, res) => {
        db.query(
            'SELECT * FROM documents WHERE parent = ? order by id', [req.params.parent],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        );
    });


    router.get('/departments', (req, res) => {
        db.query(
            'SELECT * FROM departments order by id', [req.params.parent],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        );
    });


    router.delete('/basic/:id', (req, res) => {
        db.query(
            'DELETE FROM basicprocess WHERE id = ?', [req.params.id],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        )
    });

    router.delete('/sub/:id', (req, res) => {
        db.query(
            'DELETE FROM subprocess WHERE id = ?', [req.params.id],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        )
    });

    router.delete('/department/:id', (req, res) => {
        db.query(
            'DELETE FROM departmentprocess WHERE id = ?', [req.params.id],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        )
    });

    router.delete('/detail/:id', (req, res) => {
        db.query(
            'DELETE FROM detailprocess WHERE id = ?', [req.params.id],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        )
    });

    router.delete('/documents/:id', (req, res) => {
        db.query(
            'DELETE FROM documents WHERE id = ?', [req.params.id],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        )
    });

    router.delete('/departments/:id', (req, res) => {
        db.query(
            'DELETE FROM departments WHERE id = ?', [req.params.id],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            }
        )
    });

    router.post('/basic/new', (req, res) => {

        let level = req.body.level;
        let name = req.body.name;
        let color = req.body.color;
        let form = req.body.form;
        let position = req.body.position;
        let isVisible = req.body.isVisible;
        let visibleName = req.body.visibleName;

        db.query(
            'INSERT INTO basicprocess VALUES (?,?,?,?,?,?,?,?)', [null, level, name, color, form, position, isVisible, visibleName],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            });
    });

    router.post('/sub/new', (req, res) => {

        let level = req.body.level;
        let name = req.body.name;
        let color = req.body.color;
        let form = req.body.form;
        let position = req.body.position;
        let parent = req.body.parent;
        let visibleName = req.body.visibleName;

        db.query(
            'INSERT INTO subprocess VALUES (?,?,?,?,?,?,?,?)', [null, level, name, color, form, position, parent, visibleName],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            });
    });

    router.post('/department/new', (req, res) => {

        let level = req.body.level;
        let name = req.body.name;
        let color = req.body.color;
        let form = req.body.form;
        let position = req.body.position;
        let parent = req.body.parent;
        let visibleName = req.body.visibleName;

        db.query(
            'INSERT INTO departmentprocess VALUES (?,?,?,?,?,?,?,?)', [null, level, name, color, form, position, parent, visibleName],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            });
    });

    router.post('/detail/new', (req, res) => {

        let level = req.body.level;
        let name = req.body.name;
        let color = req.body.color;
        let form = req.body.form;
        let position = req.body.position;
        let parent = req.body.parent;
        let order = req.body.order;
        let isVisible = req.body.isVisible;
        let visibleName = req.body.visibleName;
        let isBubble = req.body.isBubble;

        db.query(
            'INSERT INTO detailprocess VALUES (?,?,?,?,?,?,?,?,?,?,?)', [null, level, name, color, form, position, parent, order, isVisible, visibleName, isBubble],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            });
    });

    router.post('/documents/new', (req, res) => {

        let name = req.body.name;
        let link = req.body.link;
        let description = req.body.description;
        let parent = req.body.parent;
        let coreElement = req.body.coreElement;
        let nr = req.body.nr;

        db.query(
            'INSERT INTO documents VALUES (?,?,?,?,?,?,?)', [null, link, description, coreElement, nr, parent, name],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            });
    });

    router.post('/departments/new', (req, res) => {

        let name = req.body.name;
        let color = req.body.color;

        db.query(
            'INSERT INTO departments VALUES (?,?,?)', [null, name, color],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results)
                }
            });
    });

    router.put('/basic', (req, res) => {

        for (let x = 0; x < req.body.length; x++) {
            let id = req.body[x].id;
            let position = req.body[x].position;
            let visibleName = req.body[x].visibleName;
            let color = req.body[x].color;
            let form = req.body[x].form;


            db.query(
                "UPDATE basicprocess SET position = ?, visibleName = ?, form = ?, color = ? WHERE id = ?", [position, visibleName, form, color, id],
                () => {
                })
        }

        res.status(200).json()
    });

    router.put('/sub', (req, res) => {

        for (let x = 0; x < req.body.length; x++) {
            let id = req.body[x].id;
            let position = req.body[x].position;
            let visibleName = req.body[x].visibleName;
            let color = req.body[x].color;
            let form = req.body[x].form;

            db.query(
                "UPDATE subprocess SET position = ?, visibleName = ?, form = ?, color = ? WHERE id = ?", [position, visibleName, form, color, id],
                () => {
                })
        }

        res.status(200).json()
    });


    router.put('/department', (req, res) => {

        for (let x = 0; x < req.body.length; x++) {
            let id = req.body[x].id;
            let position = req.body[x].position;
            let visibleName = req.body[x].visibleName;
            let form = req.body[x].form;
            let color = req.body[x].color;

            db.query(
                "UPDATE departmentprocess SET position = ?, visibleName = ?, form = ?, color = ? WHERE id = ?", [position, visibleName, form, color, id],
                () => {
                })
        }

        res.status(200).json()
    });

    router.put('/detail', (req, res) => {

        for (let x = 0; x < req.body.length; x++) {
            let id = req.body[x].id;
            let form = req.body[x].form;
            let position = req.body[x].position;
            let visibleName = req.body[x].visibleName;
            let color = req.body[x].color;
            let isBubble = req.body[x].isBubble;

            db.query(
                "UPDATE detailprocess SET position = ?, visibleName = ?, form = ?, color = ?, isBubble = ? WHERE id = ?", [position, visibleName, form, color, isBubble, id],
                () => {
                })
        }

        res.status(200).json()
    });

    router.put('/departments', (req, res) => {

        for (let x = 0; x < req.body.length; x++) {
            let id = req.body[x].id;
            let name = req.body[x].name;
            let color = req.body[x].color;

            db.query(
                "UPDATE departments SET name = ?, color = ? WHERE id = ?", [name, color, id],
                () => {
                })
        }

        res.status(200).json()
    });


    return router
}

module.exports = createRouter;
