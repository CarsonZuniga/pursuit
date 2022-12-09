import mysql from 'mysql2';

export default class DAppObject {
    constructor() {
        this.connection =  mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '********',
            database: 'pursuit'
        });
        this.connection.connect();
    }

    //route '/createUser'
    doCreateUser = (req, res) => {
        var userArr = [req.body];
        let query =
        `INSERT INTO Users(username, password_hash) ` + 
        `VALUES ?`;
        console.log(req.body);
        this.connection.query(query, [userArr], (error, results) => {
            if(error) {
                switch(error.code) {
                    case 'ER_DUP_ENTRY':
                        res.status(400).send({error: 'Username already exists', success: false});
                        break;
                    default:
                        res.status(400).send({error: 'Error in database operation', success: false});
                        break;
                }   
            }
            else
                res.status(200).send({message: `Successfully created user ${req.body[0]}`, success: true});
        });
    }
    //route '/login'
    doLogin = (req, res) => {
        let query =
        `SELECT * ` +
        `FROM Users ` +
        `WHERE username = '${req.body[0]}'`;
        console.log(req.body);
        this.connection.query(query, (error, results) => {
            if(error)
                res.status(400).send({error: 'Error in database operation', success: false});
            else {
                if (results.length == 0) {
                    res.status(400).send({error: `Incorrect Login`, success: false});
                }
                else if (results[0].password_hash != req.body[1]) {
                    res.status(400).send({error: `Incorrect Login`, success: false});
                }
                else
                    res.status(200).send({message: `Successfully logged into user ${req.body[0]}`, success: true});
            }
        });
    }
}
