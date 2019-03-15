import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
import dummyData from '../utils/dummyData';
import order from '../utils/order';

chai.use(chaiHttp);
const should = chai.should();

                    /*
                    // TESTS
                    */
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
// Test to get orders /GET
*/

    describe('Get /orders', () => {
        it('should get all Orders', (done) => {
            chai
            .request(app)
            .get('/api/v1/orders')
            .set('authorization', CateToken)
            .end((err, res) => {
                res.should.have.property('status', 201);
                res.body.data.should.be.a('array');
            done();
            });
        });
    });

    /*
    // test to Post meals /Meals
    */

    describe('Post /order', () => {
        it('should not post an order without address of Buyer', (done) => {
            const meal = {
                order: 'amala + Efo-Riro + Peppered Drumstick',
                totalPrice: 456,
                quantity: 2
            }
            chai
            .request(app)
            .post('/api/v1/orders')
            .send(meal)
            .set('authorization', generatedToken)
            .end((err, res) => {
                res.should.have.property('status', 400);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('message').eql('fill in the right details');
            done();
            })
        })

        it('should Post an Order', (done) => {
            const meal = {
                order: 'amala + Efo-Riro + Peppered Drumstick',
                billing_address: 'akinde akin',
                totalPrice: 456,
                quantity: 2,
            }
            chai
            .request(app)
            .post('/api/v1/orders')
            .send(meal)
            .set('authorization', generatedToken)
            .end((err, res) => {
                res.should.have.property('status', 201);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.data.should.have.property('id')
                res.body.data.should.have.property('billing_address')
                res.body.data.should.have.property('totalPrice')
            done();    
            });
        });
    });

    /*
    // test the Put Route
    */

    describe('Put /orders/:id', () => {
        it('it should Update an order', (done) => {
            const orderId = 1
            const updateOrder = {
                id: 1,
                billing_address: '32 Tokunbo Street Ijebu',
                order: 'amala + Efo-Riro + Peppered Drumstick',
                quantity: 2,
                totalPrice: 2000
                }
            chai
            .request(app)
            .put(`/api/v1/orders/${orderId}`)
            .send(updateOrder)
            .set('authorization', generatedToken)
            .end((err, res) => {
                res.should.have.property('status', 200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
            done()  
            });
        });

        it('it should return error for invalid Id', (done) => {
            const orderId = 'o';
            const updateOrder = {
                billing_address: '32 Tokunbo Street Ijebu',
                order: 'amala + Efo-Riro + Peppered Drumstick',
                quantity: 2,
                totalPrice: 2000
                }
            chai
            .request(app)
            .put(`/api/v1/orders/${orderId}`)
            .send(updateOrder)
            .set('authorization', generatedToken)
            .end((err, res) => {
                res.should.have.property('status', 400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Please make sure you input a Number');
            done();    
            });
        });
    });
});    