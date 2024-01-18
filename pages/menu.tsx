import SeoConfig from "@/components/SeoConfig";
import Menu from "@/components/MenuAdm/MenuForm/index";
import Header from "@/components/Header";
import { AuthProvider } from "@/components/AuthProvider";

const MenuAdm = () => {
  return (
    <AuthProvider permission={["ADMINISTRADOR"]} redirect="/dashboard">
      <SeoConfig title="Menu" />
      <Header />
      <Menu />
    </AuthProvider>
  );
};

export default MenuAdm;
