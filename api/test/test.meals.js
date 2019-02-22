import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
import dummyData from '../utils/dummyData';

chai.use(chaiHttp);
const should = chai.should();
// TESTS

/*
// Test to get meals /GET
*/

describe('Get /meals', () => {
    it('should get all Meals', (done) => {
        chai
        .request(app)
        .get('/api/v1/meals')
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
            id: 1,
            size: 'large',
            price: '300'
        }
        chai
        .request(app)
        .post('/api/v1/meals')
        .send(meal)
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
            id: 1,
            name: 'Amala',
            size: 'large',
            price: '300'
        }
        chai
        .request(app)
        .post('/api/v1/meals')
        .send(meal)
        .end((err, res) => {
            res.should.have.property('status', 201);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('success');
            res.body.data.should.have.property('id')
            res.body.data.should.have.property('name')
            res.body.data.should.have.property('size')
            res.body.data.should.have.property('price')
        done();    
        });
    });
});

/*
// Test the Get /:id route
*/

describe('get /meals/:id', () => {
    it('should get a meal with a given id', (done) => {
        const mealId = Number(dummyData.meals[0].id);
        chai
        .request(app)
        .get(`/api/v1/meals/${mealId}`)
        .end((err, res) => {
            res.should.have.property('status', 200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('success');
            res.body.data.should.have.property('id').eql(mealId);
            res.body.data.should.have.property('name')
            res.body.data.should.have.property('size')
            res.body.data.should.have.property('price')
        done();    
        });
    });

    it('should throw an error when a number isnt passed', (done) => {
        const mealId = 'o';
        chai
        .request(app)
        .get(`/api/v1/meals/${mealId}`)
        .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('error');
            res.body.should.have.property('data').eql('Your id is not a number! it must be a number');  
        done();
        });
    });
});

/*
// test the Put Route
*/

describe('Put /meal/:id', () => {
    it('it should update a book by given Id', (done) => {
        const mealId = Number(dummyData.meals[0].id);
        const updateMeal = {name: 'Cocoa ati Ewa',
                            price: '900',
                            size: 'medium'
                        }
        chai
        .request(app)
        .put(`/api/v1/meals/${mealId}`)
        .send(updateMeal)
        .end((err, res) => {
            res.should.have.property('status', 201);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('success');
            res.body.data.should.have.property('name').eql('Cocoa ati Ewa');
            res.body.data.should.have.property('price').eql('900');
            res.body.data.should.have.property('size').eql('medium');
        done()  
        });
    });

    it('it should return error for invalid Id', (done) => {
        const mealId = 'o';
        const updateMeal = {name: 'Cocoa ati Ewa',
                            price: '900',
                            size: 'medium'
                        }
        chai
        .request(app)
        .put(`/api/v1/meals/${mealId}`)
        .send(updateMeal)
        .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Please make sure you input a Number');
        done();    
        });
    });
});;

/*
// Test the Delete Route
*/

describe('Delete /meals/:id', () => {
    it('should delete an id', (done) => {
        const mealId = Number(dummyData.meals[0].id);
        chai.
        request(app)
        .delete(`/api/v1/meals/${mealId}`)
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
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql(`cannot delete meal with id ${mealId} now`);
        done();
        });
    });
});