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
        .get('/api/v1/users/10/orders/')
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
        .get('/api/v1/users/10/orders/')
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

  it('should return a failure status 400', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/users/10/orders/')
        .set('x-auth-token', generateAuthToken(uniqueId, userEmail, userRole));
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const sucessMessage = 'No orders yet for this user';
      expect(res.body).to.have.property('message', sucessMessage);
    } catch (err) {
      throw err.message;
    }
  });

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

  it('should return a sucess 200', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/orders')
        .set('x-auth-token', generateAuthToken(uniqueId, userEmail, userRole));
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const sucessMessage = 'Retrieved all orders';
      expect(res.body).to.have.property('message', sucessMessage);
    } catch (err) {
      throw err.message;
    }
  });
});

describe('POST API/V1/ORDERS/', () => {
  let menuid;
  let quantity;

  const [uniqueId, userEmail, userRole] = ['3', 'admin2@fastchop.com', 'admin'];


  const exec = async () => {
    try {
      return await chai.request(app)
        .post('/api/v1/orders')
        .set('x-auth-token', generateAuthToken(uniqueId, userEmail, userRole))
        .send({
          menuid, quantity
        });
    } catch (err) { throw err.message; }
  };

  beforeEach(() => {
    menuid += 1;
    quantity = '70';
  });

  it('should return a success status 200', async () => {
    try {
      const res = await exec();
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for wrong food item name length 400', async () => {
    try {
      menuid = 'a';

      const res = await exec();
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
    } catch (err) {
      throw err.message;
    }
  });


  it('should return a failure status for whitespace character', async () => {
    try {
      menuid = '      ';

      const res = await exec();
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const errorMessage = 'One or more fields contained only whitespace';
      expect(res.body).to.have.property('message', errorMessage);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for incomplete query 400', async () => {
    try {
      menuid = '';

      const res = await exec();
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
    } catch (err) {
      throw err.message;
    }
  });


  it('Acess denied. Invalid token', async () => {
    try {
      const status = 'approved';
      const res = await chai.request(app)
        .put('/api/v1/orders')
        .set('x-auth-token', 'xxxxxxxxxxxxxxxx')
        .send({
          status
        });
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
    } catch (err) {
      throw err.message;
    }
  });

  it('Acess denied. No token provided', async () => {
    try {
      const status = 'approved';
      const res = await chai.request(app)
        .put('/api/v1/orders')
        .set('x-auth-token', '')
        .send({
          status
        });
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
    } catch (err) {
      throw err.message;
    }
  });
});

