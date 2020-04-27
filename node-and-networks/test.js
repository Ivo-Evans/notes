const jwt = require('jsonwebtoken')
const payload = {
    user: "user mcuserson",
    loggedIn: true, 
}
const options = {
    expiresIn: '1h' // you can also use seconds if you like. fyi the jwt standard uses ms since the epoch; this library abstracts away from that
}
secret = process.env.SECRET || "ghw43u2332gher4w3pgnsre" // for example purposes


let token = jwt.sign(payload, secret, options)
let decodedToken = Buffer.from(token, 'base64').toString()

console.log(decodedToken);

console.log(token);
