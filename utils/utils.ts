export const debounce = (
  func: { apply: (arg0: undefined, arg1: any[]) => void },
  delay: number | undefined
) => {
  let timeoutId: string | number | NodeJS.Timeout | undefined;

  return (...args: any[]) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const formatBigNumber = (num: number) => {
  if (Math.abs(num) >= 1.0e9) {
    return (num / 1.0e9).toFixed(1) + "B";
  } else if (Math.abs(num) >= 1.0e6) {
    return (num / 1.0e6).toFixed(1) + "M";
  } else if (Math.abs(num) >= 1.0e3) {
    return (num / 1.0e3).toFixed(1) + "K";
  } else {
    return num?.toString();
  }
};
