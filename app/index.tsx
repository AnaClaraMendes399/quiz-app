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

  // Quantidade de vidas
  const [lives, setLives] = useState(3);

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

    // Começa cada partida com 3 vidas
    setLives(3);

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
  // IR PARA PRÓXIMA PERGUNTA
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
  // RESPONDER QUESTÃO
  // =========================================================

  const handleOptionPress = (option: string) => {
    // Impede clicar em outra alternativa enquanto a resposta
    // está sendo mostrada
    if (isOptionsDisabled) {
      return;
    }

    const isCorrect = option === currentQuestion.correctAnswer;

    // Mostra a alternativa escolhida
    setSelectedOption(option);

    // Bloqueia todas as alternativas
    setIsOptionsDisabled(true);

    // =======================================================
    // RESPOSTA CORRETA
    // =======================================================

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);

      // Aguarda 700ms para mostrar a resposta verde
      // e depois passa automaticamente
      setTimeout(() => {
        handleNextQuestion();
      }, 700);

      return;
    }

    // =======================================================
    // RESPOSTA ERRADA
    // =======================================================

    setLives((prevLives) => {
      const newLives = prevLives - 1;

      // Se acabou as vidas, mostra a resposta por 700ms
      // e depois vai para o resultado
      if (newLives === 0) {
        setTimeout(() => {
          setIsQuizFinished(true);
        }, 700);
      } else {
        // Ainda possui vidas:
        // mostra a resposta errada e depois continua
        setTimeout(() => {
          handleNextQuestion();
        }, 700);
      }

      return newLives;
    });
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

    // Recupera as 3 vidas
    setLives(3);

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
      lives={lives}
      selectedOption={selectedOption}
      isOptionsDisabled={isOptionsDisabled}
      onOptionPress={handleOptionPress}
    />
  );
}