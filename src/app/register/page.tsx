import RegisterForm from "@/components/myComponents/auth/register/RegisterForm";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <div>
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default RegisterPage;
