const supertest = require('supertest')
const server = require('../../server')
afterAll(() => {
  server.close()
})
test('GET /groups', async () => {
  const response = await supertest(server).get('/groups')
  expect(response.status).toBe(200)
  expect(response.body).toMatchObject({
    code: 0,
    payload: {}
  })
})

test('POST /groups', async () => {
  const response = await supertest(server).post('/groups').send({group_name:'group'})
  expect(response.status).toBe(200)
  expect(response.body).toMatchObject({
    code: 0,
    payload: {
      group_id: expect.stringMatching(/^\d+$/)
    }
  })
})
