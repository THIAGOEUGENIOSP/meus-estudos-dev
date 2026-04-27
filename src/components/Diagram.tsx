interface DiagramProps {
  title: string;
  children: string;
}

export default function Diagram({ title, children }: DiagramProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-4">
      <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs text-gray-400 font-mono">{title}</span>
      </div>
      <pre className="p-4 text-sm text-emerald-400 font-mono overflow-x-auto whitespace-pre leading-relaxed">
        {children}
      </pre>
    </div>
  );
}
