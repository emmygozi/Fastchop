import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /', () => {
  let name;
  let email;
  let password;

  function uniqueEmail() {
    let text = '';
    const possible = 'ABCDEabcdeuvwyz0123456789';

    for (let i = 0; i < 5; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  const exec = async () => {
    try {
      return await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name, email, password
        });
    } catch (err) { throw err.message; }
  };

  beforeEach(() => {
    name = 'testname';
    email = 'testmail@yahoo.com';
    password = '12345';
  });

  it('should return a success status 201', async () => {
    try {
      email = `${uniqueEmail()}@yahoo.com`;

      const res = await exec();
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const sucessMessage = 'You have sucessfully signed up';
      expect(res.body).to.have.property('message', sucessMessage);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for inserting a string less than 3 characters 400', async () => {
    try {
      name = 'a';

      const res = await exec();
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for inserting a duplicate string 409', async () => {
    try {
      await exec();

      const res = await exec();
      expect(res.status).to.equal(409);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const errorMessage = 'A user with same email is already registered';
      expect(res.body).to.have.property('message', errorMessage);
    } catch (err) {
      throw err.message;
    }
  });


  it('should return a failure status for inserting a whitespace characters 400', async () => {
    try {
      name = '      ';

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
      name = '';

      const res = await exec();
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const errorMessage = 'Bad request, no field should not be missing';
      expect(res.body).to.have.property('message', errorMessage);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for not an email 400', async () => {
    try {
      email = 'addd';

      const res = await exec();
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const errorMessage = 'Email format must be similar to mail@something.com';
      expect(res.body).to.have.property('message', errorMessage);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for empty request', async () => {
    try {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          const errorMessage = 'Empty request';
          expect(res.body).to.have.property('message', errorMessage);
        });
    } catch (err) {
      throw err.message;
    }
  });
});

