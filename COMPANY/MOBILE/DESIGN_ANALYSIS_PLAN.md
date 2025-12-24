1.# CleanWave Mobile App - Design System Analysis & Implementation Plan

## Web App Design System Analysis

### Color Palette

- **Primary Green**: #8CA566 (main brand color)
- **Secondary Green**: #9DD549 (lighter accent)
- **Active Green**: #4C862D (hover/active states)
- **Active Background**: #E3FFB9 (light green background)
- **Background**: #F9FAFB (gray-50)
- **White**: #FFFFFF (cards, components)
- **Text**: Gray scale (#374151, #6B7280, #9CA3AF)

### Typography

- **Font Family**: 'Outfit', sans-serif
- **Headings**: Bold weights (font-bold)
- **Body Text**: Regular weights with proper line height
- **Font Sizes**: Responsive scale (text-xs to text-3xl)

### Layout Patterns

1. **Authentication Screen**

   - Centered card layout
   - Logo at top
   - Form fields with icons
   - Action buttons at bottom

2. **Dashboard Layout**

   - Fixed header with logo, notifications, user profile
   - Main content area with cards/sections
   - Bottom tab navigation

3. **Component Styles**
   - Rounded corners (rounded-xl, rounded-2xl)
   - Subtle shadows (shadow-md, shadow-lg)
   - Hover effects and transitions
   - Consistent padding and spacing

### Navigation Structure

- **Header**: Logo + Notifications + User Profile
- **Bottom Tabs**: Home, Pickups, Wallet, Profile
- **Role-based Navigation**: Different layouts per user role

## Mobile App Implementation Plan

### Phase 1: Design System Setup

1. **Update Color Scheme**

   - Configure Tailwind colors to match web app
   - Update color palette in tailwind.config.js

2. **Typography System**

   - Configure Outfit font family
   - Create consistent text styles

3. **Component Library**
   - Create reusable button components
   - Create card components
   - Create input components with icons

### Phase 2: Layout Restructuring

1. **Authentication Flow**

   - Update login/register screens to match web design
   - Implement centered card layout
   - Add logo and branding

2. **Dashboard Layout**

   - Create header component matching web app
   - Implement bottom tab navigation
   - Update main dashboard content

3. **Content Pages**
   - Update Home, Pickups, Wallet, Profile components
   - Match card layouts and styling
   - Implement responsive mobile-first design

### Phase 3: Component Updates

1. **Header Component**

   - Logo + notifications + user profile
   - Match web app styling

2. **Navigation**

   - Bottom tab navigation with icons
   - Active state styling

3. **Forms & Inputs**
   - Update input styling
   - Add icons and validation
   - Match web app patterns

### Phase 4: Brand Integration

1. **Assets**

   - Add CleanWave logo
   - Update splash screen
   - Add favicon/icon

2. **Branding**
   - Consistent color usage
   - Typography alignment
   - Spacing and layout consistency

## Files to Update/Create

### Configuration Files

- `tailwind.config.js` - Update colors and font configuration
- `package.json` - Add required dependencies (icons, fonts)

### Components to Create/Update

- `src/components/ui/` - UI component library
  - Button.jsx
  - Card.jsx
  - Input.jsx
  - Header.jsx
  - BottomNav.jsx

### Layout Components

- `src/layouts/` - Layout wrappers
  - AuthLayout.jsx
  - DashboardLayout.jsx

### Page Components

- `src/pages/Auth/` - Update authentication screens
- `src/pages/user/` - Update dashboard and components
- `src/components/` - Update reusable components

### Assets

- Add CleanWave logo and branding assets
- Update app icons and splash screen

## Implementation Priority

1. **High Priority**: Design system setup, authentication flow
2. **Medium Priority**: Dashboard layout, navigation
3. **Low Priority**: Component refinements, animations

## Success Metrics

- Consistent color usage across app
- Typography alignment with web app
- Navigation pattern matching
- Brand identity preservation
- Mobile-first responsive design
