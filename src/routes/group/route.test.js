const supertest = require('supertest')
const app = require('../../server')
test('GET /groups', async () => {
  const response = await supertest(app.callback()).get('/groups')
  expect(response.status).toBe(200)
  expect(response.body).toMatchObject({
    code: 0,
    payload: {}
  })
})

test('POST /groups', async () => {
  const response = await supertest(app.callback()).post('/groups').send({group_name:'group'})
  expect(response.status).toBe(200)
  expect(response.body).toMatchObject({
    code: 0,
    payload: {
      group_id: expect.stringMatching(/^\d+$/)
    }
  })
})
