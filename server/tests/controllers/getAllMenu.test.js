import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import generateAuthToken from '../../helpers/generateAuthToken';


chai.use(chaiHttp);
const { expect } = chai;


describe('GET ALL ORDERS /', () => {
  const [uniqueId, userEmail, userRole] = ['3', 'admin2@fastchop.com', 'admin'];
  const name = 'somename';
  const description = 'a description message here';
  const price = '700';
  const imageurl = 'http://sometesturl';


  it('Acess denied. Invalid token', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/orders')
        .set('x-auth-token', 'xxxxxxxxxxxxxxxx')
        .send({
          name, description, price, imageurl
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
    } catch (err) {
      throw err.message;
    }
  });

  it('Acess denied. No token provided', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/orders')
        .set('x-auth-token', '')
        .send({
          name, description, price, imageurl
        });
      expect(res.status).to.equal(401);
      expect(res.body).to.be.an('object');
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a success status 200', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/orders')
        .set('x-auth-token', generateAuthToken(uniqueId, userEmail, userRole));
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

