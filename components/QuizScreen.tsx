import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';

import questions from '../questions.json';
import background from '../assets/teladefundo.jpg';
import logo from '../assets/logo.png';

export default function QuizScreen() {
  const { width, height } = useWindowDimensions();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const isMobile = width < 600;

  const contentWidth = isMobile
    ? '100%'
    : width > 1200
    ? 780
    : width * 0.82;

  const questionSize = isMobile ? 18 : 22;
  const optionSize = isMobile ? 16 : 18;


  const progress =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    setIsOptionsDisabled(true);

    const isCorrect = option === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };


  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setIsOptionsDisabled(false);
    } else {
      setShowResult(true);
    }
  };

  const getOptionStyle = (option: string) => {
    if (selectedOption) {
      const isCorrect = option === currentQuestion.correctAnswer;
      
      if (isCorrect) {
        return styles.correctOption;
      }
      
      if (option === selectedOption && !isCorrect) {
        return styles.incorrectOption;
      }
    }
    return {};
  };


  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
  };

  if (showResult) {
    return (
      <ImageBackground
        source={background}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.darkOverlay}>
          <View
            style={[
              styles.resultCard,
              {
                width: contentWidth,
              },
            ]}
          >
            <Image
              source={logo}
              style={[
                styles.logoImage,
                {
                  height: isMobile ? 75 : 110,
                },
              ]}
              resizeMode="contain"
            />

            <View style={styles.resultDivider} />

            <Text style={styles.resultTitle}>
              RESULTADO FINAL
            </Text>

            <Text style={styles.resultLabel}>
              Sua pontuação
            </Text>

            <Text style={styles.resultScore}>
              {score}
              <Text style={styles.resultTotal}>
                {' '}/ {totalQuestions}
              </Text>
            </Text>

            <Text style={styles.resultMessage}>
              {score === totalQuestions
                ? 'PERFEITO! Você conhece muito de Minecraft!'
                : score >= totalQuestions / 2
                ? 'Muito bem! Você mandou bem!'
                : 'Continue praticando e tente novamente!'}
            </Text>

            <TouchableOpacity
              style={styles.restartButton}
              onPress={resetQuiz}
              activeOpacity={0.8}
            >
              <Text style={styles.restartButtonText}>
                JOGAR NOVAMENTE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={background}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.darkOverlay}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            {
              minHeight: height,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.content,
              {
                width: contentWidth,
              },
            ]}
          >
            {/* LOGO */}
            <View style={styles.header}>
              <Image
                source={logo}
                style={[
                  styles.logoImage,
                  {
                    height: isMobile ? 80 : 125,
                  },
                ]}
                resizeMode="contain"
              />
            </View>

            {/* PLACAR (Capítulo 9) */}
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Pontuação: {score}</Text>
            </View>

            {/* PROGRESSO */}
            <View style={styles.progressSection}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>
                  PERGUNTA {currentQuestionIndex + 1}
                </Text>
                <Text style={styles.progressText}>
                  {totalQuestions}
                </Text>
              </View>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${progress}%`,
                    },
                  ]}
                />
              </View>
            </View>

            {/* PERGUNTA */}
            <View style={styles.questionCard}>
              <View style={styles.questionTop}>
                <Text style={styles.questionTag}>
                  PERGUNTA
                </Text>
              </View>

              <Text
                style={[
                  styles.questionText,
                  {
                    fontSize: questionSize,
                    lineHeight: isMobile ? 25 : 30,
                  },
                ]}
              >
                {currentQuestion.question}
              </Text>
            </View>

            {/* RESPOSTAS */}
            <View style={styles.answers}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.answer, getOptionStyle(option)]}
                  onPress={() => handleAnswer(option)}
                  disabled={isOptionsDisabled}
                  activeOpacity={0.75}
                >
                  <View style={styles.answerNumber}>
                    <Text style={styles.answerNumberText}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.answerText,
                      {
                        fontSize: optionSize,
                      },
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* BOTÃO PRÓXIMA PERGUNTA (Renderização Condicional do Capítulo 9) */}
            {selectedOption && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextQuestion}
                activeOpacity={0.8}
              >
                <Text style={styles.nextButtonText}>Próxima Pergunta</Text>
              </TouchableOpacity>
            )}

            {/* RODAPÉ */}
            <Text style={styles.footerText}>
              Escolha uma alternativa para continuar
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  content: {
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoImage: {
    width: '100%',
    alignSelf: 'center',
  },
  scoreContainer: {
    marginBottom: 12,
    alignItems: 'center',
  },
  scoreText: {
    color: '#D6A85C',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  progressSection: {
    marginBottom: 14,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  progressBackground: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#69B82E',
    borderRadius: 5,
  },
  questionCard: {
    width: '100%',
    backgroundColor: 'rgba(91, 58, 28, 0.96)',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#3A2112',
    paddingHorizontal: 22,
    paddingVertical: 22,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  questionTop: {
    alignItems: 'center',
    marginBottom: 10,
  },
  questionTag: {
    color: '#D6A85C',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
  },
  questionText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '800',
  },
  answers: {
    width: '100%',
    gap: 10,
  },
  answer: {
    width: '100%',
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 108, 27, 0.96)',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#244D15',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  answerNumber: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#244D15',
    borderRadius: 7,
    marginRight: 12,
  },
  answerNumberText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  answerText: {
    flex: 1,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'left',
  },
  // ESTILO DO BOTÃO PRÓXIMA PERGUNTA (Capítulo 9)
  nextButton: {
    backgroundColor: '#3F7D20',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#244D15',
    marginTop: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  footerText: {
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 18,
    fontWeight: '500',
  },
  resultCard: {
    alignSelf: 'center',
    backgroundColor: 'rgba(35, 35, 35, 0.94)',
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#3F7D20',
    paddingHorizontal: 30,
    paddingVertical: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  resultDivider: {
    width: 70,
    height: 3,
    backgroundColor: '#69B82E',
    marginTop: 5,
    marginBottom: 25,
    borderRadius: 3,
  },
  resultTitle: {
    color: '#D6A85C',
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
  },
  resultLabel: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 4,
  },
  resultScore: {
    color: '#FFFFFF',
    fontSize: 58,
    fontWeight: '900',
    marginBottom: 10,
  },
  resultTotal: {
    color: '#AAAAAA',
    fontSize: 30,
  },
  resultMessage: {
    color: '#DDDDDD',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 25,
    maxWidth: 500,
  },
  restartButton: {
    backgroundColor: '#3F7D20',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#244D15',
    minWidth: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.95)',
  },
  incorrectOption: {
    borderColor: '#F44336',
    backgroundColor: 'rgba(244, 67, 54, 0.95)',
  },
});