const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

const server = supertest(app);

describe('Methods Check', () => {
  it('Delete Acronym', function (done) {
    this.timeout(15000);
    server
      .delete('/api/v1/acronym/test')
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(200);
        if (err) done(err);
        done();
      });
  });
  it('Add Acronym', function (done) {
    this.timeout(15000);
    server
      .post('/api/v1/acronym')
      .send({
        acronym: 'test',
        description: 'test description',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        if (err) done(err);
        done();
      });
  });
  it('Update Acronym', function (done) {
    this.timeout(15000);
    server
      .put('/api/v1/acronym/test')
      .send({
        description: 'new test description',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        if (err) done(err);
        done();
      });
  });
  it('Get Acronyms', function (done) {
    this.timeout(15000);
    server.get('/api/v1/acronym').end((err, res) => {
      expect(res.status).to.equal(200);
      if (err) done(err);
      done();
    });
  });
  it('Get Single Acronym', function (done) {
    this.timeout(15000);
    server.get('/api/v1/acronym/10M').end((err, res) => {
      expect(res.status).to.equal(200);
      if (err) done(err);
      done();
    });
  });
  it('Get Random Acronyms', function (done) {
    this.timeout(15000);
    server.get('/api/v1/random/2').end((err, res) => {
      expect(res.status).to.equal(200);
      if (err) done(err);
      done();
    });
  });
});
