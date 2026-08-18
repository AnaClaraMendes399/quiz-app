import { useState } from 'react';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import questions from '../questions.json';

export default function HomePage() {
  // =========================================================
  // ESTADOS DO QUIZ
  // =========================================================

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);

  const [score, setScore] = useState(0);

  // Controla qual tela será exibida
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // =========================================================
  // PERGUNTA ATUAL
  // =========================================================

  const currentQuestion = questions[currentQuestionIndex];

  // =========================================================
  // RESPONDER QUESTÃO
  // =========================================================

  const handleOptionPress = (option: string) => {
    // Impede que uma segunda resposta seja selecionada
    if (isOptionsDisabled) {
      return;
    }

    if (option === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedOption(option);
    setIsOptionsDisabled(true);
  };

  // =========================================================
  // PRÓXIMA PERGUNTA
  // =========================================================

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Vai para a próxima pergunta
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

      // Limpa a resposta anterior
      setSelectedOption(null);

      // Libera novamente as alternativas
      setIsOptionsDisabled(false);
    } else {
      // Última pergunta respondida
      setIsQuizFinished(true);
    }
  };

  // =========================================================
  // JOGAR NOVAMENTE
  // =========================================================

  const handlePlayAgain = () => {
    // Volta para a tela do quiz
    setIsQuizFinished(false);

    // Volta para a primeira pergunta
    setCurrentQuestionIndex(0);

    // Nenhuma alternativa selecionada
    setSelectedOption(null);

    // Libera as alternativas
    setIsOptionsDisabled(false);

    // Zera a pontuação
    setScore(0);
  };

  // =========================================================
  // RENDERIZAÇÃO CONDICIONAL
  // =========================================================

  if (isQuizFinished) {
    return (
      <ResultScreen
        score={score}
        totalQuestions={questions.length}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return (
    <QuizScreen
      currentQuestion={currentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={questions.length}
      score={score}
      selectedOption={selectedOption}
      isOptionsDisabled={isOptionsDisabled}
      onOptionPress={handleOptionPress}
      onNextQuestion={handleNextQuestion}
    />
  );
}