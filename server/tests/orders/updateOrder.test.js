import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('PUT /', () => {
  let userid;
  let mealid;
  let status;
  let urlId;

  const exec = async () => {
    try {
      return await chai.request(app)
        .put(`/api/v1/orders/${urlId}`)
        .send({
          userid, mealid, status
        });
    } catch (err) { throw err.message; }
  };

  beforeEach(() => {
    userid = 1;
    mealid = 3;
    status = 1;
    urlId = 1;
  });

  it('should return a success status 200', async () => {
    try {
      const res = await exec();
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for empty request', async () => {
    try {
      chai.request(app)
        .put(`/api/v1/orders/${urlId}`)
        .send({
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for string value 400', async () => {
    try {
      userid = 'a';

      const res = await exec();
      expect(res.status).to.equal(400);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for invalid ID 401', async () => {
    try {
      urlId = 'E';

      const res = await exec();
      expect(res.status).to.equal(401);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a not found status 404', async () => {
    try {
      urlId = 10000;

      const res = await exec();
      expect(res.status).to.equal(404);
    } catch (err) {
      throw err.message;
    }
  });
});

