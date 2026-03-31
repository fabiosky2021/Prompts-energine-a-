import { BarChart3, Users, Zap, Globe } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import Sidebar from '../components/Sidebar';

const data = [
  { name: 'Buyer', value: 400 },
  { name: 'Interested', value: 300 },
  { name: 'Curious', value: 300 },
  { name: 'Time-waster', value: 200 },
];

const COLORS = ['#8b5cf6', '#3b82f6', '#06b6d4', '#ef4444'];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-on-surface-variant text-sm mt-1 uppercase tracking-widest">Visão Geral do PromptEngine AI</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Total Prompts', value: '1,284', icon: Zap },
            { title: 'Languages Detected', value: '12', icon: Globe },
            { title: 'User Types', value: '4', icon: Users },
          ].map((card, i) => (
            <div key={i} className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-headline font-semibold text-lg">{card.title}</h3>
                <card.icon className="text-primary" size={24} />
              </div>
              <p className="text-4xl font-bold tracking-tighter">{card.value}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10 shadow-lg">
            <h3 className="font-headline font-semibold text-lg mb-6">User Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10 shadow-lg">
            <h3 className="font-headline font-semibold text-lg mb-6">Usage Heatmap</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}
