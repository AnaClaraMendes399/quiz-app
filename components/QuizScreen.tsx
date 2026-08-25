import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';

import background from '../assets/teladefundo.jpg';
import logo from '../assets/logo.png';
import heart from '../assets/coração.png';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizScreenProps = {
  currentQuestion: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  lives: number;
  selectedOption: string | null;
  isOptionsDisabled: boolean;
  onOptionPress: (option: string) => void;
};

export default function QuizScreen({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  score,
  lives,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
}: QuizScreenProps) {
  const { width } = useWindowDimensions();

  const isMobile = width < 600;
  const isSmallMobile = width < 380;

  const cardWidth = isMobile
    ? '95%'
    : width >= 1200
      ? 760
      : '82%';

  const questionFontSize = isSmallMobile
    ? 15
    : isMobile
      ? 17
      : 21;

  // Fonte otimizada para o texto longo caber inteiro sem cortar
  const optionFontSize = isSmallMobile
    ? 11
    : isMobile
      ? 12
      : 17;

  const progress =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // =========================================================
  // ESTILO DAS RESPOSTAS
  // =========================================================

  const getOptionStyle = (option: string) => {
    if (!isOptionsDisabled) {
      return styles.optionButton;
    }
    if (option === currentQuestion.correctAnswer) {
      return styles.correctOption;
    }
    if (
      option === selectedOption &&
      option !== currentQuestion.correctAnswer
    ) {
      return styles.wrongOption;
    }
    return styles.optionButtonDisabled;
  };

  return (
    <ImageBackground
      source={background}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        <ScrollView
          style={[styles.scrollContainer, { width: cardWidth }]}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* =================================================
              CARD PRINCIPAL CENTRALIZADO
          ================================================= */}
          <View
            style={[
              styles.card,
              {
                paddingHorizontal: isMobile ? 10 : 38,
                paddingVertical: isMobile ? 16 : 28,
              },
            ]}
          >

            {/* CANTOS PIXELADOS */}
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />

            {/* CABEÇALHO */}
            <View style={styles.header}>
              <Text style={[styles.questionCounter, { fontSize: isMobile ? 12 : 14 }]}>
                PERGUNTA {currentQuestionIndex + 1} / {totalQuestions}
              </Text>
              <Text style={[styles.scoreText, { fontSize: isMobile ? 12 : 14 }]}>
                PONTOS: {score}
              </Text>
            </View>

            {/* LOGO */}
            <Image
              source={logo}
              style={[styles.logo, { height: isMobile ? 65 : 95 }]}
              resizeMode="contain"
            />

            {/* VIDAS */}
            <View style={styles.livesContainer}>
              <Text style={[styles.livesLabel, { fontSize: isMobile ? 11 : 13 }]}>
                VIDAS
              </Text>
              <View style={styles.heartsContainer}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Image
                    key={index}
                    source={heart}
                    style={[
                      styles.heartImage,
                      index >= lives && styles.heartLost,
                    ]}
                    resizeMode="contain"
                  />
                ))}
              </View>
            </View>

            {/* BARRA DE PROGRESSO */}
            <View style={styles.progressBackground}>
              <View style={[styles.progress, { width: `${progress}%` }]} />
            </View>

            {/* PERGUNTA */}
            <View
              style={[
                styles.questionBox,
                {
                  paddingHorizontal: isMobile ? 10 : 22,
                  paddingVertical: isMobile ? 14 : 20,
                },
              ]}
            >
              <Text
                style={[
                  styles.questionText,
                  { fontSize: questionFontSize, lineHeight: isMobile ? 22 : 29 },
                ]}
              >
                {currentQuestion.question}
              </Text>
            </View>

            {/* ALTERNATIVAS */}
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    getOptionStyle(option),
                    { minHeight: isMobile ? 52 : 58 },
                  ]}
                  onPress={() => onOptionPress(option)}
                  disabled={isOptionsDisabled}
                  activeOpacity={0.8}
                >
                  <View style={styles.optionPixelLeft} />
                  <View style={styles.optionPixelRight} />
                  <Text
                    style={[
                      styles.optionText,
                      { fontSize: optionFontSize, lineHeight: isMobile ? 16 : 22 },
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

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

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },

  scrollContainer: {
    flexGrow: 0,
    maxHeight: '94%',
  },

  scrollContentContainer: {
    alignItems: 'center',
    paddingBottom: 15,
  },

  card: {
    backgroundColor: '#242424',
    borderWidth: 5,
    borderColor: '#5C8F32',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },

  cornerTopLeft: {
    position: 'absolute',
    left: -5,
    top: -5,
    width: 12,
    height: 12,
    backgroundColor: '#69B82E',
  },
  cornerTopRight: {
    position: 'absolute',
    right: -5,
    top: -5,
    width: 12,
    height: 12,
    backgroundColor: '#69B82E',
  },
  cornerBottomLeft: {
    position: 'absolute',
    left: -5,
    bottom: -5,
    width: 12,
    height: 12,
    backgroundColor: '#69B82E',
  },
  cornerBottomRight: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    width: 12,
    height: 12,
    backgroundColor: '#69B82E',
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  questionCounter: {
    color: '#D6A85C',
    fontWeight: '900',
    letterSpacing: 1.3,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  scoreText: {
    color: '#69B82E',
    fontWeight: '900',
    letterSpacing: 1.3,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },

  logo: {
    width: '65%',
    alignSelf: 'center',
    marginBottom: 2,
  },

  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginBottom: 9,
  },
  livesLabel: {
    color: '#FFFFFF',
    fontWeight: '900',
    letterSpacing: 1.5,
    marginRight: 5,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  heartsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartImage: {
    width: 48,
    height: 48,
    marginHorizontal: -2,
  },
  heartLost: {
    opacity: 0.22,
  },

  progressBackground: {
    width: '100%',
    height: 11,
    backgroundColor: '#151515',
    borderWidth: 2,
    borderColor: '#384A2B',
    marginBottom: 15,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#69B82E',
  },

  questionBox: {
    width: '100%',
    backgroundColor: '#5B4630',
    borderWidth: 4,
    borderColor: '#302418',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
    position: 'relative',
  },
  questionText: {
    color: '#FFFFFF',
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.7,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },

  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    width: '100%',
    backgroundColor: '#4A4A4A',
    borderWidth: 4,
    borderColor: '#292929',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 9,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  correctOption: {
    width: '100%',
    backgroundColor: '#4F8F24',
    borderWidth: 4,
    borderColor: '#315817',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 9,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  wrongOption: {
    width: '100%',
    backgroundColor: '#9E3838',
    borderWidth: 4,
    borderColor: '#632222',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 9,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  optionButtonDisabled: {
    width: '100%',
    backgroundColor: '#3A3A3A',
    borderWidth: 4,
    borderColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 9,
    position: 'relative',
    opacity: 0.6,
  },

  optionPixelLeft: {
    position: 'absolute',
    left: 8,
    top: 8,
    width: 7,
    height: 7,
    backgroundColor: '#7A7A7A',
  },
  optionPixelRight: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 7,
    height: 7,
    backgroundColor: '#D6A85C',
  },
  optionText: {
    color: '#FFFFFF',
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.4,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
});