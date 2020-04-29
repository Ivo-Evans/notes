const test = require('tape')
const request = require('supertest')
const express = require('express')

const app = express()

app.get('/user', (req, res) => {
    res.status(200).json({ name: 'john' })
})

test('can make simple get request to user route', t => {
    request(app)
        .get('/user')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '15')
        .expect(200)
        .then(res => {
            t.equal(res.status, 200, "returns a 200")
            t.equal(res.type, 'application/json', 'returns JSON')
            t.end()
        }) 
        .catch(err => {
            t.error(err)
            t.end()
        })
    })