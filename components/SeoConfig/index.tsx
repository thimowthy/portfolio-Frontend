import Head from "next/head";
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
