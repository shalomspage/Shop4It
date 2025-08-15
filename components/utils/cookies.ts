
export const getBrowserCookie = (name: string): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2];
};
