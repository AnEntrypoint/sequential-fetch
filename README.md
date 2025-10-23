# XState Interactive State Machine Playground

A comprehensive interactive playground for exploring XState state machines. This web application allows you to create, visualize, and test state machine configurations with real-time visual feedback and execution capabilities.

## Features

### Core Functionality
- **Live State Machine Editor**: Edit JSON configuration in real-time with validation
- **Visual State Machine Representation**: Interactive canvas showing states, transitions, and current active state
- **State Machine Execution**: Send events to trigger state transitions
- **Execution History**: Complete log of all state transitions with timestamps

### State Machine Support
- Multiple states (idle, loading, success, error, etc.)
- Event-driven transitions (START, FETCH, RETRY, RESET, etc.)
- Support for nested states and parallel states
- Custom state metadata and styling

### UI Features
- Split-screen layout with editor and visualization
- Real-time validation and error handling
- Responsive design for desktop and mobile
- Interactive event buttons for each available transition
- Color-coded state visualization

## Project Structure

```
xstate/
├── index.html          # Main HTML file with application layout
├── script.js           # Core application logic and XState integration
├── styles.css          # Complete styling for responsive design
├── package.json        # Dependencies and project configuration
├── vercel.json         # Vercel deployment configuration
└── README.md           # This documentation
```

## Dependencies

- **XState v5.26.0**: State machine library for creating, interpreting, and visualizing state machines
- **Bootstrap v5.3.3**: CSS framework for responsive UI components

## Installation and Usage

### Local Development
1. Clone the repository:
```bash
git clone <repository-url>
cd xstate
```

2. Install dependencies:
```bash
npm install
```

3. Start local development server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js serve (if installed)
npx serve .

# Or open index.html directly in a browser
```

### Using the Playground

1. **Load Examples**: Click the "Load Example" button to see pre-configured state machines
2. **Edit Configuration**: Modify the JSON in the editor panel
3. **Apply Changes**: Click "Apply Configuration" to update the state machine
4. **Visualize**: Watch the state machine visualization update in real-time
5. **Test Transitions**: Click event buttons to trigger state transitions
6. **Monitor History**: View the execution history in the log panel

## Configuration Format

The state machine configuration follows XState format:

```json
{
  "id": "machine-id",
  "initial": "initial-state",
  "states": {
    "stateName": {
      "on": {
        "EVENT_NAME": "target-state"
      }
    }
  }
}
```

### Example Configurations

#### Simple Toggle Machine
```json
{
  "id": "toggle",
  "initial": "inactive",
  "states": {
    "inactive": {
      "on": { "TOGGLE": "active" }
    },
    "active": {
      "on": { "TOGGLE": "inactive" }
    }
  }
}
```

#### Data Fetching Machine
```json
{
  "id": "fetch",
  "initial": "idle",
  "states": {
    "idle": {
      "on": { "FETCH": "loading" }
    },
    "loading": {
      "on": {
        "RESOLVE": "success",
        "REJECT": "failure"
      }
    },
    "success": {
      "on": { "RESET": "idle" }
    },
    "failure": {
      "on": { "RETRY": "loading" }
    }
  }
}
```

## Event System

The playground supports dynamic event handling:
- Events are automatically detected from the state machine configuration
- Buttons are generated for each available transition
- Events can include payloads for complex state transitions
- Real-time feedback shows which events are available in the current state

## State Machine Types Supported

- **Finite State Machines**: Simple state-to-state transitions
- **Hierarchical State Machines**: Nested states with parent-child relationships
- **Parallel State Machines**: Concurrent states that run simultaneously
- **Extended State Machines**: States with context and extended data

## Deployment

This project is configured for deployment on Vercel:

1. Connect your repository to Vercel
2. Vercel will automatically detect the configuration from `vercel.json`
3. The site will be deployed with the following settings:
   - Build command: Not required (static site)
   - Output directory: Root directory
   - Node.js version: 20.x

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Educational Purpose

This playground is designed to help developers:
- Learn XState concepts and patterns
- Experiment with state machine configurations
- Understand state transitions and event handling
- Visualize complex state machines
- Test state machine logic before implementation

## Technical Details

### State Machine Lifecycle
1. **Creation**: Machine is created from JSON configuration
2. **Interpretation**: Service is started to interpret the machine
3. **Execution**: Events trigger state transitions
4. **Visualization**: Canvas updates to reflect current state
5. **Logging**: All transitions are logged for debugging

### Canvas Rendering
- States are rendered as rounded rectangles
- Current state is highlighted with a distinct color
- Transitions are shown as arrows between states
- Layout is automatically calculated for optimal visualization

### Error Handling
- JSON validation with clear error messages
- Graceful handling of malformed configurations
- Fallback to default state machine on errors
- User-friendly error display in the UI
