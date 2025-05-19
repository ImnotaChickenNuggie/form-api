'use client';
import { Client as Styletron } from 'styletron-engine-monolithic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { useState, useEffect } from 'react';

export function Providers({ children }) {
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    setEngine(new Styletron());
  }, []);

  if (!engine) {
    return null;
  }

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        {children}
      </BaseProvider>
    </StyletronProvider>
  );
} 