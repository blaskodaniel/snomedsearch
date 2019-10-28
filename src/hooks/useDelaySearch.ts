import { useState, useEffect } from 'react';

// Custom hook for delay search
export const useDelaySearch = (value: string, delay:number): string => {
  const [srValue, setSrValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setSrValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value] 
  );

  return srValue;
}
