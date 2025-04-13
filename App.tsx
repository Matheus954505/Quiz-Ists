
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const questions = [
  {
    question: "Se eu beijar alguém com HIV, eu posso pegar o vírus.",
    options: ["Verdadeiro", "Falso"],
    answer: "Falso",
    feedback: "HIV não é transmitido por beijo, abraço ou carinho."
  },
  {
    question: "Qual destas atitudes ajuda a se proteger das ISTs?",
    options: ["Compartilhar agulhas", "Usar camisinha", "Evitar o médico", "Tomar banho depois do sexo"],
    answer: "Usar camisinha",
    feedback: "Usar camisinha é uma das formas mais seguras de se proteger das ISTs."
  },
  {
    question: "HIV tem cura?",
    options: ["Sim", "Não"],
    answer: "Não",
    feedback: "O HIV não tem cura, mas pode ser controlado com tratamento."
  },
  {
    question: "A sífilis pode causar problemas no coração e no cérebro se não for tratada.",
    options: ["Verdadeiro", "Falso"],
    answer: "Verdadeiro",
    feedback: "A sífilis terciária pode afetar vários órgãos se não for tratada."
  },
  {
    question: "Qual é um sintoma da hepatite C na fase aguda?",
    options: ["Dor de dente", "Fadiga", "Tosse", "Coceira"],
    answer: "Fadiga",
    feedback: "Fadiga é comum na fase aguda da hepatite C."
  },
  {
    question: "A sífilis só é transmitida pelo sexo.",
    options: ["Verdadeiro", "Falso"],
    answer: "Falso",
    feedback: "Ela também pode ser passada da mãe para o bebê."
  },
  {
    question: "O que é um cancro duro?",
    options: ["Um caroço no pescoço", "Uma ferida da sífilis primária", "Uma dor de garganta", "Um tipo de tosse"],
    answer: "Uma ferida da sífilis primária",
    feedback: "É o primeiro sinal da sífilis adquirida."
  },
  {
    question: "Posso pegar hepatite C ao compartilhar alicate de unha?",
    options: ["Sim", "Não"],
    answer: "Sim",
    feedback: "Objetos cortantes contaminados podem transmitir hepatite C."
  },
  {
    question: "O HIV pode ser transmitido durante a amamentação?",
    options: ["Sim", "Não"],
    answer: "Sim",
    feedback: "Pode ser transmitido se não houver tratamento adequado."
  },
  {
    question: "O que significa Indetectável = Intransmissível?",
    options: ["Que a pessoa não existe", "Que a pessoa está curada", "Que não transmite o vírus", "Que pode beijar sem medo"],
    answer: "Que não transmite o vírus",
    feedback: "Com o tratamento certo, a carga viral fica tão baixa que o HIV não é transmitido."
  },
  {
    question: "Como posso saber se tenho uma IST?",
    options: ["Pelo cheiro", "Fazendo um teste", "Esperando aparecer feridas", "Perguntando para amigos"],
    answer: "Fazendo um teste",
    feedback: "A testagem é a única forma segura de saber."
  },
  {
    question: "Camisinha protege contra todas as ISTs?",
    options: ["Sim", "Não"],
    answer: "Sim",
    feedback: "É uma das principais formas de prevenção."
  },
  {
    question: "O tratamento da hepatite C pode curar a doença?",
    options: ["Sim", "Não"],
    answer: "Sim",
    feedback: "Os antivirais modernos curam mais de 95% dos casos."
  },
  {
    question: "A sífilis congênita pode ser evitada com teste no pré-natal?",
    options: ["Sim", "Não"],
    answer: "Sim",
    feedback: "A testagem da gestante é essencial para proteger o bebê."
  },
  {
    question: "Posso usar a mesma seringa que um amigo se for só uma vez?",
    options: ["Sim", "Não"],
    answer: "Não",
    feedback: "Compartilhar seringas é muito perigoso."
  }
];

export default function QuizGame() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selected, setSelected] = useState("");

  const handleAnswer = (option: string) => {
    if (showFeedback) return;
    setSelected(option);
    setShowFeedback(true);
    if (option === questions[current].answer) {
      setScore(score + 10);
    } else {
      setScore(score - 5);
    }
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setSelected("");
    setCurrent(current + 1);
  };

  if (current >= questions.length) {
    return (
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold mb-4">Parabéns!</h2>
        <p className="text-lg">Você finalizou o quiz com {score} pontos!</p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4 shadow-xl rounded-2xl">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">{q.question}</h2>
        <div className="space-y-2">
          {q.options.map((option) => (
            <Button
              key={option}
              className={`w-full justify-start ${
                showFeedback && option === q.answer
                  ? "bg-green-200"
                  : showFeedback && option === selected
                  ? "bg-red-200"
                  : ""
              }`}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </Button>
          ))}
        </div>
        {showFeedback && (
          <div className="mt-4">
            <p className="italic text-sm">{q.feedback}</p>
            <Button className="mt-2" onClick={nextQuestion}>
              Próxima Pergunta
            </Button>
          </div>
        )}
        <p className="mt-6 text-right text-sm text-gray-500">
          Pontuação: {score}
        </p>
      </CardContent>
    </Card>
  );
}
