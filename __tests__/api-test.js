const request = require('supertest');
const app =require('../new-server');//when in parent directory
const {test,expect} =require('@jest/globals')

test('array of quotes',  async function(){
let result = await request(app).get('/api/v1/quotes')
expect(result).toBeDefined()
})
