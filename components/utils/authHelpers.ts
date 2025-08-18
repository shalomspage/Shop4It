


export interface User {
  id?: string | number;
  email: string;
  username: string;
  is_staff?: boolean;
  is_superuser?: boolean;
  isAdmin?: boolean; // if your API sends this field
}

export const isAdminUser = (user?: User | null): boolean => {
  if (!user) return false;
  // Check all three fields safely
  return Boolean(user.is_staff || user.is_superuser || user.isAdmin);
};
