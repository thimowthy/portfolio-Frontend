import SeoConfig from "@/components/SeoConfig";
import Login from "@/components/Login";
import Header from "@/components/Header";

const LoginPage = () => {
  return (
    <>
      <div>
        <SeoConfig title="Login" />
        <Header />
        <Login />
      </div>
    </>
  );
};

export default LoginPage;
