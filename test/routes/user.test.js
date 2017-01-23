const {get, post, put} = require('../supertest'),
  co = require('co'),
  usersModel = require('../../models/usersModel'),
  should = require('should'),
  debug = require('debug')('myapp');

const test = () => {
  let data, id;
  describe('用户管理单元测试', () => {
    before(done => {
      co(function*() {
        data = yield usersModel.find().exec();
        yield usersModel.remove();
        const newData = [
          {name: 'aaa', age: 20, paw: 'user1'},
          {name: 'bbb', age: 21, paw: 'user2', address: {province: '浙江', city: '杭州'}},
          {name: 'ccc', age: 22, paw: 'user3', info: [{school: '小学', time: 6}, {school: '中学', time: 3}]}
        ];
        yield usersModel.create(newData);
        const res = yield usersModel.findOne({name: 'aaa'}).exec();
        id = res._id;
      }).then(done, done);
    });

    after(done => {
      co(function*() {
        yield usersModel.remove();
        const arr = data.map(val => {
          const obj = {};
          ['name', 'paw', 'age', 'address', 'info'].forEach(key => obj[key] = val[key]);
          return obj;
        });
        yield usersModel.create(arr);
      }).then(done, done);
    });

    it.skip('列表查询', done => {
      get('/user')
        .expect(200)
        .end( (err, res) => {
          debug(res);
          done();
        });
    });

    it('单个查询', done => {
      get(`/user/${id}`)
        .expect(200)
        .end( (err, res) => {
          res.body.users.name.should.eql('aaa');
          done();
        });
    });

    it('创建用户', done => {
      const body = {
        User: {
          name: 'ddd',
          age: 30
        }
      };
      post('/user', body)
        .expect(200)
        .end( (err, res) => {
          co(function*() {
            const res = yield usersModel.find().exec();
            res.length.should.eql(4);
            done();
          }).catch( err => {
            debug(err);
            done();
          });
        });
    });

    it('修改用户', done => {
      const body = {
        User: {
          name: 'abc',
          age: 40
        }
      };
      put(`/user/${id}`, body)
        .expect(200)
        .end( (err, res) => {
          co(function*() {
            const user = yield usersModel.findOne({'_id': id}).exec();
            user.name.should.eql('abc');
            user.age.should.eql(40);
            done();
          }).catch(err => {
            debug(err);
            done();
          });
        });
    });


  });

};

test();