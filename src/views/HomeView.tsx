import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

export default function HomeView() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-10 bg-gray-100 bg-right-top bg-no-repeat lg:bg-home lg:bg-home-xl">
        <div className="max-w-5xl mx-auto mt-10">
          <div className="px-10 space-y-6 lg:w-1/2 lg:p-0">
            <h1 className="text-6xl font-black">
              Todas tus <span className="text-cyan-400">Redes Sociales </span>{" "}
              en un enlace
            </h1>
            <p className="text-xl text-slate-800">
              Únete a mas de 100 mil developers compartiendo sus redes sociales,
              comparte tu perfil de facebook, github, instagram, youtube y mas{" "}
            </p>
            <SearchForm />
          </div>
        </div>
      </main>
    </>
  );
}
