import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

const models = [
  { name: 'GPT-4o', speed: 85, quality: 95 },
  { name: 'Claude 3.5 Sonnet', speed: 80, quality: 98 },
  { name: 'Gemini 1.5 Pro', speed: 75, quality: 92 },
  { name: 'Llama 3.1 70B', speed: 95, quality: 88 },
];

export default function ModelComparison() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState(models[0].name);

  const handleExecute = async () => {
    // Simulação de chamada de API
    setResponse(`Resposta simulada do ${selectedModel} para: "${prompt}"`);
  };

  return (
    <div className="p-6 space-y-8 bg-surface-container-low min-h-screen">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-surface-container-high text-2xl"
        >
          ◀️
        </button>
        <h2 className="text-3xl font-bold font-headline">Comparação de Modelos de IA</h2>
      </div>
      
      <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10 shadow-lg h-96">
        <h3 className="font-headline font-semibold text-lg mb-4">Performance: Velocidade vs Qualidade</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={models} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="speed" fill="#8884d8" name="Velocidade" />
            <Bar dataKey="quality" fill="#82ca9d" name="Qualidade" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10 shadow-lg space-y-4">
          <h3 className="font-headline font-semibold text-lg">Selecionar Modelo</h3>
          <div className="space-y-2">
            {models.map(model => (
              <button
                key={model.name}
                onClick={() => setSelectedModel(model.name)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  selectedModel === model.name 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-container-low hover:bg-surface-container-high'
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10 shadow-lg space-y-4">
          <h3 className="font-headline font-semibold text-lg">Executar Teste ({selectedModel})</h3>
          <textarea 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 border rounded-lg h-32 bg-surface-container-low"
            placeholder="Digite seu prompt aqui..."
          />
          <button onClick={handleExecute} className="w-full bg-primary text-white p-3 rounded-lg font-bold hover:bg-primary/90">Executar</button>
          <div className="p-4 bg-surface-container-low rounded-lg h-32 overflow-y-auto">
            {response || "Aguardando execução..."}
          </div>
        </div>
      </div>
    </div>
  );
}
