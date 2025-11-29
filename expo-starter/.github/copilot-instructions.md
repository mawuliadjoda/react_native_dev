# Copilot Instructions - Expo Starter

## Architecture Overview

**Tech Stack:** React Native with Expo Router, TypeScript, Nativewind (Tailwind CSS for React Native), and strict ESLint.

**Key Architecture Pattern:**
- **Expo Router** provides file-based routing under `src/app/`. The `_layout.tsx` is the root layout wrapper; `index.tsx` is the home screen.
- **Nativewind** bridges Tailwind CSS to React Native using babel preset transformation
- **Component Library:** Shared UI components in `src/components/` (AppText, Button) leverage the `cn()` utility for Tailwind class merging
- **Routing Entry:** `src/app/_layout.tsx` imports `global.css` and wraps the Stack navigator, establishing styling and navigation for the entire app

## Critical Developer Workflows

**Start the app locally:**
```sh
npm start          # opens Expo Go menu to choose platform
npm run android    # start Android emulator
npm run ios        # start iOS simulator  
npm run web        # start web preview
```

**Linting & Formatting:**
- ESLint + Prettier are configured together (`eslint-plugin-prettier` + `eslint-config-prettier`)
- Run `npm run lint` to check code; Prettier auto-formats on save in VSCode
- No separate prettier command needed—it's integrated into ESLint

**Metro Config:** `metro.config.js` extends Expo's default config with `withNativeWind` wrapper to process `global.css`

## Project-Specific Conventions

### Class Merging Pattern (src/utils/cn.ts)
All components use `cn()` to merge Tailwind classes safely:
```typescript
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
```
This combines `clsx` (conditional classes) with `tailwind-merge` (resolves conflicting Tailwind utilities). **Always use `cn()` for class composition**, never concatenate strings.

### Component Props Pattern
- **AppText** (`src/components/AppText.tsx`): Semantic size/color props (`small|medium|large|heading`, `primary|secondary|tertiary`) over raw classes
- **Button** (`src/components/Button.tsx`): Extends `PressableProps`, theme variants, disabled state support
- React 19 note: `forwardRef` is no longer needed as `ref` is now a native prop

### Styling Approach
- **Tailwind-first:** Use Tailwind classes for all styling; components expose theme props as abstractions
- **global.css:** Root stylesheet imported in `_layout.tsx`; defines global Tailwind directives
- **Nativewind config** in `tailwind.config.js` scans `./src/**/*.{js,jsx,ts,tsx}` for class usage

### TypeScript Path Alias
- `@/*` maps to `src/*` (configured in `tsconfig.json`)
- Use `@/components/AppText` and `@/utils/cn` for imports across the app

## Integration Points & Dependencies

**Expo Modules:**
- `expo-router` (v5.1.0): File-based routing, Stack navigator
- `expo-status-bar`: Platform-aware status bar styling
- `expo-constants`, `expo-linking`: System access helpers

**React Native + React 19:**
- `react-native` (v0.79.3) + `react` (v19.0.0): Core framework
- `react-native-reanimated`, `react-native-screens`, `react-native-safe-area-context`: Performance & platform features
- `react-dom` (v19.0.0): Web target rendering via `react-native-web`

**Styling Stack:**
- `nativewind` (v4.1.23): JSX to Tailwind compilation for React Native
- `tailwindcss` (v3): Style engine
- `clsx` + `tailwind-merge`: Class utility for safe Tailwind composition

**App Config (app.json):**
- `newArchEnabled: true`: Uses React Native New Architecture
- Plugins: `expo-router` is required for file-based routing to work

## Code Examples

**Adding a new page route:**
Create `src/app/about.tsx`:
```tsx
import { View } from "react-native";
import { AppText } from "@/components/AppText";

export default function AboutScreen() {
  return (
    <View className="flex-1 justify-center p-4">
      <AppText size="heading">About</AppText>
    </View>
  );
}
```
Expo Router automatically adds this as a route.

**Extending Button component:**
Use `cn()` to merge custom classes with base theme:
```tsx
<Button title="Custom" theme="primary" className={cn("px-10", "rounded-full")} />
```
The `cn()` utility ensures Tailwind's utility merging resolves conflicts correctly.

## Non-Standard Patterns to Avoid

- ❌ Direct string concatenation for classes: `className={"px-2 " + extraClass}`
- ❌ Platform-specific file extensions (.ios.tsx, .android.tsx) without explicit routing: Use Expo Router conventions instead
- ❌ Raw React.useState without context: Consider lifting state to layout or use route params for navigation state
- ❌ CSS-in-JS libraries: Nativewind handles all styling; no need for styled-components or emotion
