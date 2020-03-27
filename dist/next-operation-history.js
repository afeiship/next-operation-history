/*!
 * name: @feizheng/next-operation-history
 * description: Operation history for next.
 * url: https://github.com/afeiship/next-operation-history
 * version: 1.0.0
 * date: 2020-03-27 20:59:47
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxLocalStorage = nx.LocalStorage || require('@feizheng/next-local-storage');
  var NxSessionStorage = nx.SessionStorage || require('@feizheng/next-session-storage');
  var nxGuid = nx.guid || require('next-guid');

  var DEFAULT_OPTIONS = {
    max: 10,
    engine: 'local',
    prefix: 'nx',
    index: -1,
    data: []
  };

  var NxOperationHistory = nx.declare('nx.OperationHistory', {
    properties: {
      index: {
        set: function(inValue) {
          this.store.set('index', inValue);
        },
        get: function() {
          return this.store.get('index');
        }
      },
      data: {
        set: function(inValue) {
          this.store.set('data', inValue);
        },
        get: function() {
          return this.store.get('data') || [];
        }
      },
      next: function() {
        var current = this.index;
        return current < this.options.max && current >= 0 && current < this.last();
      },
      prev: function() {
        return this.index > 0;
      }
    },
    methods: {
      init: function(inOptions) {
        var options = (this.options = nx.mix(null, DEFAULT_OPTIONS, inOptions));
        var prefix = options.prefix + '__operation_history';
        this.store =
          options.engine === 'local'
            ? new NxLocalStorage(prefix)
            : new NxSessionStorage(prefix);

        this.reset();
      },
      reset: function() {
        this.index = this.options.index;
        this.data = this.options.data;
      },
      last: function() {
        return this.data.length - 1;
      },
      at: function(inIndex) {
        var index = inIndex || this.index;
        return this.data[index] || null;
      },
      set: function(inId, inData) {
        var data = this.data;
        var item = data.find(function(record) {
          return inId === record.id;
        });
        item.data = inData;
        this.data = data;
      },
      get: function(inId) {
        return this.data.find(function(record) {
          return inId === record.id;
        });
      },
      sets: function(inObject) {
        nx.forIn(
          inObject,
          function(key, value) {
            this.set(key, value);
          },
          this
        );
      },
      gets: function() {
        return this.data;
      },
      forward: function() {
        var current = this.index;
        if (this.next) {
          this.index = current + 1;
        }
      },
      back: function() {
        var current = this.index;
        if (this.prev) {
          this.index = current - 1;
        }
      },
      push: function(inData) {
        var data = this.data;
        data.push({ id: nxGuid(), data: inData });
        this.data = data.slice(-this.options.max);
        this.index = this.last();
      },
      replace: function(inData) {
        var data = this.data;
        if (data.length > 0) {
          data[data.length - 1].data = inData;
          this.data = data.slice(-this.options.max);
          this.index = this.last();
        } else {
          this.push(inData);
        }
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxOperationHistory;
  }
})();

//# sourceMappingURL=next-operation-history.js.map
