import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth';
import Sidebar from '../components/Sidebar';

export default function EditProfile() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
  const [photoURL, setPhotoURL] = useState(auth.currentUser?.photoURL || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName, photoURL });
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Erro ao atualizar perfil.');
    } finally {
      setLoading(false);
    }
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
            <h1 className="font-headline text-4xl font-bold tracking-tight">Editar Perfil</h1>
            <p className="text-on-surface-variant text-sm mt-1 font-medium tracking-wide uppercase">Atualize seus dados</p>
          </div>
        </header>

        <section className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10 shadow-lg space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome de Exibição</label>
            <input 
              type="text" 
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL da Foto de Perfil</label>
            <input 
              type="text" 
              value={photoURL} 
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20"
            />
          </div>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full h-14 bg-primary text-black font-headline font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 rounded-lg active:scale-95 transition-transform duration-150"
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </section>
      </main>
    </div>
  );
}
