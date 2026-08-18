import { useState } from 'react';

import StartScreen from '../components/StartScreen';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';

import questions from '../questions.json';

export default function HomePage() {
  // =========================================================
  // SORTEAR 10 PERGUNTAS ENTRE AS 20
  // =========================================================

  const getRandomQuestions = () => {
    const shuffledQuestions = [...questions].sort(
      () => Math.random() - 0.5
    );

    return shuffledQuestions.slice(0, 10);
  };

  // =========================================================
  // ESTADOS DO QUIZ
  // =========================================================

  const [quizQuestions, setQuizQuestions] = useState(
    getRandomQuestions()
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);

  const [score, setScore] = useState(0);

  // Controla se o quiz terminou
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Controla se o quiz já começou
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  // =========================================================
  // PERGUNTA ATUAL
  // =========================================================

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // =========================================================
  // COMEÇAR QUIZ
  // =========================================================

  const handleStartQuiz = () => {
    // Sorteia novas 10 perguntas
    setQuizQuestions(getRandomQuestions());

    // Começa da primeira pergunta
    setCurrentQuestionIndex(0);

    // Zera pontuação
    setScore(0);

    // Limpa resposta
    setSelectedOption(null);

    // Libera alternativas
    setIsOptionsDisabled(false);

    // Começa o quiz
    setIsQuizStarted(true);

    // Garante que não está na tela de resultado
    setIsQuizFinished(false);
  };

  // =========================================================
  // RESPONDER QUESTÃO
  // =========================================================

  const handleOptionPress = (option: string) => {
    // Impede selecionar mais de uma alternativa
    if (isOptionsDisabled) {
      return;
    }

    // Verifica se acertou
    if (option === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    // Guarda a alternativa escolhida
    setSelectedOption(option);

    // Bloqueia as alternativas
    setIsOptionsDisabled(true);
  };

  // =========================================================
  // PRÓXIMA PERGUNTA
  // =========================================================

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      // Vai para a próxima pergunta
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

      // Limpa a resposta anterior
      setSelectedOption(null);

      // Libera as alternativas
      setIsOptionsDisabled(false);
    } else {
      // As 10 perguntas terminaram
      setIsQuizFinished(true);
    }
  };

  // =========================================================
  // JOGAR NOVAMENTE
  // =========================================================

  const handlePlayAgain = () => {
    // Sorteia uma nova combinação de 10 perguntas
    setQuizQuestions(getRandomQuestions());

    // Volta para a primeira pergunta
    setCurrentQuestionIndex(0);

    // Nenhuma alternativa selecionada
    setSelectedOption(null);

    // Libera as alternativas
    setIsOptionsDisabled(false);

    // Zera a pontuação
    setScore(0);

    // Sai da tela de resultado
    setIsQuizFinished(false);

    // Continua no quiz
    setIsQuizStarted(true);
  };

  // =========================================================
  // TELA INICIAL
  // =========================================================

  if (!isQuizStarted) {
    return <StartScreen onStart={handleStartQuiz} />;
  }

  // =========================================================
  // TELA DE RESULTADO
  // =========================================================

  if (isQuizFinished) {
    return (
      <ResultScreen
        score={score}
        totalQuestions={quizQuestions.length}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  // =========================================================
  // TELA DO QUIZ
  // =========================================================

  return (
    <QuizScreen
      currentQuestion={currentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={quizQuestions.length}
      score={score}
      selectedOption={selectedOption}
      isOptionsDisabled={isOptionsDisabled}
      onOptionPress={handleOptionPress}
      onNextQuestion={handleNextQuestion}
    />
  );
}