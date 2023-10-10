import SeoConfig from "../components/SeoConfig/index";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";

/**
 * Renderiza o a página inicial contendo o dashboard da aplicação.
 * @category Component
 */

export default function Home() {
  return (
    <>
      <SeoConfig title="Dashboard" />
      <Header />
      <Dashboard />
    </>
  );
}
