import { Navbar } from "./components/ui/Navbar"

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1 text-sm text-sky-300">
          Tailwind CSS aktywny
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Shift Allocation Dashboard
        </h1>
        <p className="mt-4 max-w-xl text-slate-300">
          Projekt jest gotowy do budowy interfejsu z wykorzystaniem utility
          classes Tailwind.
        </p>
      </div>
    </main>
  )
}

export default App
