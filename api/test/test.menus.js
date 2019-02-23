import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
import dummyData from '../utils/dummyData';

chai.use(chaiHttp);
const should = chai.should();


/**
 * TESTS
 */

 /**
  * test for the get Menu Route
  */

describe('Get /menus', () => {
    it('should fetch all Menus', (done) => {
        chai
        .request(app)
        .get('/api/v1/menus')
        .end((err, res) => {
            res.should.have.property('status', 201);
            res.body.should.be.a('object');
        done();    
        });
    });
});

/**
 * Test for the Post Route
 */

describe('Post /meals', () => {
    it('should not post a menu without name of Menu', (done) => {
        const menu = {
            id: 1,
            price: '300'
        }
        chai
        .request(app)
        .post('/api/v1/menus')
        .send(menu)
        .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('error');
            res.body.should.have.property('message').eql('Input the Right Parameters');
        done();
        })
    })

    it('should Post a meal', (done) => {
        const menu = {
            id: 1,
            names: 'Amala + Ila-Alasepo + TurkeyBeef',
            price: '300'
        }
        chai
        .request(app)
        .post('/api/v1/menus')
        .send(menu)
        .end((err, res) => {
            res.should.have.property('status', 201);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('success');
            res.body.data.should.have.property('id')
            res.body.data.should.have.property('names')
            res.body.data.should.have.property('price')
        done();    
        });
    });
});