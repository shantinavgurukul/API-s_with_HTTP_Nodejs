let express = require('express')
let app = express();
const port = 5000;

app.use(express.json())

// DataBase conection:-
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'Shanti123#@!',
        database: 'db_name'
    }
});

// Creating cusmer table:-
knex.schema.hasTable('customerDetails').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable('customerDetails', function (table) {
            table.increments('id').primary();
            table.string('first_name', 100);
            table.string('last_name', 100);
            table.string('CityName', 100);
            table.string('store_name', 100);


        });
    }
});

// Create user:-
app.post('/createData', (req, res) => {
    knex('customerDetails').insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        CityName: req.body.CityName,
        store_name: req.body.store_name
    }).then(() => {
        console.log('customerDetails crete!...')
        res.send('create customerDetails')
    })

})

// Getting all customer data:-
app.get('/getcusmoterData',(req,res) => {
    knex().select('*')
    .from('customerDetails')
    .then((data) =>{
        console.log('data is coming!....');
        res.send(data)
    })
    .catch((err) => {
        console.log(err);
        res.send(err)
    })
})
// Getting parcticular customer details by id:-
app.get('/getallData/:/id',(req,res) => {
    knex()
    .select('*')
    .from('customerDetails')
    .where('id',req.params.id)
    .then((data) => {
        console.log('data is coming....')
        res.send(data)
    })
    .catch((err) => {
        console.log(err)
        res.send(err)
    })
})
// updating particular customer details by id:-
app.put('/update/:id',(req,res) => {
    knex.update({
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "CityName": req.body.CityName,
        "store_name": req.body.store_name

    })
    .table('customerDetails').where('id',req.params.id)
    .then(() => {
        res.send('data updating....')
    })
    .catch((err) => {
        res.send(err)
    })
})

// Deleting particular data by id:-
app.delete('/deletedata/:id',(req,res) => {
    knex('customerDetails')
    .where({'id':req.params.id}).del()
    .then(() => {
        res.send('user deleted!!')
    })
    .catch((err) => {
        res.send(err)
    })
})
app.listen(port,() => {
    console.log(`your port is working ${port}`)
})