export default function Hero() {
  return (
    <section className="bg-[#FCFAFF] py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-[#AD6899] uppercase tracking-[0.3em] mb-4">
          Hecho a mano en pequeñas tandas
        </p>

        <h2 className="text-5xl md:text-7xl font-bold text-[#2D2D2D] leading-tight">
          Impresiones 3D
          <br />
          con mucho cariño
        </h2>

        <p className="text-gray-600 text-xl mt-8 max-w-2xl mx-auto">
          Llaveros, decoración, figuras y productos personalizados creados
          capa a capa con materiales de alta calidad.
        </p>

        <button className="mt-10 bg-[#A7A6FF] hover:bg-[#8d8cff] transition text-white px-10 py-4 rounded-full text-lg font-semibold">
          Comprar ahora
        </button>
      </div>
    </section>
  );
}
