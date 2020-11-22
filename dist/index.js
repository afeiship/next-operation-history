/*!
 * name: @jswork/next-operation-history
 * description: Operation history for next.
 * homepage: https://github.com/afeiship/next-operation-history
 * version: 1.0.0
 * date: 2020-11-22 14:14:52
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxRemove = nx.remove || require('@jswork/next-remove');
  var nxHash = nx.hash || require('@jswork/next-hash');
  var NxLocalStorage = nx.LocalStorage || require('@jswork/next-local-storage');
  var NxSessionStorage = nx.SessionStorage || require('@jswork/next-session-storage');

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
        set: function (inValue) {
          this.store.set('index', inValue);
        },
        get: function () {
          return this.store.get('index');
        }
      },
      data: {
        set: function (inValue) {
          this.store.set('data', inValue);
        },
        get: function () {
          return this.store.get('data') || [];
        }
      },
      length: function () {
        return this.data.length;
      },
      next: function () {
        var current = this.index;
        return current < this.options.max && current >= 0 && current < this.last();
      },
      prev: function () {
        return this.index > 0;
      }
    },
    methods: {
      init: function (inOptions) {
        var options = (this.options = nx.mix(null, DEFAULT_OPTIONS, inOptions));
        var prefix = options.prefix + '__operation_history';
        this.store =
          options.engine === 'local' ? new NxLocalStorage(prefix) : new NxSessionStorage(prefix);

        this.reset();
      },
      reset: function () {
        this.index = this.options.index;
        this.data = this.options.data;
      },
      flush: function (inData) {
        this.data = inData.slice(-this.options.max);
        this.index = this.last();
      },
      last: function () {
        return this.length - 1;
      },
      at: function (inIndex) {
        var index = inIndex || this.index;
        return this.data[index] || null;
      },
      get: function (inId) {
        var data = this.data;
        var item = data.find(function (value) {
          return value.id === inId;
        });
        return item;
      },
      gets: function () {
        return this.data;
      },
      forward: function () {
        var current = this.index;
        if (this.next) {
          this.index = current + 1;
        }
      },
      back: function () {
        var current = this.index;
        if (this.prev) {
          this.index = current - 1;
        }
      },
      go: function (inIndex) {
        if (inIndex >= 0) {
          var index = inIndex >= this.options.max ? this.last() : inIndex;
          this.index = index;
        } else {
          var index = this.index + inIndex;
          this.index = index >= 0 ? index : 0;
        }
      },
      add: function (inData) {
        var data = this.data;
        data.push({ id: nxHash(inData), value: inData });
        this.flush(data);
      },
      del: function (inId) {
        var data = nxRemove(this.data, function (_, value) {
          return value.id === inId;
        });
        this.flush(data);
      },
      push: function (inData) {
        var shouldAdd = this.shouldAdd(inData);
        if (shouldAdd) {
          this.add(inData);
        }
        return shouldAdd;
      },
      replace: function (inData) {
        var data = this.data;
        var shouldAdd = this.shouldAdd(inData);
        if (shouldAdd) {
          if (data.length > 0) {
            data[data.length - 1].data = inData;
            this.flush(data);
          } else {
            this.push(inData);
          }
        }
        return shouldAdd;
      },
      shouldAdd: function (inData) {
        var last = this.data[this.last()];
        return !last || nxHash(last.value) !== nxHash(inData);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxOperationHistory;
  }
})();
