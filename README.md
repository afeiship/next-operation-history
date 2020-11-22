# next-operation-history
> Operation history for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-operation-history
```

## structure
```js
{
  max: 100,
  engine: 'local', // session
  prefix:'wbs', // wbs__operation_history@
  index: 0,  // the pointer
  data: [
    { id:'obj_hash1', value: 'json1'},
    { id:'obj_hash2', value: 'json2'},
    { id:'obj_hash3', value: 'json3'},
    { id:'obj_hash4', value: 'json4'},
  ]
}
```


## configuration
```js
{
  max: 10,
  engine: 'local', // session
  prefix: 'nx'
}
```

## methods
| api     | params  | description                              |
| ------- | ------- | ---------------------------------------- |
| reset   | -       | Set index/data to default options value. |
| last    | -       | Get last index.                          |
| at      | -/index | Get current(index) item at index.        |
| get     | (id)    | Get data by id.                          |
| gets    | -       | Get all storage data.                    |
| forward | -       | Move index to next.                      |
| back    | -       | Move index to previous.                  |
| go      | index   | Move to the index.                       |
| push    | data    | Push data to items.                      |
| replace | data    | Replace the last item.                   |
| add     | data    | Add to the store without judgement.       |
| del     | id      | Remove all the equal id elements.        |

## properties
| api    | description                 |
| ------ | --------------------------- |
| next   | Property: can forward?      |
| prev   | Property: can back?         |
| length | Property: data size         |
| index  | Property: Pointer           |
| data   | Property: the original data |

## usage
```js
import NxOperationHistory from '@feizheng/next-operation-history';

// code goes here:
const noh = new NxOperationHistory({ prefix: 'abc', max: 20, engine:'local' });

// save:
noh.push();
noh.at():

// undo
noh.back();
noh.at();

// redo
noh.forward();
noh.at();

// can next?
noh.next

// can previous?
noh.prev
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-operation-history/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-operation-history
[version-url]: https://npmjs.org/package/@jswork/next-operation-history

[license-image]: https://img.shields.io/npm/l/@jswork/next-operation-history
[license-url]: https://github.com/afeiship/next-operation-history/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-operation-history
[size-url]: https://github.com/afeiship/next-operation-history/blob/master/dist/next-operation-history.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-operation-history
[download-url]: https://www.npmjs.com/package/@jswork/next-operation-history
