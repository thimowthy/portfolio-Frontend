import SeoConfig from "@/components/SeoConfig";
import Login from "@/components/Login";
import Header from "@/components/Header";

const LoginPage: React.FC = () => {
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
