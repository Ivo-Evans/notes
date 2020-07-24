const test = require("tape")

test('init', (t) => {
    let num = 2;
    t.equal(num, 2, "Should return 2")
    t.notEqual(num, 3, "should not equal another number")
    t.test('other init', (t) => {
        t.equal(String(5), '5', '5 can be coerced into a string')
        t.notEqual('5', 5, '5 has to be coerced into a string')
        t.end()
    })
    t.end()
})