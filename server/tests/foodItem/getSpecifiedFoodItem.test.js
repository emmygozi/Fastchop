import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;


describe('GET /:ID', () => {
  let urlId;

  const exec = async () => {
    try {
      return await chai.request(app)
        .get(`/api/v1/fooditem/${urlId}`);
    } catch (err) { throw err.message; }
  };


  afterEach(() => {
    urlId = 3;
  });

  it('should return a failure status 400 is not a number', async () => {
    try {
      urlId = 'd';
      const res = await exec();
      expect(res.status).to.equal(400);
    } catch (err) {
      throw err.message;
    }
  });


  it('should return a failure status 404 if ID is not found', async () => {
    try {
      urlId = 100999;

      const res = await exec();
      expect(res.status).to.equal(404);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a success status 200', async () => {
    try {
      const res = await exec();
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
    } catch (err) {
      throw err.message;
    }
  });
});
