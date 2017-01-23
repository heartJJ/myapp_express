const supertest = require('supertest'),
  app = require('../app.js');

const agent = supertest.agent(app);

exports.get = (url, query = {}) => {
  return agent.get(url)
    .type('application/x-www-form-urlencoded')
    .query(query);
};

exports.post = (url, body={}) => {
  return agent.post(url)
    .type('application/x-www-form-urlencoded')
    .send({'Body': JSON.stringify(body)});
};

exports.put = (url, body={}) => {
  return agent.put(url)
    .type('application/x-www-form-urlencoded')
    .send({'Body': JSON.stringify(body)});
};

exports.patch = (url, body={}) => {
  return agent.patch(url)
    .type('application/x-www-form-urlencoded')
    .send({'Body': JSON.stringify(body)});
};