import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /', () => {
  it('should return a success status 200', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/menu');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const sucessMessage = 'Retrieved all menus';
      expect(res.body).to.have.property('message', sucessMessage);
    } catch (err) {
      throw err.message;
    }
  });
});

describe('GET /:ID', () => {
  it('should return a success status 200', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/menu/1');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const sucessMessage = 'Retrieved specified menu';
      expect(res.body).to.have.property('message', sucessMessage);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status 404', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/menu/1004076');
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const failureMessage = 'The menu with the given ID was not found!';
      expect(res.body).to.have.property('message', failureMessage);
    } catch (err) {
      throw err.message;
    }
  });


  it('should return a failure status 400', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/menu/-1');
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const failureMessage = 'Given ID is not valid';
      expect(res.body).to.have.property('message', failureMessage);
    } catch (err) {
      throw err.message;
    }
  });
});

