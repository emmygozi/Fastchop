import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /', () => {
  let name;
  let description;
  let price;
  let imageurl;

  const exec = async () => {
    try {
      return await chai.request(app)
        .post('/api/v1/foodItem')
        .send({
          name, description, price, imageurl
        });
    } catch (err) { throw err.message; }
  };

  beforeEach(() => {
    name = 'myItem1';
    description = 'a description message here';
    price = 700;
    imageurl = 'http://sometesturl';
  });

  it('should return a success status 201', async () => {
    try {
      const res = await exec();
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for wrong food item name length 400', async () => {
    try {
      name = 'a';

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

  it('should return a failure status for duplicate food item name 409', async () => {
    try {
      name = 'Extra large pizza';

      const res = await exec();
      expect(res.status).to.equal(409);
    } catch (err) {
      throw err.message;
    }
  });
});

