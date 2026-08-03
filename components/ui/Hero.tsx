import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#FCFAFF]">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Texto */}
          <div>
            <p className="uppercase tracking-[0.35em] text-[#AD6899] text-sm mb-5">
              Hecho a mano · Impresión 3D
            </p>

            <h1 className="text-5xl lg:text-7xl font-bold text-[#2D2D2D] leading-tight">
              Impresiones 3D
              <br />
              con mucho cariño
            </h1>

            <p className="text-xl text-gray-600 mt-8 max-w-lg leading-8">
              Llaveros, decoración, figuras y regalos personalizados creados
              capa a capa con materiales de alta calidad.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <button className="bg-[#A7A6FF] hover:bg-[#8f8df6] text-white px-8 py-4 rounded-full font-semibold transition">
                Comprar ahora
              </button>

              <button className="border border-[#A7A6FF] text-[#A7A6FF] hover:bg-[#F4F1FF] px-8 py-4 rounded-full font-semibold transition">
                Ver catálogo
              </button>
            </div>
          </div>

          {/* Imagen */}
          <div className="flex justify-center">
            <div className="bg-white rounded-[40px] shadow-2xl p-6">
              <Image
                src="/hero/hero.png"
                alt="Producto destacado"
                width={600}
                height={600}
                className="rounded-3xl object-cover"
                priority
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}