import React from 'react';
import { ThemeProvider } from '../Contexts/ThemeContext';
import { SidebarProvider } from '../Contexts/SidebarContext';

const App = ({ children }) => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default App;