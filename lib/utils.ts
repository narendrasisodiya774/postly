import { useEffect } from "react";
import { useRouter } from "next/router";

const useRouteGuard = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");

      if (!user) {
        router.replace("/login");
      }
    }
    else{
        router.replace("/markdown");
    }
  }, []);
};

export default useRouteGuard;
