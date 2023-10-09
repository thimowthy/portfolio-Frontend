import checkAuthentication from "@/utils/checkAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "tw-elements/dist/css/tw-elements.min.css";

export default function Layout({ children }: any) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    const isLoginPage = router.pathname === "/login";

    if (!isAuthenticated && !isLoginPage) {
      router.push("/login");
    }
  }, []);

  return (
    <main className="h-full bg-[#689f92]">
      <div className="container mx-auto px-4 h-full">{children}</div>
    </main>
  );
}
