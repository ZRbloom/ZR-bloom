export default function LegalPage({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <main className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-gray-500 text-sm mb-10">
                Última actualización: [fecha]
            </p>
            <div className="space-y-6 text-gray-700 leading-7 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#2D2D2D] [&_h2]:mt-10 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
                {children}
            </div>
        </main>
    );
}
