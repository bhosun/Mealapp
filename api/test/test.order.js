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

/*
// Test to get orders /GET
*/

describe('Get /orders', () => {
    it('should get all Orders', (done) => {
        chai
        .request(app)
        .get('/api/v1/orders')
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
            id: 1,
            food: 'amala + Efo-Riro + Peppered Drumstick',
            quantity: 2,
            price: 2000
        }
        chai
        .request(app)
        .post('/api/v1/orders')
        .send(meal)
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
            id: 1,
            address: '32 Tokunbo Street Ijebu',
            food: 'amala + Efo-Riro + Peppered Drumstick',
            quantity: 2,
            price: 2000
        }
        chai
        .request(app)
        .post('/api/v1/orders')
        .send(meal)
        .end((err, res) => {
            res.should.have.property('status', 201);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('success');
            res.body.data.should.have.property('id')
            res.body.data.should.have.property('address')
            res.body.data.should.have.property('food')
            res.body.data.should.have.property('price')
        done();    
        });
    });
});

/*
// test the Put Route
*/

describe('Put /orders/:id', () => {
    it('it should Update an order', (done) => {
        const orderId = Number(order.orders[0].id);
        const updateOrder = {id: 1,
            address: '32 Tokunbo Street Ijebu',
            food: 'amala + Efo-Riro + Peppered Drumstick',
            quantity: 2,
            price: 2000
            }
        chai
        .request(app)
        .put(`/api/v1/orders/${orderId}`)
        .send(updateOrder)
        .end((err, res) => {
            res.should.have.property('status', 200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('success');
            res.body.data.should.have.property('address').eql('32 Tokunbo Street Ijebu');
            res.body.data.should.have.property('price').eql(2000);
            res.body.data.should.have.property('food').eql('amala + Efo-Riro + Peppered Drumstick');
        done()  
        });
    });

    it('it should return error for invalid Id', (done) => {
        const orderId = 'o';
        const updateOrder = {id: 1,
            address: '32 Tokunbo Street Ijebu',
            food: 'amala + Efo-Riro + Peppered Drumstick',
            quantity: 2,
            price: 2000
            }
        chai
        .request(app)
        .put(`/api/v1/orders/${orderId}`)
        .send(updateOrder)
        .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Please make sure you input a Number');
        done();    
        });
    });
});;