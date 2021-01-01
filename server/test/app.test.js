/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const {expect} = require('chai');
const app = require('../app');
const supertest = require('supertest');

describe('GET /apps Endpoint', ()=> {
    it('should return an array of apps', ()=>{
        return supertest(app)
                .get('/apps')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf.at.least(1);
                    const App = res.body[0];
                    expect(App).to.include.all.keys(
                        "App" , "Category" , "Rating", "Genres"
                    )
                })

    })
    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
                .get('/apps')
                .query({sort : 'invalid'})
                .expect(400, 'sort must be one of rating or app')
    })
    it('should sort by app' , () => {
        return supertest(app)
                .get('/apps')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    let sorted = true ;

                    let i = 0 ;

                    while(i < res.body,length -1){
                        const appAtI = res.body[i];
                        const appAtIplus1 = res.body[i+1];
                        if(appAtIplus1.app < appAtI.app){
                            sorted = false;
                            break;
                        }
                        i++;
                    }
                    expect(sorted).to.be.true;
                })
    })
})