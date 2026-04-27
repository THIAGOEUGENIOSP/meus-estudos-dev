import { Copy, Check } from 'lucide-react';
import { useState, type ReactNode } from 'react';

interface TopicCardProps {
  title: string;
  definition: string;
  children?: ReactNode;
  whenToUse?: string[];
  whenNotToUse?: string[];
  code?: string;
  result?: string;
  errors?: string[];
  tips?: string[];
  checklist?: string[];
}

export default function TopicCard({ title, definition, children, whenToUse, whenNotToUse, code, result, errors, tips, checklist }: TopicCardProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-emerald-700 font-medium mb-4">{definition}</p>
      {children}
      {whenToUse && (
        <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg"><p className="font-semibold text-blue-800 text-sm mb-1">Quando usar:</p><ul className="list-disc list-inside text-sm text-blue-700 space-y-1">{whenToUse.map((w, i) => <li key={i}>{w}</li>)}</ul></div>
      )}
      {whenNotToUse && (
        <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg"><p className="font-semibold text-red-800 text-sm mb-1">Quando não usar:</p><ul className="list-disc list-inside text-sm text-red-700 space-y-1">{whenNotToUse.map((w, i) => <li key={i}>{w}</li>)}</ul></div>
      )}
      {code && (
        <div className="mt-4 bg-gray-900 rounded-lg overflow-hidden"><div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700"><span className="text-xs text-gray-400 font-mono">código</span><button onClick={() => handleCopy(code)} className="text-gray-400 hover:text-white">{copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}</button></div><pre className="p-4 text-sm text-green-400 font-mono overflow-x-auto whitespace-pre-wrap">{code}</pre></div>
      )}
      {result && (
        <div className="mt-4 bg-white border border-gray-300 rounded-lg p-4"><p className="text-xs text-gray-400 mb-1 font-semibold">Resultado:</p><pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">{result}</pre></div>
      )}
      {errors?.map((err, i) => (
        <div key={i} className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3"><p className="text-sm text-red-700 font-mono">{err}</p></div>
      ))}
      {tips?.map((tip, i) => (
        <div key={i} className="mt-3 bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg"><p className="text-sm text-amber-800">💡 {tip}</p></div>
      ))}
      {checklist && (
        <div className="mt-4 space-y-2">{checklist.map((item, i) => (
          <label key={i} className="flex items-start gap-2 cursor-pointer"><input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" /><span className="text-sm text-gray-700">{item}</span></label>
        ))}</div>
      )}
    </div>
  );
}
