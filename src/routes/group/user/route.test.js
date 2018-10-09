const supertest = require('supertest')
const server = require('../../../server')
afterAll(() => {
  server.close()
})
test('GET /groups/:id/users', async () => {
  const response = await supertest(server).get('/groups/1/users')
  expect(response.status).toBe(200)
  expect(response.body).toMatchObject({
    code: 0,
    payload: {}
  })
})

test('POST /groups/:id/users', async () => {
  const response = await supertest(server).post('/groups/1/users').send({user_name: 'group'})
  expect(response.status).toBe(200)
  expect(response.body).toMatchObject({
    code: 0,
    payload: {
      user_id: expect.stringMatching(/^\d+$/)
    }
  })
})
