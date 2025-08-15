import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, initialized } = useSelector((state: any) => state.auth);

  // Wait until auth is initialized
  if (!initialized) return null;

  // If no user or not admin, redirect
  if (!user || !user.isAdmin) {
    router.push("/");
    return null;
  }

  return <>{children}</>;
}
