# Context API to Redux Toolkit Migration Guide

## Migration Complete! ✅

Your Cleanwave application has been successfully migrated from React Context API to Redux Toolkit. This document outlines all changes made.

---

## Summary of Changes

### 1. **New Redux Slice Created**

- **File**: `src/store/uiSlice.js`
- **Purpose**: Manages UI state (activeTab navigation)
- **State**:
  ```javascript
  {
    activeTab: "home"; // controls which screen is displayed
  }
  ```
- **Actions**:
  - `setActiveTab(tabId)` - Set active tab
  - `resetUI()` - Reset to default state

### 2. **Updated Redux Store**

- **File**: `src/store/store.js`
- **Change**: Added `uiReducer` to the store configuration
- **Before**:
  ```javascript
  reducer: {
    auth: authReducer,
  }
  ```
- **After**:
  ```javascript
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  }
  ```

### 3. **Migrated Layouts**

All layout files now use Redux instead of PageProvider:

#### `src/layouts/userLayout.jsx`

- ❌ Removed: `useState("home")` local state
- ❌ Removed: `PageProvider` wrapper
- ✅ Added: `useSelector` hook to read `activeTab`
- ✅ Added: `useDispatch` hook to dispatch `setActiveTab` action
- ✅ Added: `handleTabChange()` function using dispatch

#### `src/layouts/agentLayout.jsx`

- ❌ Removed: `useState("home")` local state
- ❌ Removed: `PageProvider` wrapper
- ✅ Added: Redux hooks and dispatch logic

#### `src/layouts/aggregatorLayout.jsx`

- ❌ Removed: `useState("home")` local state
- ❌ Removed: `PageProvider` wrapper
- ✅ Added: Redux hooks and dispatch logic

#### `src/layouts/WasteLayout.jsx`

- ❌ Removed: `useState("home")` local state
- ❌ Removed: `PageProvider` wrapper
- ✅ Added: Redux hooks and dispatch logic

### 4. **Updated Components Using PageContext**

#### `src/pages/aggregator/components/Home.jsx`

- ❌ Removed: `import { PageContext } from "../../../contexts/PageContext"`
- ❌ Removed: `useContext(PageContext)` hook
- ✅ Added: `useDispatch` hook
- ✅ Changed: `setActiveTab()` → `dispatch(setActiveTab(tabId))`
- ✅ Created: `handleTabChange()` wrapper function

#### `src/pages/agent/components/Home.jsx`

- ❌ Removed: `import { PageContext } from "../../../contexts/PageContext"`
- ❌ Removed: `useContext(PageContext)` hook
- ✅ Added: `useDispatch` hook
- ✅ Changed: `setActiveTab()` → `handleTabChange()`

---

## Context Files (Deprecated)

The following context files are no longer used but kept for reference:

- `src/contexts/PageContext.jsx` - **No longer used**
- `src/contexts/UserContext.jsx` - **No longer used** (was already commented out)

**Optional**: These files can be deleted after verification that everything works.

---

## Redux Implementation Pattern

### Using activeTab in Components

**Before (Context API)**:

```jsx
import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";

const { setActiveTab } = useContext(PageContext);
// Usage: setActiveTab("wallet");
```

**After (Redux)**:

```jsx
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../store/uiSlice";

const dispatch = useDispatch();
const activeTab = useSelector((state) => state.ui.activeTab);

// Usage:
dispatch(setActiveTab("wallet"));
```

### Reading activeTab in Components

```jsx
import { useSelector } from "react-redux";

const MyComponent = () => {
  const activeTab = useSelector((state) => state.ui.activeTab);

  return <div>Current Tab: {activeTab}</div>;
};
```

---

## Benefits of This Migration

✅ **Single Source of Truth**: All state managed centrally via Redux  
✅ **Better DevTools**: Redux DevTools for time-travel debugging  
✅ **Scalability**: Easier to add new state slices as app grows  
✅ **Performance**: Selector memoization prevents unnecessary re-renders  
✅ **Testability**: Pure reducers are easier to test  
✅ **Team Standard**: All state management uses same pattern

---

## File Locations Reference

| File                               | Purpose                   |
| ---------------------------------- | ------------------------- |
| `src/store/store.js`               | Redux store configuration |
| `src/store/authSlice.js`           | Authentication state      |
| `src/store/uiSlice.js`             | UI/Navigation state       |
| `src/layouts/userLayout.jsx`       | User role layout          |
| `src/layouts/agentLayout.jsx`      | Agent role layout         |
| `src/layouts/aggregatorLayout.jsx` | Aggregator role layout    |
| `src/layouts/WasteLayout.jsx`      | Waste bank role layout    |

---

## Testing the Migration

1. **Navigate between tabs** - Verify tab switching works correctly
2. **Refresh page** - Confirm activeTab persists (should default to "home")
3. **Check Redux DevTools** - Open Redux DevTools extension and see actions firing
4. **Test all roles** - Switch between user/agent/aggregator/wastebank accounts

---

## Future Enhancements

### If you need to persist activeTab across page refreshes:

Add middleware to store/retrieve tab state:

```javascript
// In main.jsx or store.js
const saveActiveTabMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === "ui/setActiveTab") {
    sessionStorage.setItem("activeTab", action.payload);
  }
  return result;
};

// Initialize from storage
const preloadedState = {
  ui: {
    activeTab: sessionStorage.getItem("activeTab") || "home",
  },
};
```

### If you want to reset UI on logout:

The `resetUI()` action is available in `uiSlice.js` - dispatch it on logout.

---

## Cleanup (Optional)

When you're confident everything works, you can safely delete:

- ~~`src/contexts/PageContext.jsx`~~
- ~~`src/contexts/UserContext.jsx`~~

These files are no longer referenced anywhere in the codebase after this migration.

---

## Need Help?

Check Redux Toolkit docs: https://redux-toolkit.js.org/  
Redux Selector patterns: https://redux.js.org/usage/working-with-selectors
