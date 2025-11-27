# Sequential Fetch

Implicit xstate VM - automatic pause/resume on every `fetch()` call.

## Installation

```bash
npm install sequential-fetch
```

## Usage

```javascript
const { SequentialFetchVM, executeCode } = require('sequential-fetch');

const result = await executeCode('const x = 10; x * 2');

const vm = new SequentialFetchVM();
await vm.initialize();

const pauseResult = await vm.executeCode(`
  const userId = 123;
  const user = fetch('https://api.example.com/user/' + userId);
  user.name
`);

const finalResult = await vm.resumeExecution(pauseResult.state, { name: 'Alice' });

vm.dispose();
```

## API

### SequentialFetchVM

```javascript
new SequentialFetchVM(options)
```

Methods:
- `initialize()` - Initialize VM
- `executeCode(code)` - Execute code, returns pause/complete/error result
- `resumeExecution(fetchId, response)` - Resume from paused fetch
- `dispose()` - Clean up

### Result Types

**Pause** (fetch encountered):
```javascript
{ type: 'pause', state: fetchId, fetchRequest: { id, url, options } }
```

**Complete** (execution finished):
```javascript
{ type: 'complete', result: value }
```

## Supported

- Variable assignment
- Expressions and arithmetic
- Property access
- String concatenation
- Objects and arrays
- Fetch pausing

## Not Supported (by design)

- Loops
- Conditionals
- Functions
- async/await
- Closures

Cross-runtime compatible: Node.js, Bun, Deno.

## License

MIT
