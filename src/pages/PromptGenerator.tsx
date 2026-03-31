import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Zap, Copy, Save, RefreshCw, Share2 } from 'lucide-react';

export default function PromptGenerator() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<any>(null);

  const handleGenerate = () => {
    setOutput({
      main: 'A futuristic AI interface with neon gradients...',
      variations: ['Variation 1', 'Variation 2', 'Variation 3'],
      simple: 'Simple version of the prompt.',
      advanced: 'Advanced version with complex parameters.',
      score: 85,
    });
  };

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-surface-container-high text-2xl"
          >
            ◀️
          </button>
          <h2 className="font-headline text-2xl font-bold">Prompt Generator</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10 shadow-lg">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-64 bg-surface-container-lowest p-4 rounded-lg text-on-surface border border-outline-variant/20 focus:border-primary outline-none"
              placeholder="Enter your prompt here..."
            />
            <button
              onClick={handleGenerate}
              className="w-full mt-4 bg-gradient-to-r from-primary to-secondary py-4 rounded-lg font-headline font-bold text-black uppercase tracking-widest"
            >
              Generate Prompt
            </button>
          </section>
        </div>

        {output && (
          <section className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10 shadow-lg space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline text-2xl font-bold">Output</h2>
              <span className="text-primary font-bold text-xl">{output.score}/100</span>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-lg">
              <p className="text-on-surface-variant font-mono">{output.main}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {output.variations.map((v: string, i: number) => (
                <div key={i} className="bg-surface-container-lowest p-3 rounded-lg text-center text-sm">{v}</div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-high py-2 rounded-lg hover:bg-primary/20"><Copy size={16} /> Copy</button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-high py-2 rounded-lg hover:bg-primary/20"><Save size={16} /> Save</button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-high py-2 rounded-lg hover:bg-primary/20"><RefreshCw size={16} /> Evolve</button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-high py-2 rounded-lg hover:bg-primary/20"><Share2 size={16} /> Share</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
