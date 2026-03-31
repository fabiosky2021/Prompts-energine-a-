import { Search, Plus, Calendar, ThumbsUp, ThumbsDown, Star, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';

interface Prompt {
  id: string;
  content: string;
  createdAt: any;
  feedback?: string;
}

export default function History() {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filter, setFilter] = useState<'all' | 'best'>('all');

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(collection(db, 'prompts'), where('userId', '==', auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const promptsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Prompt));
      setPrompts(promptsData);
    });
    return unsubscribe;
  }, [auth.currentUser]);

  const handleFeedback = async (promptId: string, feedback: string) => {
    await updateDoc(doc(db, 'prompts', promptId), { feedback });
  };

  const filteredPrompts = filter === 'best' 
    ? prompts.filter(p => p.feedback === 'positive')
    : prompts;

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-surface-container-high text-2xl"
            >
              ◀️
            </button>
            <div>
              <h1 className="font-headline text-4xl font-bold tracking-tight">Galeria de Prompts</h1>
              <p className="text-on-surface-variant text-sm mt-1 opacity-70 uppercase tracking-widest">Seus melhores prompts refinados</p>
            </div>
          </div>
          <div className="flex bg-surface-container-high rounded-lg p-1">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'text-on-surface-variant'}`}
            >
              Todos
            </button>
            <button 
              onClick={() => setFilter('best')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${filter === 'best' ? 'bg-primary text-white' : 'text-on-surface-variant'}`}
            >
              <Star size={16} /> Melhores
            </button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <div key={prompt.id} className={`bg-surface-container-high p-6 rounded-2xl border ${prompt.feedback === 'positive' ? 'border-primary/50' : 'border-outline-variant/10'} hover:border-primary/50 transition-all duration-300 flex flex-col shadow-lg`}>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${prompt.feedback === 'positive' ? 'bg-primary/20 text-primary' : 'bg-outline-variant/20 text-outline'}`}>
                  {prompt.feedback === 'positive' ? 'Refinado' : 'Padrão'}
                </span>
                {prompt.feedback === 'positive' && <Star className="text-primary" size={18} fill="currentColor" />}
              </div>
              <p className="text-on-surface text-base font-medium leading-relaxed mb-6 flex-1">
                {prompt.content}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                <div className="flex items-center gap-2 text-outline">
                  <Calendar size={14} />
                  <span className="text-[10px] font-medium uppercase tracking-widest">
                    {prompt.createdAt?.toDate().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleFeedback(prompt.id, 'positive')} className={`p-2 rounded-full hover:bg-primary/10 ${prompt.feedback === 'positive' ? 'text-primary' : 'text-outline'}`}>
                    <ThumbsUp size={18} />
                  </button>
                  <button onClick={() => handleFeedback(prompt.id, 'negative')} className={`p-2 rounded-full hover:bg-error/10 ${prompt.feedback === 'negative' ? 'text-error' : 'text-outline'}`}>
                    <ThumbsDown size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
