import { Edit3, LogOut, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Sidebar from '../components/Sidebar';

export default function Profile() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <main className="flex-1 p-8 max-w-2xl mx-auto">
        <header className="mb-8 flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-surface-container-high text-2xl"
          >
            ◀️
          </button>
          <div>
            <h1 className="font-headline text-4xl font-bold tracking-tight">Perfil</h1>
            <p className="text-on-surface-variant text-sm mt-1 font-medium tracking-wide uppercase">Gerencie sua conta</p>
          </div>
        </header>

        <section className="relative py-8 flex flex-col items-center bg-surface-container-high rounded-xl border border-outline-variant/10 shadow-lg mb-8">
          <div className="relative w-32 h-32 rounded-full border-2 border-primary p-1 bg-surface-container">
            <img src={auth.currentUser?.photoURL || ''} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="absolute top-8 bg-primary px-3 py-1 rounded-full shadow-[0_0_15px_rgba(109,221,255,0.6)]">
            <span className="text-[10px] font-headline font-bold text-black tracking-wider uppercase">Mestre em Prompts</span>
          </div>
          <div className="mt-6 text-center">
            <h1 className="font-headline text-2xl font-bold tracking-tight">{auth.currentUser?.displayName || 'Usuário'}</h1>
            <p className="text-on-surface-variant text-sm mt-1 font-medium tracking-wide">ID: #OMX-9921-A</p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 w-full mb-8">
          <div className="col-span-2 bg-surface-container-high p-5 rounded-lg border border-outline-variant/10">
            <span className="text-[10px] font-bold tracking-[0.15em] text-outline uppercase mb-4 block">Economia Total</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-headline font-bold text-primary">R$ 1.420</span>
              <span className="text-sm text-primary/60 font-medium">/mês</span>
            </div>
          </div>
          <div className="bg-surface-container-high p-4 rounded-lg border border-outline-variant/10">
            <span className="text-[10px] font-bold tracking-[0.15em] text-outline uppercase">Total de Prompts</span>
            <div className="mt-2 text-2xl font-headline font-bold">1,284</div>
            <div className="mt-1 flex items-center text-primary text-[10px] font-bold">
              <TrendingUp size={14} className="mr-1" /> +12% este mês
            </div>
          </div>
        </section>

        <section className="w-full space-y-3">
          <button onClick={() => navigate('/edit-profile')} className="w-full h-14 bg-primary text-black font-headline font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 rounded-lg active:scale-95 transition-transform duration-150">
            <Edit3 size={18} /> Editar Perfil
          </button>
          <button onClick={handleLogout} className="w-full h-14 bg-surface-container-highest border border-outline-variant/20 text-error font-headline font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 rounded-lg active:scale-95 transition-transform duration-150">
            <LogOut size={18} /> Sair
          </button>
        </section>
      </main>
    </div>
  );
}
