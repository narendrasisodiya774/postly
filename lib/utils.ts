import { useEffect } from "react";
import { useRouter } from "next/router";

const useRouteGuard = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = sessionStorage.getItem("user");

      if (!user) {
        router.replace("/signup");
      }
    }
    else{
        router.replace("/");
    }
  }, []);
};

export default useRouteGuard;
