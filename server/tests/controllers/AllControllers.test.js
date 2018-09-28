import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import generateAuthToken from '../../helpers/generateAuthToken';


chai.use(chaiHttp);
const { expect } = chai;

describe('AUTHORIZE USER TOKEN /', () => {
  const name = 'somename';
  const description = 'a description message here';
  const price = '700';
  const imageurl = 'http://sometesturl';

  it('Acess denied. Invalid token', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v1/menu')
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
        .post('/api/v1/menu')
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
});


describe('POST API/V1/AUTH/LOGIN /', () => {
  let name;
  let email;
  let password;


  const exec = async () => {
    try {
      return await chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email, password
        });
    } catch (err) { throw err.message; }
  };

  beforeEach(() => {
    email = 'admin2@fastchop.com';
    password = '12345';
  });

  it('should return a success status 200', async () => {
    try {
      const res = await exec();
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const sucessMessage = 'Logged on to site';
      expect(res.body).to.have.property('message', sucessMessage);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for inserting a string less than 3 characters 400', async () => {
    try {
      password = 'a';

      const res = await exec();
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const errorMessage = 'Fields length must not be less than three characters';
      expect(res.body).to.have.property('message', errorMessage);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for an invalid email or password string 400', async () => {
    try {
      email = 'akakakkkakkakaka@ppappxhhs.com';
      const res = await exec();
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const errorMessage = 'Invalid email or password';
      expect(res.body).to.have.property('message', errorMessage);
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a failure status for an invalid email or password string 400', async () => {
    try {
      password = 'akakakkkakkakaka@ppappxhhshdjjdp39en39939dddjjd8*com';
      const res = await exec();
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      const errorMessage = 'Invalid email or password';
      expect(res.body).to.have.property('message', errorMessage);
    } catch (err) {
      throw err.message;
    }
  });


  it('should return a failure status for inserting a whitespace characters 400', async () => {
    try {
      email = '      ';

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
      email = '';

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
        .post('/api/v1/auth/login')
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

  it('should return a failure fields are more than required', async () => {
    try {
      name = 'name';
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          name,
          email,
          password,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          const errorMessage = 'Fields are more than required';
          expect(res.body).to.have.property('message', errorMessage);
        });
    } catch (err) {
      throw err.message;
    }
  });
});


describe('POST API/V1/AUTH/SIGNUP/', () => {
  let name;
  let email;
  let password;
  let address;
  let phone;
  let extrafield;

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
          name, email, password, address, phone
        });
    } catch (err) { throw err.message; }
  };

  beforeEach(() => {
    name = 'testname';
    email = 'testmail@yahoo.com';
    password = '1234567';
    address = 'a rndom adresss on the street jdjjd';
    phone = '10292837465';
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

  it('should return a failure fields are more than required', async () => {
    extrafield = '12345';

    try {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name,
          email,
          password,
          address,
          phone,
          extrafield
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          const errorMessage = 'Fields are more than required';
          expect(res.body).to.have.property('message', errorMessage);
        });
    } catch (err) {
      throw err.message;
    }
  });
});

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

