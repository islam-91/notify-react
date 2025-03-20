# React Toast Message Component 🌟

A feature-rich, accessible, and highly customizable toast notification system for React applications. Supports multiple positions, variants, custom styling, and interactive features.

![Toast Message Demo](https://example.com/toast-demo.gif) *<!-- Add demo image/gif if available -->*

## Features 🚀

- **9 Positioning Options**: Top/Bottom/Center + Left/Right/Center combinations
- **4 Variant Types**: Success, Error, Warning, Info with default icons
- **Auto-Dismiss**: Configurable duration (0 for persistent)
- **Interactive Controls**:
  - Pause on hover
  - Manual close button
  - Progress bar visualization
- **Customization**:
  - Override all colors (background, text, progress)
  - Custom icons
  - CSS animations and transitions
- **Accessibility**:
  - ARIA live regions
  - Keyboard navigation (ESC to dismiss)
  - Semantic HTML
- **Dynamic Container Management**: Automatic DOM portal creation
- **Smooth Animations**: Entrance/exit transitions with CSS
- **TypeScript Support**: Full type definitions

## Installation 📦

```bash
npm install notify-react
# or
yarn add notify-react
```
## Basic Usage 🛠️

```tsx
import ToastMessage from 'react-toast-message-component';

function App() {
  return (
    <ToastMessage
      message="Operation completed successfully!"
      variant="success"
      duration={3000}
      position="tR"
    />
  );
}
 ```

 ## Advanced Usage 🔧
```tsx
<ToastMessage 
  position="tC"
  message="Saved successfully!"
  duration={5000}
/>

<ToastMessage
  position="cC"
  message="Processing..."
  variant="info"
  duration={0}  // Will not auto-close
/>
```

##  Custom Styled Toast

```tsx
<ToastMessage
  message="Custom Notification"
  background="#2d3748"
  textColor="#fff"
  progressColor="#48bb78"
  customIcon={<CustomIcon />}
  position="bL"
  duration={4000}
/>
```

### Props 📜

| Prop           | Type              | Default    | Description                                  |
|----------------|-------------------|-----------|----------------------------------------------|
| `message`      | `string`          | Required  | Notification content (supports HTML)         |
| `duration`     | `number`          | `3000`    | Display time in ms (`0` = persistent)        |
| `variant`      | `Variant`         | `'info'`  | `'success'`, `'error'`, `'warning'`, `'info'` |
| `position`     | `Position`        | `'tR'`    | See positioning options below                |
| `background`   | `string`          | `-`       | Override background color                    |
| `textColor`    | `string`          | `-`       | Override text color                          |
| `progressColor`| `string`          | `-`       | Override progress bar color                  |
| `customIcon`   | `React.ReactNode` | `-`       | Replace default variant icon                 |

### Positioning 🎯

```typescript
type Position = 
  | 'tR' // Top Right
  | 'tL' // Top Left
  | 'tC' // Top Center
  | 'cR' // Center Right
  | 'cL' // Center Left
  | 'cC' // Center Center
  | 'bR' // Bottom Right
  | 'bL' // Bottom Left
  | 'bC'; // Bottom Center
