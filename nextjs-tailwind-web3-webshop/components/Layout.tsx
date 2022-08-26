import Header from "./Header/Header"

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      {/* MAIN LAYOUT */}
      <div className="flex h-screen flex-col scroll-smooth bg-blue-900/70 text-white scrollbar-hide">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </>
  )
}
