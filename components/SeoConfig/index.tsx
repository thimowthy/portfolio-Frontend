import Head from "next/head";
/**
 * Renderiza o header para uma página da aplicação com o título da página.
 * @category Component
 */
export default function SeoConfig({ title }: { title: string }) {
  return (
    <>
      <Head>
        <title>{title ? "OncocareSystem - " + title : "OncoCareSystem"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
