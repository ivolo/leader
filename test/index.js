
var assert = require('assert');
var Leader = require('..');

describe('leader', function () {

  it('should allow adding plugins', function (done) {
    var leader = Leader()
      .when(hasEmail, domain)
      .learn({ email: 'ilya@segment.io'}, function (err, person) {
        assert(!err);
        assert(person);
        assert(person.domain === 'segment.io');
        done();
      });
  });

  it('should wait for information to become available', function (done) {
    var leader = Leader()
      .when(hasEmail, domain)
      .when(hasDomain, crunchbase)
      .learn({ email: 'ilya@segment.io'}, function (err, person) {
        assert(!err);
        assert(person);
        assert(person.company.crunchbase === 'http://www.crunchbase.com/search?query=segment.io');
        done();
      });
  });
});


function hasEmail (person) {
  return person.email != null;
}

function domain (person, context, next) {
  var tokens = person.email.split('@');
  person.domain = tokens[1];
  next();
}

function hasDomain (person) {
  return person.domain != null;
}

function crunchbase (person, context, next) {
  person.company = {
    crunchbase: 'http://www.crunchbase.com/search?query=' + person.domain
  };
  next();
}