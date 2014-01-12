
# leader

  Learn more about a person starting with just their email address.

## Example

```js
var Leader = require('leader');

var cc = require('leader-constant-contact');
var facebook = require('leader-facebook');
var twitter = require('leader-twitter');
var linkedin = require('leader-linkedin');
var github = require('leader-github')

var leader = Leader()
  .when(cc.wait(), cc.fn())
  .when(facebook.wait(), facebook.fn())
  .when(twitter())
  .when(linkedin())
  .when(github());

leader.learn({ email: 'ilya@segment.io' }, function (err, context, person) {
  // ..
});
```

### Using Wait Functions

A [wait](https://github.com/segmentio/parallel-ware) function allows you to ask leader to not run a specific middleware until a piece of information becomes available by another plugin. For example,

```js
function uid (context, person) {
  return person.facebook && person.facebook.uid;
}

function facebook (context, person, next) {
  facebook.user(person.facebook.uid, function (err, user) {
    if (err) return next(err);
    person.facebook.friends = user.friends.length;
    next();
  });
}

var leader = Leader()
  .use(uid, facebook);

leader.run(function (err, context, person) {
  // ..
});
```

## API

#### Leader()

  Create a new Leader instance.

#### .use(middleware)

  Add a leader `middleware` which is an object that contains a `fn` middleware and an optional `wait` function, like so `{ fn: fn, wait: wait }`

#### .use([wait], fn)

  Add a leader middleware `fn`, with an optional [wait](https://github.com/segmentio/parallel-ware) function.

#### .email(email, callback)

  Runs a leader query on an `email`.

#### .run(person, callback)

  Runs a leader query on a custom `person` object.

#### .concurrency(max)

  Set the `max` amount of middleware running concurrently.

## License

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

[Copyright (c) 2013](https://animals.ivolo.me) [Segment.io](https://segment.io) &lt;friends@segment.io&gt;
