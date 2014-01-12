
var Emitter = require('events').EventEmitter;
var inherit = require('util').inherits;
var parallel = require('parallel-ware');

/**
 * Expose `Leader`.
 */

module.exports = Leader;

/**
 * Initialize a `Leader` instance.
 */

function Leader () {
  if (!(this instanceof Leader)) return new Leader();
  this.middleware = parallel();
}

/**
 * Inherit from `Emitter`.
 */

inherit(Leader, Emitter);

/**
 * Sets the `max` amount of middleware executing concurrently.
 *
 * @param {Number} max
 * @return {Leader}
 */

Leader.prototype.concurrency = function (max) {
  this.middleware.concurrency(max);
  return this;
};

/**
 * Adds a middleware plugin.
 *
 * @pram {Object} plugin
 * @return {Leader}
 */

Leader.prototype.use = function (plugin) {
  if (typeof plugin !== 'object') throw new Error('plugin must be an object.');
  if (typeof plugin.wait !== 'function') throw new Error('plugin.wait must be a function.');
  if (typeof plugin.fn !== 'function') throw new Error('plugin.wait must be a function.');
  return this.when(plugin.wait, plugin.fn);
};

/**
 * Adds a middleware `fn` with a `wait` function.
 *
 * @pram {Function} wait [optional]
 * @param {Function} fn
 * @return {Leader}
 */

Leader.prototype.when = function (wait, fn) {
  this.middleware.when(wait, fn);
  this.proxy(fn);
  return this;
};

/**
 * Proxy event from the fn.
 *
 * @param {Function} fn
 * @return {Leader}
 */

Leader.prototype.proxy = function (fn) {
  var self = this;
  if (fn instanceof Emitter) {
    var name = fn.name || fn.prototype.name || 'unknown';
    name = name.toLowerCase();
    events(fn, function (event, args) {
      self.emit(name + ':' + event, args);
    });
  }
  return this;
};

/**
 * Populate information about a `person`.
 *
 * @param {Object} person
 * @param {Function} callback
 */

Leader.prototype.populate = function (person, callback) {
  if (typeof person !== 'object') throw new Error('Person must be an object.');
  var context = {};
  this.middleware.run(person, context, callback);
  return this;
};