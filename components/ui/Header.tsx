export default function Header() {
  return (
    <header className="w-full bg-[#FCFAFF] border-b border-[#EADCF8]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <button className="text-3xl text-[#2D2D2D]">☰</button>

        <h1 className="text-3xl font-bold text-[#2D2D2D]">
          <span className="text-[#AD6899]">ZR</span> Bloom
        </h1>

        <div className="flex gap-4 text-2xl">
          <button>🔍</button>
          <button>🛒</button>
        </div>
      </div>
    </header>
  );
}
