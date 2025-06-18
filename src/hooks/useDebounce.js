import { useState, useEffect } from 'react';

// Este hook recebe um valor (o que o usuário está digitando) e um delay (ex: 500ms).
// Ele só retorna o valor final depois que o usuário para de digitar pelo tempo do delay.
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpa o timeout se o valor mudar (ex: usuário digita outra letra)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;