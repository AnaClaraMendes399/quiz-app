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

import background from '../assets/teladefundo.jpg';
import logo from '../assets/logo.png';

// =========================================================
// TIPO DA PERGUNTA
// =========================================================

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

// =========================================================
// PROPS DO QUIZSCREEN
// =========================================================

type QuizScreenProps = {
  currentQuestion: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  selectedOption: string | null;
  isOptionsDisabled: boolean;
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
};

// =========================================================
// COMPONENTE
// =========================================================

export default function QuizScreen({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  score,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
  onNextQuestion,
}: QuizScreenProps) {
  const { width, height } = useWindowDimensions();

  const isMobile = width < 600;

  // =========================================================
  // LARGURA DO QUIZ
  // =========================================================

  const contentWidth = isMobile
    ? '100%'
    : width >= 1200
    ? 760
    : width * 0.90;

  const questionSize = isMobile ? 18 : 22;
  const optionSize = isMobile ? 16 : 18;

  // =========================================================
  // PROGRESSO
  // =========================================================

  const progress =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // =========================================================
  // ESTILO DAS RESPOSTAS
  // =========================================================

  const getOptionStyle = (option: string) => {
    if (selectedOption) {
      const isCorrect =
        option === currentQuestion.correctAnswer;

      if (isCorrect) {
        return styles.correctOption;
      }

      if (option === selectedOption && !isCorrect) {
        return styles.incorrectOption;
      }
    }

    return {};
  };

  // =========================================================
  // TELA DO QUIZ
  // =========================================================

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

            {/* =================================================
                LOGO
            ================================================= */}

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

            {/* =================================================
                PLACAR
            ================================================= */}

            <View style={styles.scoreContainer}>

              <View style={styles.scorePixelLeft} />

              <Text style={styles.scoreText}>
                PONTUAÇÃO: {score}
              </Text>

              <View style={styles.scorePixelRight} />

            </View>

            {/* =================================================
                PROGRESSO
            ================================================= */}

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

            {/* =================================================
                PERGUNTA
            ================================================= */}

            <View style={styles.questionCard}>

              {/* CANTOS PIXELADOS */}

              <View style={styles.questionPixelTopLeft} />

              <View style={styles.questionPixelTopRight} />

              <View style={styles.questionPixelBottomLeft} />

              <View style={styles.questionPixelBottomRight} />

              <View style={styles.questionTop}>

                <Text style={styles.questionTag}>
            
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

            {/* =================================================
                RESPOSTAS
            ================================================= */}

            <View style={styles.answers}>

              {currentQuestion.options.map(
                (option, index) => (

                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.answer,
                      getOptionStyle(option),
                    ]}
                    onPress={() =>
                      onOptionPress(option)
                    }
                    disabled={isOptionsDisabled}
                    activeOpacity={0.75}
                  >

                    {/* BLOCO DA LETRA */}

                    <View style={styles.answerNumber}>

                      <Text style={styles.answerNumberText}>
                        {String.fromCharCode(65 + index)}
                      </Text>

                    </View>

                    {/* TEXTO DA RESPOSTA */}

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

                )
              )}

            </View>

            {/* =================================================
                PRÓXIMA PERGUNTA
            ================================================= */}

            {selectedOption && (

              <TouchableOpacity
                style={styles.nextButton}
                onPress={onNextQuestion}
                activeOpacity={0.8}
              >

                <View style={styles.nextPixelLeft} />

                <Text style={styles.nextButtonText}>
                  PRÓXIMA PERGUNTA
                </Text>

                <View style={styles.nextPixelRight} />

              </TouchableOpacity>

            )}

            {/* =================================================
                RODAPÉ
            ================================================= */}

            <Text style={styles.footerText}>
              ESCOLHA UMA ALTERNATIVA PARA CONTINUAR
            </Text>

          </View>

        </ScrollView>

      </View>
    </ImageBackground>
  );
}

// =========================================================
// ESTILOS
// =========================================================

const styles = StyleSheet.create({

  // =========================================================
  // GERAL
  // =========================================================

  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  darkOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
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

  // =========================================================
  // LOGO
  // =========================================================

  header: {
    alignItems: 'center',
    marginBottom: 10,
  },

  logoImage: {
    width: '100%',
    alignSelf: 'center',
  },

  // =========================================================
  // PLACAR
  // =========================================================

  scoreContainer: {
    minHeight: 42,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#171717',

    borderWidth: 3,
    borderColor: '#3A2112',
    borderRadius: 0,

    marginBottom: 14,

    position: 'relative',
  },

  scoreText: {
    color: '#D6A85C',

    fontSize: 16,
    fontWeight: '900',

    letterSpacing: 2,

    textShadowColor: '#000',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },

  scorePixelLeft: {
    position: 'absolute',

    left: 0,
    top: 0,

    width: 8,
    height: 8,

    backgroundColor: '#69B82E',
  },

  scorePixelRight: {
    position: 'absolute',

    right: 0,
    bottom: 0,

    width: 8,
    height: 8,

    backgroundColor: '#69B82E',
  },

  // =========================================================
  // PROGRESSO
  // =========================================================

  progressSection: {
    marginBottom: 16,
  },

  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 7,
  },

  progressText: {
    color: '#FFFFFF',

    fontSize: 12,
    fontWeight: '900',

    letterSpacing: 1.5,

    textShadowColor: '#000',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },

  progressBackground: {
    width: '100%',
    height: 14,

    backgroundColor: '#171717',

    borderWidth: 3,
    borderColor: '#3A2112',

    borderRadius: 0,

    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',

    backgroundColor: '#69B82E',

    borderRadius: 0,
  },

  // =========================================================
  // CARTÃO DA PERGUNTA
  // =========================================================

  questionCard: {
    width: '100%',

    backgroundColor: '#5B3A1C',

    borderWidth: 4,
    borderColor: '#2B180C',

    borderRadius: 0,

    paddingHorizontal: 22,
    paddingVertical: 22,

    marginBottom: 16,

    position: 'relative',

    shadowColor: '#000',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 0,
  },

  questionTop: {
    alignItems: 'center',
    marginBottom: 12,
  },

  questionTag: {
    color: '#D6A85C',

    fontSize: 12,
    fontWeight: '900',

    letterSpacing: 3,

    textShadowColor: '#000',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },

  questionText: {
    color: '#FFFFFF',

    textAlign: 'center',

    fontWeight: '900',

    textShadowColor: '#000',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },

  // =========================================================
  // CANTOS PIXELADOS
  // =========================================================

  questionPixelTopLeft: {
    position: 'absolute',

    left: -4,
    top: -4,

    width: 12,
    height: 12,

    backgroundColor: '#69B82E',
  },

  questionPixelTopRight: {
    position: 'absolute',

    right: -4,
    top: -4,

    width: 12,
    height: 12,

    backgroundColor: '#69B82E',
  },

  questionPixelBottomLeft: {
    position: 'absolute',

    left: -4,
    bottom: -4,

    width: 12,
    height: 12,

    backgroundColor: '#D6A85C',
  },

  questionPixelBottomRight: {
    position: 'absolute',

    right: -4,
    bottom: -4,

    width: 12,
    height: 12,

    backgroundColor: '#D6A85C',
  },

  // =========================================================
  // RESPOSTAS
  // =========================================================

  answers: {
    width: '100%',
    gap: 10,
  },

  answer: {
    width: '100%',
    minHeight: 58,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#356B1C',

    borderWidth: 4,
    borderColor: '#1E4210',

    borderRadius: 0,

    paddingHorizontal: 12,

    position: 'relative',

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 0,
  },

  answerNumber: {
    width: 36,
    height: 36,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#1E4210',

    borderWidth: 2,
    borderColor: '#142C0B',

    borderRadius: 0,

    marginRight: 12,
  },

  answerNumberText: {
    color: '#FFFFFF',

    fontSize: 16,
    fontWeight: '900',

    textShadowColor: '#000',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },

  answerText: {
    flex: 1,

    color: '#FFFFFF',

    fontWeight: '800',

    textAlign: 'left',

    textShadowColor: '#000',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 0,
  },

  // =========================================================
  // BOTÃO PRÓXIMA PERGUNTA
  // =========================================================

  nextButton: {
    backgroundColor: '#4A8F24',

    minHeight: 58,

    paddingVertical: 15,
    paddingHorizontal: 30,

    borderWidth: 4,
    borderColor: '#244D15',

    borderRadius: 0,

    marginTop: 18,

    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',

    shadowColor: '#000',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 0,
  },

  nextButtonText: {
    color: '#FFFFFF',

    fontSize: 17,
    fontWeight: '900',

    textAlign: 'center',

    letterSpacing: 1.5,

    textShadowColor: '#000',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },

  nextPixelLeft: {
    position: 'absolute',

    left: 5,
    top: 5,

    width: 7,
    height: 7,

    backgroundColor: '#69B82E',
  },

  nextPixelRight: {
    position: 'absolute',

    right: 5,
    bottom: 5,

    width: 7,
    height: 7,

    backgroundColor: '#D6A85C',
  },

  // =========================================================
  // RODAPÉ
  // =========================================================

  footerText: {
    color: 'rgba(255,255,255,0.75)',

    textAlign: 'center',

    fontSize: 11,

    marginTop: 20,

    fontWeight: '800',

    letterSpacing: 1,

    textShadowColor: '#000',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 0,
  },

  // =========================================================
  // RESPOSTAS CORRETAS / INCORRETAS
  // =========================================================

  correctOption: {
    borderColor: '#A4E66A',
    backgroundColor: '#4C9A25',
  },

  incorrectOption: {
    borderColor: '#FF8A80',
    backgroundColor: '#A83228',
  },

});