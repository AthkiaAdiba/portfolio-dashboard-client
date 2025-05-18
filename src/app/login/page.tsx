import LoginForm from "@/components/myComponents/auth/login/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
