import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import generateAuthToken from '../../helpers/generateAuthToken';


chai.use(chaiHttp);
const { expect } = chai;


describe('GET ALL MENU /', () => {
  it('should return a success status 200', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/menu');
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

describe('GET MENU /:ID', () => {
  it('should return a success status 200', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/menu/1');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const sucessMessage = 'Retrieved specified menu';
      expect(res.body).to.have.property('message', sucessMessage);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status 404', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/menu/1004076');
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const failureMessage = 'The menu with the given ID was not found!';
      expect(res.body).to.have.property('message', failureMessage);
    } catch (err) {
      throw err.message;
    }
  });


  it('should return a failure status 400', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/menu/-1');
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const failureMessage = 'Given ID is not valid';
      expect(res.body).to.have.property('message', failureMessage);
    } catch (err) {
      throw err.message;
    }
  });
});

describe('POST API/V1/MENU/', () => {
  let name;
  let description;
  let price;
  let imageurl;

  const [uniqueId, userEmail, userRole] = ['3', 'admin2@fastchop.com', 'admin'];

  function uniqueMenuName() {
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
        .post('/api/v1/menu')
        .set('x-auth-token', generateAuthToken(uniqueId, userEmail, userRole))
        .send({
          name, description, price, imageurl
        });
    } catch (err) { throw err.message; }
  };

  beforeEach(() => {
    name = `${uniqueMenuName()}`;
    description = 'a description message here';
    price = '700';
    imageurl = 'http://sometesturl';
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

  it('should return a failure status for wrong food item name length 400', async () => {
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


  it('should return a failure status for whitespace character', async () => {
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
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for not a number 400', async () => {
    try {
      price = 'addd';

      const res = await exec();
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for empty request', async () => {
    try {
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-auth-token', generateAuthToken(uniqueId, userEmail, userRole))
        .send({
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for duplicate food item name 409', async () => {
    try {
      name = 'Pizza and pepperoni';
      const res = await exec();
      expect(res.status).to.equal(409);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
    } catch (err) {
      throw err.message;
    }
  });


  it('should return a failure status for no permission 401', async () => {
    try {
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-auth-token', generateAuthToken('56', 'bvuc9@yahoo.com', 'customer'))
        .send({
          name, description, price, imageurl
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('DELETE MENU /:ID', () => {
  const [uniqueId, userEmail, userRole] = ['3', 'admin3@fastchop.com', 'admin'];

  const name = 'somename';
  const description = 'a description message here';
  const price = '700';
  const imageurl = 'http://sometesturl';


  it('Acess denied. Invalid token', async () => {
    try {
      const res = await chai.request(app)
        .delete('/api/v1/menu/60')
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
        .delete('/api/v1/menu/60')
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


  it('should return a failure status 404', async () => {
    try {
      const res = await chai.request(app)
        .delete('/api/v1/menu/1004076')
        .set('x-auth-token', generateAuthToken(uniqueId, userEmail, userRole));
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const failureMessage = 'Given ID was not found';
      expect(res.body).to.have.property('message', failureMessage);
    } catch (err) {
      throw err.message;
    }
  });


  it('should return a failure status 400', async () => {
    try {
      const res = await chai.request(app)
        .delete('/api/v1/menu/-1')
        .set('x-auth-token', generateAuthToken(uniqueId, userEmail, userRole));
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const failureMessage = 'Given ID is not valid';
      expect(res.body).to.have.property('message', failureMessage);
    } catch (err) {
      throw err.message;
    }
  });
});


describe('PUT API/V1/MENU/:ID', () => {
  let name;
  let description;
  let price;
  let imageurl;

  const [uniqueId, userEmail, userRole] = ['3', 'admin2@fastchop.com', 'admin'];

  function uniqueMenuName() {
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
        .put('/api/v1/menu/1')
        .set('x-auth-token', generateAuthToken(uniqueId, userEmail, userRole))
        .send({
          name, description, price, imageurl
        });
    } catch (err) { throw err.message; }
  };

  beforeEach(() => {
    name = `${uniqueMenuName()}`;
    description = 'a description message here';
    price = '700';
    imageurl = 'http://sometesturl';
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

  it('should return a failure status for wrong food item name length 400', async () => {
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


  it('should return a failure status for whitespace character', async () => {
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
    } catch (err) {
      throw err.message;
    }
  });

  it('Acess denied. Invalid token', async () => {
    try {
      const res = await chai.request(app)
        .put('/api/v1/menu/1')
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
        .put('/api/v1/menu/1')
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


  it('should return a failure not found request 404', async () => {
    try {
      chai.request(app)
        .put('/api/v1/menu/5677')
        .set('x-auth-token', generateAuthToken(uniqueId, userEmail, userRole))
        .send({
          name, description, price, imageurl
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for not a number 400', async () => {
    try {
      price = 'addd';

      const res = await exec();
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for empty request', async () => {
    try {
      chai.request(app)
        .put('/api/v1/menu/1')
        .set('x-auth-token', generateAuthToken(uniqueId, userEmail, userRole))
        .send({
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
        });
    } catch (err) {
      throw err.message;
    }
  });
});

