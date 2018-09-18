import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('PUT /', () => {
  let name;
  let description;
  let price;
  let imageurl;
  let urlId;

  const exec = async () => {
    try {
      return await chai.request(app)
        .put(`/api/v1/foodItem/${urlId}`)
        .send({
          name, description, price, imageurl
        });
    } catch (err) { throw err.message; }
  };

  beforeEach(() => {
    name = 'myItem1';
    description = 'a description message here';
    price = '700';
    imageurl = 'http://sometesturl';
    urlId = 3;
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
        .put(`/api/v1/foodItem/${urlId}`)
        .send({
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for invalid ID 400', async () => {
    try {
      urlId = 'E';

      const res = await exec();
      expect(res.status).to.equal(400);
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

