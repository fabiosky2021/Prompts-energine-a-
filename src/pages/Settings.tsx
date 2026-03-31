import { Search, MoreVertical, Fingerprint, History as HistoryIcon, Settings as SettingsIcon, User, Key, Sliders, Bell, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="mb-8 flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-surface-container-high text-2xl"
          >
            ◀️
          </button>
          <div>
            <h1 className="font-headline text-4xl font-bold tracking-tight">Ajustes</h1>
            <p className="text-on-surface-variant text-sm mt-1 font-medium tracking-wide uppercase">Configuração do Sistema Neural</p>
          </div>
        </header>

        <section className="mb-10 bg-surface-container-high p-6 rounded-xl border border-outline-variant/10 shadow-lg">
          <h2 className="font-headline text-xl font-semibold mb-6 flex items-center gap-2">
            <Sliders className="text-primary" size={20} /> Modelo de Linguagem
          </h2>
          <select className="w-full bg-surface-container-low p-4 rounded-lg border border-outline-variant/20 focus:border-primary outline-none">
            <option>Gemini Pro</option>
            <option>Claude 3 Sonnet</option>
            <option>GPT-4o</option>
          </select>
        </section>
      </main>
    </div>
  );
}
