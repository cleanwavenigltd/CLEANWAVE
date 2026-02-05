# Redux Toolkit Migration - Quick Reference

## What Was Migrated ✅

### Context API Components → Redux Toolkit

- **PageContext** (UI Navigation State) → **uiSlice**
- **UserContext** (Already using Redux authSlice)

---

## Files Modified

### New Files Created:

1. ✨ `src/store/uiSlice.js` - Redux slice for navigation state

### Redux Store Updated:

2. 📝 `src/store/store.js` - Added uiSlice to store

### Layout Components Updated (4 files):

3. 🔄 `src/layouts/userLayout.jsx`
4. 🔄 `src/layouts/agentLayout.jsx`
5. 🔄 `src/layouts/aggregatorLayout.jsx`
6. 🔄 `src/layouts/WasteLayout.jsx`

### Feature Components Updated (2 files):

7. 🔄 `src/pages/aggregator/components/Home.jsx`
8. 🔄 `src/pages/agent/components/Home.jsx`

---

## How to Use Redux in Your Components

### Step 1: Import Redux Hooks

```javascript
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../store/uiSlice";
```

### Step 2: Get Data & Dispatch

```javascript
const dispatch = useDispatch();
const activeTab = useSelector((state) => state.ui.activeTab);

// Change tab
dispatch(setActiveTab("wallet"));
```

### Step 3: Use activeTab in Rendering

```javascript
{
  menu.map((item) => (
    <button
      key={item.id}
      onClick={() => dispatch(setActiveTab(item.id))}
      className={activeTab === item.id ? "active" : ""}
    >
      {item.label}
    </button>
  ));
}
```

---

## Current Redux State Structure

```javascript
{
  auth: {
    token: "...",
    role: "user|agent|aggregator|wastebank|admin",
    userData: {...},
    wallet: {...},
    pickups: [],
    transactions: [],
    profile: {...},
    status: "idle|loading|succeeded|failed",
  },
  ui: {
    activeTab: "home|wallet|profile|..." // NEW
  }
}
```

---

## Testing Your Changes

Run this in your browser console to verify Redux is working:

```javascript
// Check Redux state
const store = window.__REDUX_DEVTOOLS_EXTENSION__?.(...);

// Or open Redux DevTools browser extension
// You'll see "ui/setActiveTab" actions when you click tabs
```

---

## Benefits You Get Now

✅ Centralized state management  
✅ Time-travel debugging with Redux DevTools  
✅ Predictable state updates  
✅ Easy to test reducers  
✅ Middleware support for future features

---

## Deprecated Files (Safe to Delete Later)

- `src/contexts/PageContext.jsx` - No longer used
- `src/contexts/UserContext.jsx` - No longer used

---

## If You Need to Add More State

1. Create a new slice: `src/store/newSlice.js`
2. Add to store: `src/store/store.js`
3. Import & use dispatch/selector in components

Example:

```javascript
// src/store/walletSlice.js
import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: { balance: 0 },
  reducers: {
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const { updateBalance } = walletSlice.actions;
export default walletSlice.reducer;
```

Then add to store:

```javascript
// store.js
import walletReducer from "./walletSlice";

reducer: {
  auth: authReducer,
  ui: uiReducer,
  wallet: walletReducer, // NEW
}
```

---

**Full documentation**: See `CONTEXT_TO_REDUX_MIGRATION.md`
