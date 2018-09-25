import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Something Failed Status 500', () => {
  it('should return something failed status 500', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/menu/%');
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
    } catch (err) {
      throw err.message;
    }
  });
});

