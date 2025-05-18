import LoginButton from "@/components/myComponents/Home/LoginButton";
import Navbar from "@/components/myComponents/shared/navbar/Navbat";

const HomePage = () => {
  return (
    <div className="px-2 xl:px-[5%] pt-10">
      <div className="flex justify-end">
        <Navbar />
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div>
          <p className="text-5xl font-extrabold">
            Home Page of Portfolio Dashboard Application.
          </p>
          <div className="flex justify-center items-center mt-10">
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
