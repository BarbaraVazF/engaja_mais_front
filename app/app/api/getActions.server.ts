export async function getActions(id: string) {
  return [
    {
      title: "Plano de ensino personalizado",
      color: "#FFDB00",
      key: "LEARN_PLAN",
    },
    {
      title: "Materiais de estudo e atividades para casa",
      color: "#FE3B3E",
      key: "MATERIALS",
    },
    {
      title: "Modelo de avaliação individualizado",
      color: "#45A3FE",
      key: "EVALUATION_MODEL",
    },
    {
      title: "Estratégia de gamificação",
      color: "#0251B1",
      key: "GAMIFICATION",
    },
  ];
}
