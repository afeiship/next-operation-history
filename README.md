# next-operation-history
> Operation history for next.

## installation
```bash
npm install -S @feizheng/next-operation-history
```
## configuration
```json
{
  max: 10,
  engine: 'local', // session
  prefix: 'nx'
}
```

## apis
| api     | params    | description                              |
| ------- | --------- | ---------------------------------------- |
| reset   | -         | Set index/data to default options value. |
| last    | -         | Get last index.                          |
| at      | -/index   | Get current(index) item at index.        |
| set     | (id,data) | Set data by id.                          |
| sets    | (object)  | Set multiple key/values.                 |
| get     | (id)      | Get data by id.                          |
| gets    | -         | Get all storage data.                    |
| forward | -         | Move index to next.                      |
| back    | -         | Move index to previous.                  |
| push    | data      | Push data to items.                      |
| replace | data      | Replace the last item.                   |

## properties:
| api  | description            |
| ---- | ---------------------- |
| next | Property: can forward? |
| prev | Property: can back?    |

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
