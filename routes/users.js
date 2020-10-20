var express = require('express');
var router = express.Router();

const fs = require('fs');


router.get('/auth', function(req, res, next) {
    console.log('Auth reqeust for a user');
    const { username, password } = req.body;
    if (username === "demo" && password === "demo") {
        return res.send(ok({
            id: 999,
            username: "demo",
        }))

    } else {
        return res.send(error("Invalid Credentials"))
    }

});






router.get('/all', function(req, res, next) {
    console.log('Get request for all Users');
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        console.log(data)
        if (err) {
            throw err;

        }

        res.send(JSON.parse(data));
    });
});

router.get('/:user_id', function(req, res, next) {
    id = req.params.user_id
    console.log('Get request for single User');
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        let d = JSON.parse(data)
        x = d.find(u => u.user_id == id);
        if (x == null) {
            res.status(409).json({
                status: false,
                error: err['message'],
            })
        } else { res.send(x); }

    });
});
router.delete('/:user_id', function(req, res, next) {
    id = req.params.user_id
    console.log(id)
    console.log('delete request for single User');
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {

            throw err;
        }
        let d = JSON.parse(data)
        const index = d.findIndex(x => x.user_id == req.params.user_id);
        console.log(index)
            //d[index] = '';
        d.splice(index, 1)
        console.log(d)
        fs.writeFile('./data/users.json', JSON.stringify(d), 'utf8', function(err) {
            if (err) {
                console.log("delete failed")
            } else {
                console.log("delete success")
            }
        })
    });
});

router.post('/save', function(req, res, next) {
    console.log('Save request for single User');

    //console.log(req.body)
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            ``
            throw err;
        }
        let d = JSON.parse(data)
        const index = d.findIndex(x => x.user_id == req.body.user_id);
        console.log(index)
        d[index] = req.body
            //console.log(d)
        fs.writeFile('./data/users.json', JSON.stringify(d), 'utf8', function(err) {
            if (err) {
                //                     response = { "error": false, "message": data, "pages": totalPages };

                console.log("change failed")
            } else {
                console.log("change success")
            }
        })

    });
});





module.exports = router;