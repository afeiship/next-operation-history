(function() {
  var nx = require('@feizheng/next-js-core2');
  var NxOperationHistory = require('../src/next-operation-history');

  describe('NxOperationHistory.methods', function() {
    test('api: add/reset', function() {
      var operationHistory = new NxOperationHistory({ prefix: 'nx', max: 10 });
      operationHistory.add({ name: 'abc', age: 102 });
      operationHistory.add({ age: 102, name: 'abc' });
      var res = operationHistory.data;
      expect(res.length).toBe(2);

      operationHistory.reset();
      var res2 = operationHistory.data;
      expect(res2).toEqual([]);
    });

    test('api: push should add only the diff object', () => {
      var operationHistory = new NxOperationHistory({ prefix: 'nx', max: 10 });
      operationHistory.push({ name: 'abc' });
      operationHistory.push({ name: 'abc' });
      var res1 = operationHistory.data;
      expect(res1.length).toBe(1);
      operationHistory.push({ name: 'abcd' });
      operationHistory.push({ name: 'abc' });
      var res2 = operationHistory.data;
      expect(res2.length).toBe(3);
    });

    test('api: del should remove all the id object', () => {
      var operationHistory = new NxOperationHistory({ prefix: 'nx', max: 10 });
      operationHistory.push({ name: 'abc' });
      operationHistory.push({ name: 'abcd' });
      operationHistory.push({ name: 'abd' });
      operationHistory.push({ name: 'abc' });

      var id = NxOperationHistory.hash({ name: 'abc' });
      operationHistory.del(id);
      var res = operationHistory.data;

      expect(res).toEqual([
        {
          id: '51552caaeb9c66620169b9a8e6a2b651c8dc7759',
          data: { name: 'abcd' }
        },
        {
          id: '9aec430c2eb27288a25619ada265bc5145db0148',
          data: { name: 'abd' }
        }
      ]);
    });

    test('api: prev/next/max', () => {
      var operationHistory = new NxOperationHistory({ prefix: 'nx', max: 10 });
      for (var i = 0; i < 20; i++) {
        operationHistory.push({ name: 'abc', random: Math.random() });
      }

      expect(operationHistory.length).toBe(10);
      operationHistory.back(); // 8
      operationHistory.back(); // 7
      operationHistory.back(); // 6
      expect(operationHistory.index).toBe(6);
      operationHistory.forward(); // 7
      expect(operationHistory.index).toBe(7);
      operationHistory.forward(); // 7
      operationHistory.forward(); // 7
      operationHistory.forward(); // 7
      operationHistory.forward(); // 7
      expect(operationHistory.index).toBe(9);
    });

    test('api: go', () => {
      var operationHistory = new NxOperationHistory({ prefix: 'nx', max: 10 });
      for (var i = 0; i < 20; i++) {
        operationHistory.push({ name: 'abc', random: Math.random() });
      }

      // default:
      expect(operationHistory.index).toBe(9);

      // will at 1
      operationHistory.go(1);
      expect(operationHistory.index).toBe(1);

      // will at 0
      operationHistory.go(0);
      expect(operationHistory.index).toBe(0);

      // will at 0
      operationHistory.index = 9;
      operationHistory.go(-2);
      expect(operationHistory.index).toBe(7);
    });

    test('api: at', () => {
      var operationHistory = new NxOperationHistory({ prefix: 'nx', max: 10 });
      operationHistory.push({ name: 'abc' });
      operationHistory.push({ name: 'abcd' });
      operationHistory.push({ name: 'abce' });
      operationHistory.push({ name: 'abcf' });
      var res = nx.get(operationHistory.at(3), 'data.name');
      expect(res).toBe('abcf');
    });

    test('api: replace', () => {
      var operationHistory = new NxOperationHistory({ prefix: 'nx', max: 10 });
      operationHistory.push({ name: 'abc' });
      operationHistory.push({ name: 'abcd' });
      operationHistory.push({ name: 'abce' });
      operationHistory.replace({ name: 'xxxx' });

      expect(operationHistory.length).toBe(3);
      expect(operationHistory.at(2).data.name).toBe('xxxx');
    });

    test('api: engine at localStorage', () => {
      var operationHistory = new NxOperationHistory({ prefix: 'nx', max: 10 });
      for (var i = 0; i < 20; i++) {
        operationHistory.push({ name: 'abc', random: Math.random() });
      }

      expect(localStorage.getItem('nx__operation_history@data').includes('abc'));
      expect(localStorage.getItem('nx__operation_history@index') === 9);
    });
  });
})();
