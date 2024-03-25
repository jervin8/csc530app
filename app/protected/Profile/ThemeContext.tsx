// ThemeContext.tsx
import { createContext } from 'react';

export type Theme = boolean; // Adjust the type definition based on your theme implementation

const ThemeContext = createContext<Theme | undefined>(undefined);

export default ThemeContext;
