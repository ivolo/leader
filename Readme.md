
# leader

  Learn more about a lead.

## Example

```js
var Leader = require('leader');

var leader = Leader()
  .use(constantContact())
  .use(facebook()))
  .use(twitter())
  .use(linkedin())
  .use(github());

leader.learn({ email: 'ilya@segment.io' }, function (err, context, person) {
  console.log(person);
});
```

Each leader plugin provides additional information about the person. This example plugin figures out if the person's email domain is interesting:

```js
function domain (person, context, next) {
  var tokens = person.email.split('@');
  person.domain = tokens[1];
  person.interesting = tokens[1].indexOf('gmail') === -1;
  next();
}
```

You can tell leader to wait to run your plugin until you know something about the person:

```js
function hasEmail (person) {
  return person.email !== null;
}

var leader = Leader()
  .when(hasEmail, domain);
```

## Plugins

Plugins for leader can:
- query LinkedIn for the company domain
- query Constant Contact or Rapleaf for demographic information
- search Google for their personal twitter
- search Google for the person's domain
- search Google for the person's personal blog or site

## API

#### Leader()

  Create a new Leader instance.

#### .use(plugin)

  Add a leader `plugin` which is an object that contains a `fn` plugin and a `wait` function, like so `{ wait: hasEmail, fn: domain }`

#### .when(wait, fn)

  Execute the leader plugin `fn` when the `wait` function returns true. Read more about wait functions in [parallel-ware](https://github.com/segmentio/parallel-ware).

#### .learn(person, callback)

  Runs a leader query on a custom `person` object.

#### .concurrency(max)

  Set the `max` amount of plugin running concurrently.

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

[Copyright (c) 2013](http://animals.ivolo.me) [Segment.io](https://segment.io) &lt;friends@segment.io&gt;