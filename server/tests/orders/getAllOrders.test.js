import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /', () => {
  it('should return a success status 200', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/orders');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
    } catch (err) {
      throw err.message;
    }
  });
});

