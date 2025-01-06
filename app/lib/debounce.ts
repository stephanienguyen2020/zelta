export function debounce<T>(
  func: (arg: T) => void,
  wait: number
): (arg: T) => void {
  let timeout: NodeJS.Timeout;

  return (arg: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(arg), wait);
  };
} 