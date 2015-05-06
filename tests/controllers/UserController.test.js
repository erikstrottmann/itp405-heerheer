var chai  = require('chai');
var spies = require('chai-spies');

chai.use(spies);

var should = chai.should()
var expect = chai.expect;

var UserController = require('../../api/controllers/UserController');


describe("UserController", function() {
  describe("#logout", function() {
    it("should forget the user from the session", function() {
      var res = chai.spy.object(['redirect']);
      res.wantsJSON = false;
      var req = chai.spy.object([]);
      req.session = { me: 1};

      UserController.logout(req, res);

      expect(req.session.me).to.be.null;
    });

    it("should redirect to / for HTML-wanting browsers", function() {
      var res = chai.spy.object(['redirect']);
      res.wantsJSON = false;
      var req = chai.spy.object([]);
      req.session = { me: 1};

      UserController.logout(req, res);

      expect(res.redirect).to.have.been.called.once.with('/');
    });

    it("should return '200 OK' for JSON-wanting browsers", function() {
      var res = chai.spy.object(['ok']);
      var req = chai.spy.object([]);
      req.wantsJSON = true;
      req.session = { me: 1};

      UserController.logout(req, res);

      expect(res.ok).to.have.been.called.once;
    });
  });

  describe("#signup", function() {
    it("should fail if username and password are both null", function() {
      var res = chai.spy.object(['negotiate']);
      var param = chai.spy(function(key) {
        if (key == 'username') return null;
        if (key == 'password') return null;
        return null;
      });
      var req = { param: param };

      UserController.signup(req, res);

      expect(res.negotiate).to.have.been.called.once;
    });

    it("should fail if just username is null", function() {
      var res = chai.spy.object(['negotiate']);
      var req = {
        param: chai.spy(function(key) {
          if (key == 'username') return null;
          if (key == 'password') return 'laravel';
          return null;
        })
      };

      console.log(req);

      UserController.signup(req, res);

      expect(res.negotiate).to.have.been.called.once;
    });

    it("should fail if just password is null", function() {
      var res = chai.spy.object(['negotiate']);
      var param = chai.spy(function(key) {
        if (key == 'username') return 'david';
        if (key == 'password') return null;
        return null;
      });
      var req = { param: param };

      UserController.signup(req, res);

      expect(res.negotiate).to.have.been.called.once;
    });
  });
});
