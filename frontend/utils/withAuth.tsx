import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/signin");
      }
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
