export const getRagContext = async (query: string) => {
  // Simulação de busca no NCP (Knowledge Base)
  const ncpKnowledgeBase = [
    { id: 1, content: "O NCP (Network Control Protocol) é um protocolo de controle de rede..." },
    { id: 2, content: "Configurações de rede recomendadas para o PromptEngine AI..." },
  ];
  
  return ncpKnowledgeBase.filter(item => item.content.toLowerCase().includes(query.toLowerCase()));
};
