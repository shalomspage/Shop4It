


export interface User {
  id?: string | number;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  is_staff?: boolean;
  is_superuser?: boolean;
  isAdmin?: boolean; 
}

export const isAdminUser = (user?: User | null): boolean => {
  if (!user) return false;
  // Check all three fields safely
  return Boolean(user.is_staff || user.is_superuser || user.isAdmin);
};
