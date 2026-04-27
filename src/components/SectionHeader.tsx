interface SectionHeaderProps {
  number: number;
  title: string;
  subtitle: string;
}

export default function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-lg">
          {number}
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{title}</h2>
      </div>
      <p className="text-gray-500 ml-[52px]">{subtitle}</p>
      <div className="mt-4 h-1 w-16 bg-emerald-500 rounded-full" />
    </div>
  );
}
