# next-operation-history
> Operation history for next.

## installation
```bash
npm install -S @feizheng/next-operation-history
```

## structure
```js
{
  max: 100,
  engine: 'local', // session
  prefix:'wbs', // wbs__operation_history@
  index: 0,  // the pointer
  data: [
    { id:'obj_hash1', data: 'json1'},
    { id:'obj_hash2', data: 'json2'},
    { id:'obj_hash3', data: 'json3'},
    { id:'obj_hash4', data: 'json4'},
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

## apis
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
| add     | data    | Add to the store without judement.       |
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
