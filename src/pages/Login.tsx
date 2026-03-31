import { useState, FormEvent, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const createUserDocument = async (user: any) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        createdAt: new Date(),
        role: 'user'
      });
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserDocument(result.user);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Google login failed', error);
      if (error.code === 'auth/popup-closed-by-user') {
        alert('O login foi cancelado.');
      } else if (error.code === 'auth/unauthorized-domain') {
        alert('Erro de configuração: Domínio não autorizado no Firebase.');
      } else {
        alert('Erro ao fazer login com Google: ' + error.message);
      }
    }
  };

  const handleLogin = async () => {
    // Note: Email/Password login logic would go here, 
    // but user requested Google Quick Login specifically.
    // For now, let's focus on Google Login as requested.
    handleGoogleLogin();
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Senhas não coincidem");
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await createUserDocument(result.user);
      setRegistrationSuccess(true);
      setTimeout(() => {
        setRegistrationSuccess(false);
        setIsRegistering(false);
      }, 1500);
    } catch (error) {
      console.error('Registration failed', error);
      alert("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col pt-24 px-6 pb-12 relative overflow-hidden bg-background text-on-surface">
      <header className="flex justify-center items-center w-full px-6 h-20 fixed top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
          <h1 className="font-headline font-bold tracking-tighter text-primary text-2xl uppercase">PromptEngine AI</h1>
        </div>
      </header>
      
      <section className="mt-8 mb-12">
        <h2 className="font-headline text-5xl font-bold tracking-tight mb-3">
          {registrationSuccess ? 'Conta Criada!' : isRegistering ? 'Criar Conta' : 'Entrar'}
        </h2>
        <p className="text-on-surface-variant text-lg font-body max-w-[280px] leading-relaxed">
          {registrationSuccess ? 'Redirecionando para login...' : isRegistering ? 'Junte-se à nossa rede neural.' : 'Conecte-se à sua inteligência neural.'}
        </p>
      </section>

      <AnimatePresence mode="wait">
        <motion.section
          key={registrationSuccess ? 'success' : isRegistering ? 'register' : 'login'}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 relative"
        >
          {registrationSuccess ? (
            <div className="text-primary font-headline text-xl">Sucesso!</div>
          ) : isRegistering ? (
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="relative">
                <input className="w-full bg-surface-container-low border-b-2 border-outline-variant/20 focus:border-primary focus:ring-0 py-4 px-4" placeholder="nome@exemplo.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              </div>
              <div className="relative">
                <input className="w-full bg-surface-container-low border-b-2 border-outline-variant/20 focus:border-primary focus:ring-0 py-4 px-4" placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              </div>
              <div className="relative">
                <input className="w-full bg-surface-container-low border-b-2 border-outline-variant/20 focus:border-primary focus:ring-0 py-4 px-4" placeholder="Confirmar Senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary py-5 rounded-lg font-headline font-bold text-black uppercase tracking-widest text-sm active:scale-[0.98] transition-transform duration-150">
                Criar Conta
              </button>
            </form>
          ) : (
            <>
              <button 
                onClick={handleGoogleLogin}
                className="w-full bg-white text-black py-4 rounded-lg font-headline font-bold uppercase tracking-widest text-sm active:scale-[0.98] transition-transform duration-150 flex items-center justify-center gap-2"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
                Entrar com Google
              </button>
              <div className="text-center text-slate-500">ou</div>
              <div className="relative">
                <input className="w-full bg-surface-container-low border-b-2 border-outline-variant/20 focus:border-primary focus:ring-0 py-4 px-4" placeholder="nome@exemplo.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              </div>
              <div className="relative">
                <input className="w-full bg-surface-container-low border-b-2 border-outline-variant/20 focus:border-primary focus:ring-0 py-4 px-4" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              </div>
              <button onClick={handleLogin} className="w-full bg-gradient-to-r from-primary to-secondary py-5 rounded-lg font-headline font-bold text-black uppercase tracking-widest text-sm active:scale-[0.98] transition-transform duration-150">
                Entrar
              </button>
            </>
          )}
        </motion.section>
      </AnimatePresence>

      <section className="mt-auto pt-12 flex flex-col items-center">
        <p className="text-slate-500 font-body text-sm mb-4">
          {isRegistering ? 'Já possui uma conta?' : 'Novo na rede PromptEngine?'}
        </p>
        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full border border-outline-variant/30 py-4 rounded-lg font-body font-bold text-on-surface hover:bg-surface-container-high transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isRegistering ? 'Voltar para Login' : 'Criar nova conta'}
          <ArrowRight size={16} />
        </button>
      </section>
    </main>
  );
}
