import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chaiHttp);

 /*// TESTS */

// Should run first
describe('Meal', () => {
    let generatedToken = null;
    let CateToken = null;
    /**
     * Logins user to generate userToken before test
     */
    before('Login user to obtain auth token to be used in other operations', (done) => {
      const adminCredentials = {
        name: 'JemilaDavies',
        password: 'password'
      };
  
      chai
        .request(app)
        .post('/api/v1/user/login')
        .send(adminCredentials)
        .end((err, res) => {
            res.should.have.status(200);
            if (!err) {
                generatedToken = res.body.token;
            }
            done();
        });
    });

    before('Login Caterer to obtain the main token', (done) => {
        const catererDetails = {
            username: 'Dehinde',
            password: 'password'
        };

        chai
           .request(app)
           .post('/api/v1/caterer/login')
           .send(catererDetails)
           .end((err, res) => {
                res.should.have.status(200);
                if (!err) {
                    CateToken = res.body.token;
                }
                done();
           })
    })

/*
// Test to get meals /GET
*/

describe('Get /meals', () => {
    it('should get all Meals', (done) => {
        chai
        .request(app)
        .get('/api/v1/meals')
        .set('authorization', CateToken)
        .end((err, res) => {
            res.should.have.property('status', 200);
            res.body.data.should.be.a('array');
        done();
        });
    });
});

/*
// test to Post meals /Meals
*/

describe('Post /meals', () => {
    it('should not post a meal without a name Field', (done) => {
        const meal = {
            imagurl: "jbrbyhrbebhebhevgg"
        }
        chai
        .request(app)
        .post('/api/v1/meals')
        .send(meal)
        .set('authorization', CateToken)
        .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('error');
            res.body.should.have.property('data').eql('Input the Parameters Rightly');
        done();
        })
    })

    it('should Post a meal', (done) => {
        const meal = {
            name: 'Amala',
            imageurl: 'kvnjuhdvb'
        }
        chai
        .request(app)
        .post('/api/v1/meals')
        .send(meal)
        .set('authorization', CateToken)
        .end((err, res) => {
            res.should.have.property('status', 201);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('success');
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('name');
            res.body.data.should.have.property('imageurl');
        done();    
        });
    });
});

/*
// Test the Get /:id route
*/

describe('get /meals/:id', () => {
    it('should get a meal with a given id', (done) => {
        const mealId = 2;
        chai
        .request(app)
        .get(`/api/v1/meals/${mealId}`)
        .set('authorization', CateToken)
        .end((err, res) => {
            res.should.have.property('status', 200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('success');
            res.body.data.fulfillmentValue.should.have.property("name");
            res.body.data.fulfillmentValue.should.have.property("imageurl");
        done();    
        });
    });

    it('should throw an error when a number isnt passed', (done) => {
        const mealId = 'o';
        chai
        .request(app)
        .get(`/api/v1/meals/${mealId}`)
        .set('authorization', CateToken)
        .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('error');
            res.body.should.have.property('data').eql('Your id is not a number! it must be a number');  
        done();
        });
    });
});

// /*
// // test the Put Route
// */

describe('Put /meal/:id', () => {
    it('it should update a book by given Id', (done) => {
        const mealId = 1;
        const updateMeal = {name: 'Cocoa ati Ewa',
                            imageurl: 'jdcubeyhh'
                        }
        chai
        .request(app)
        .put(`/api/v1/meals/${mealId}`)
        .send(updateMeal)
        .set('authorization', CateToken)
        .end((err, res) => {
            res.should.have.property('status', 201);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('success');
        done()  
        });
    });

    it('it should return error for invalid Id', (done) => {
        const mealId = 'o';
        const updateMeal = {name: 'Cocoa ati Ewa',
                    imageurl: 'jdcubeyhh'
                }
        chai
        .request(app)
        .put(`/api/v1/meals/${mealId}`)
        .send(updateMeal)
        .set('authorization', CateToken)
        .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Please make sure you input a Number');
        done();    
        });
    });
});

    /*
    // Test the Delete Route
    */

    describe('Delete /meals/:id', () => {
        it('should delete an id', (done) => {
            const mealId = 1;
            chai.
            request(app)
            .delete(`/api/v1/meals/${mealId}`)
            .set('authorization', CateToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
            done();
            });
        });

        it('should not delete if Id is null', (done) => {
            const mealId = 'o';
            chai
            .request(app)
            .delete(`/api/v1/meals/${mealId}`)
            .set('authorization', CateToken)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
            });
        });
    });
});