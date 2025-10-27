# FetchFlow VM

Pure JavaScript drop-in replacement for fetchflow - a sequential fetch execution virtual machine with no external dependencies.

## Features

- ✅ **Zero dependencies** - pure JavaScript implementation
- ✅ **No QuickJS** - eliminated heavy VM library
- ✅ **Pauses on every fetch** - statement-by-statement execution
- ✅ **State preservation** - resume execution from paused state
- ✅ **Simple execution model** - regex-based parsing, eval-based execution
- ✅ **Drop-in compatible** - matches fetchflow API

## Installation

```bash
npm install fetchflow-vm
```

## Usage

### Basic Execution

```javascript
const { executeCode, SequentialFetchVM } = require('fetchflow-vm');

// Simple code execution
const result = await executeCode('const x = 10; x * 2');
console.log(result.result); // 20
```

### Fetch Detection & Pause/Resume

```javascript
const { SequentialFetchVM } = require('fetchflow-vm');

const vm = new SequentialFetchVM();
await vm.initialize();

// Execute code - pauses at fetch
const pauseResult = await vm.executeCode(`
  const userId = 123;
  const user = fetch('https://api.example.com/user/' + userId);
  user.name
`);

// pauseResult.type === 'pause'
// pauseResult.fetchRequest.url === 'https://api.example.com/user/123'
// pauseResult.state === 1 (fetch ID)

// Resume execution with response
const finalResult = await vm.resumeExecution(pauseResult.state, {
  name: 'Alice'
});

console.log(finalResult.result); // 'Alice'
vm.dispose();
```

### Sequential Multiple Fetches

```javascript
const vm = new SequentialFetchVM();
await vm.initialize();

const p1 = await vm.executeCode(`
  const resp1 = fetch('https://api.example.com/data/1');
  const resp2 = fetch('https://api.example.com/data/2');
  resp1.value + resp2.value
`);

// First pause at first fetch
const p2 = await vm.resumeExecution(p1.state, { value: 10 });

// Second pause at second fetch
const p3 = await vm.resumeExecution(p2.state, { value: 20 });

console.log(p3.result); // 30
vm.dispose();
```

## API

### SequentialFetchVM

#### Constructor
```javascript
new SequentialFetchVM(options = {})
```

#### Methods

- **`initialize()`** - Initialize the VM (idempotent)
  - Returns: Promise<void>

- **`executeCode(code)`** - Execute JavaScript code
  - Parameter: `code` (string) - JavaScript code to execute
  - Returns: Promise<{type: 'pause'|'complete'|'error', ...}>

- **`resumeExecution(fetchId, response)`** - Resume from paused fetch
  - Parameters:
    - `fetchId` - State ID from previous pause
    - `response` - Mock response object for fetch
  - Returns: Promise<{type: 'pause'|'complete'|'error', ...}>

- **`dispose()`** - Clean up resources
  - Returns: void

#### Result Objects

**Pause Result** (when fetch is encountered):
```javascript
{
  type: 'pause',
  result: null,
  state: <fetchId>,
  fetchRequest: {
    id: <fetchId>,
    url: <fetchUrl>,
    options: null
  },
  history: []
}
```

**Complete Result** (execution finished):
```javascript
{
  type: 'complete',
  result: <lastExpressionValue>,
  history: [...]
}
```

**Error Result** (execution failed):
```javascript
{
  type: 'error',
  error: <errorMessage>,
  history: [...]
}
```

### executeCode(code)

Convenience function for one-off code execution:
```javascript
const result = await executeCode('const x = 5; x + 3');
```

Auto-disposes VM after completion.

## Architecture

- **Parsing**: Regex-based statement splitting
- **Execution**: Statement-by-statement with eval() in variable scope
- **Fetch Detection**: Simple string pattern matching for `fetch(` calls
- **State**: In-memory variable tracking with paused state preservation

## Limitations

**By Design:** This library is optimized for **simple sequential data flow** - fetch calls with variable tracking across runtimes.

**Not Supported:**
- Loops (for, while, do-while)
- Conditionals (if/else, switch)
- Function definitions or calls
- async/await
- Closures and complex scoping
- Advanced JavaScript features

**Why?** Supporting these would require a runtime-specific engine (QuickJS, V8, etc.), breaking cross-runtime compatibility (Node/Bun/Deno/Google Apps Script). The current design uses only built-in JavaScript primitives (`eval`, regex parsing) that work everywhere.

**Intended Use Case:** Code that looks like:
```javascript
const userId = 123;
const user = fetch('https://api.example.com/user/' + userId);
const posts = fetch('https://api.example.com/posts?userId=' + user.id);
posts.length
```

**Not Intended For:**
```javascript
for (let i = 0; i < 10; i++) {
  const data = fetch(...);  // Won't work - loops not executed
}

function getData() {
  return fetch(...);  // Won't work - functions not callable
}
```
