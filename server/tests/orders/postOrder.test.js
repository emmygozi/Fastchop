import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /', () => {
  let userid;
  let mealid;
  let quantity;
  let status;

  const exec = async () => {
    try {
      return await chai.request(app)
        .post('/api/v1/orders')
        .send({
          userid, mealid, quantity, status
        });
    } catch (err) { throw err.message; }
  };

  beforeEach(() => {
    userid = '10';
    mealid = '10';
    quantity = '30';
    status = '0';
  });

  it('should return a success status 201', async () => {
    try {
      const res = await exec();
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for inserting a string 400', async () => {
    try {
      userid = 'a';

      const res = await exec();
      expect(res.status).to.equal(400);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for incomplete query 400', async () => {
    try {
      mealid = '';

      const res = await exec();
      expect(res.status).to.equal(400);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for not a number 400', async () => {
    try {
      mealid = 'addd';

      const res = await exec();
      expect(res.status).to.equal(400);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for empty request', async () => {
    try {
      chai.request(app)
        .post('/api/v1/foodItem')
        .send({
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    } catch (err) {
      throw err.message;
    }
  });
});

