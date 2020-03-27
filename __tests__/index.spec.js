(function() {
  var nx = require('@feizheng/next-js-core2');
  var NxOperationHistory = require('../src/next-operation-history');

  describe('NxOperationHistory.methods', function() {
    test('init', function() {
      var data = {
        key: 1,
        value: 2
      };
      expect(!!data).toBe(true);
    });
  });
})();
