import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chaiHttp);
const should = chai.should();


/**
 * TESTS
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

    /**
     * test for the get Menu Route
     */

    describe('Get /menus', () => {
        it('should fetch all Menus', (done) => {
            chai
            .request(app)
            .get('/api/v1/menus')
            .set('authorization', generatedToken)
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

    describe('Post /menus', () => {
        it('should not post a menu without name of Menu', (done) => {
            const menu = {
                price: '300'
            }
            chai
            .request(app)
            .post('/api/v1/menus')
            .send(menu)
            .set('authorization', CateToken)
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
                names: 'Amala + Ila-Alasepo + TurkeyBeef',
                price: 300
            }
            chai
            .request(app)
            .post('/api/v1/menus')
            .send(menu)
            .set('authorization', CateToken)
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
});