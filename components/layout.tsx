import "tw-elements/dist/css/tw-elements.min.css";

export default function Layout({ children }: any) {
  return (
    <main className="h-full">
      <div className="container mx-auto px-4 h-full">
        {children}
      </div>
    </main>
  )
}