import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  useWindowDimensions,
} from 'react-native';

import background from '../assets/teladefundo.jpg';
import logo from '../assets/logo.png';

// =========================================================
// PROPS
// =========================================================

type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
};

// =========================================================
// COMPONENTE
// =========================================================

export default function ResultScreen({
  score,
  totalQuestions,
  onPlayAgain,
}: ResultScreenProps) {
  const { width } = useWindowDimensions();

  const isMobile = width < 600;

  const contentWidth = isMobile
    ? width * 0.90
    : width >= 1200
    ? 650
    : width * 0.85;

  return (
    <ImageBackground
      source={background}
      style={styles.container}
      resizeMode="cover"
    >

      <View style={styles.resultOverlay}>

        <View
          style={[
            styles.resultCard,
            {
              width: contentWidth,
            },
          ]}
        >

          {/* =================================================
              DECORAÇÃO SUPERIOR
          ================================================= */}

          <View style={styles.pixelTopBar}>

            <View style={styles.pixelLarge} />

            <View style={styles.pixelSmall} />

            <View style={styles.pixelLarge} />

            <View style={styles.pixelSmall} />

            <View style={styles.pixelLarge} />

          </View>

          {/* =================================================
              LOGO
          ================================================= */}

          <Image
            source={logo}
            style={[
              styles.logoImage,
              {
                height: isMobile ? 70 : 95,
              },
            ]}
            resizeMode="contain"
          />

          {/* =================================================
              DIVISÓRIA PIXELADA
          ================================================= */}

          <View style={styles.resultDivider}>

            <View style={styles.dividerBlock} />
            <View style={styles.dividerBlock} />
            <View style={styles.dividerBlock} />
            <View style={styles.dividerBlock} />
            <View style={styles.dividerBlock} />
            <View style={styles.dividerBlock} />
            <View style={styles.dividerBlock} />

          </View>

          {/* =================================================
              TÍTULO
          ================================================= */}

          <Text style={styles.resultTitle}>
            RESULTADO FINAL
          </Text>

          {/* =================================================
              LINHA PIXELADA
          ================================================= */}

          <View style={styles.pixelLine}>

            <View style={styles.pixelLineBlock} />
            <View style={styles.pixelLineBlock} />
            <View style={styles.pixelLineBlock} />
            <View style={styles.pixelLineBlock} />
            <View style={styles.pixelLineBlock} />

          </View>

          {/* =================================================
              LABEL
          ================================================= */}

          <Text style={styles.resultLabel}>
            SUA PONTUAÇÃO
          </Text>

          {/* =================================================
              PLACAR
          ================================================= */}

          <View style={styles.scoreBox}>

            <Text style={styles.resultScore}>
              {score}
            </Text>

            <Text style={styles.resultTotal}>
              / {totalQuestions}
            </Text>

          </View>

          {/* =================================================
              MENSAGEM
          ================================================= */}

          <Text style={styles.resultMessage}>

            {score === totalQuestions
              ? 'PERFEITO! Você conhece muito de Minecraft!'
              : score >= totalQuestions / 2
              ? 'MUITO BEM! Você mandou bem!'
              : 'CONTINUE PRATICANDO E TENTE NOVAMENTE!'}

          </Text>

          {/* =================================================
              BOTÃO
          ================================================= */}

          <TouchableOpacity
            style={styles.restartButton}
            onPress={onPlayAgain}
            activeOpacity={0.8}
          >

            <View style={styles.buttonPixelTopLeft} />

            <View style={styles.buttonPixelTopRight} />

            <Text style={styles.restartButtonText}>
              JOGAR NOVAMENTE
            </Text>

            <View style={styles.buttonPixelBottomLeft} />

            <View style={styles.buttonPixelBottomRight} />

          </TouchableOpacity>

          {/* =================================================
              DECORAÇÃO INFERIOR
          ================================================= */}

          <View style={styles.pixelBottomBar}>

            <View style={styles.pixelSmall} />

            <View style={styles.pixelLarge} />

            <View style={styles.pixelSmall} />

            <View style={styles.pixelLarge} />

            <View style={styles.pixelSmall} />

          </View>

        </View>

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

  resultOverlay: {
    flex: 1,

    backgroundColor: 'rgba(0, 0, 0, 0.55)',

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 20,
  },

  resultCard: {
    alignSelf: 'center',

    backgroundColor: '#242424',

    borderWidth: 5,
    borderColor: '#69B82E',

    borderRadius: 0,

    paddingHorizontal: 28,
    paddingVertical: 25,

    alignItems: 'center',

    position: 'relative',

    shadowColor: '#000',

    shadowOffset: {
      width: 9,
      height: 9,
    },

    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 0,
  },

  // =========================================================
  // LOGO
  // =========================================================

  logoImage: {
    width: '100%',
    alignSelf: 'center',
  },

  // =========================================================
  // DECORAÇÕES
  // =========================================================

  pixelTopBar: {
    width: '100%',
    height: 12,

    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 8,
  },

  pixelBottomBar: {
    width: '100%',
    height: 12,

    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 20,
  },

  pixelLarge: {
    width: 12,
    height: 12,

    backgroundColor: '#69B82E',
  },

  pixelSmall: {
    width: 7,
    height: 7,

    backgroundColor: '#D6A85C',
  },

  // =========================================================
  // DIVISÓRIA
  // =========================================================

  resultDivider: {
    width: 112,
    height: 6,

    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: 5,
    marginBottom: 20,
  },

  dividerBlock: {
    width: 13,
    height: 6,

    backgroundColor: '#69B82E',
  },

  // =========================================================
  // LINHA PIXELADA
  // =========================================================

  pixelLine: {
    height: 5,

    flexDirection: 'row',

    marginBottom: 18,
  },

  pixelLineBlock: {
    width: 12,
    height: 5,

    backgroundColor: '#69B82E',

    marginHorizontal: 2,
  },

  // =========================================================
  // TÍTULO
  // =========================================================

  resultTitle: {
    color: '#D6A85C',

    fontSize: 24,

    fontWeight: '900',

    letterSpacing: 3,

    textAlign: 'center',

    marginBottom: 8,

    textShadowColor: '#000',

    textShadowOffset: {
      width: 3,
      height: 3,
    },

    textShadowRadius: 0,
  },

  // =========================================================
  // LABEL
  // =========================================================

  resultLabel: {
    color: '#AAAAAA',

    fontSize: 13,

    fontWeight: '900',

    letterSpacing: 2,

    marginBottom: 5,

    textShadowColor: '#000',

    textShadowOffset: {
      width: 1,
      height: 1,
    },

    textShadowRadius: 0,
  },

  // =========================================================
  // PLACAR FINAL
  // =========================================================

  scoreBox: {
    minWidth: 150,

    paddingVertical: 8,
    paddingHorizontal: 18,

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'baseline',

    backgroundColor: '#171717',

    borderWidth: 4,

    borderColor: '#3F7D20',

    borderRadius: 0,

    marginBottom: 18,
  },

  resultScore: {
    color: '#69B82E',

    fontSize: 62,

    fontWeight: '900',

    textShadowColor: '#000',

    textShadowOffset: {
      width: 5,
      height: 5,
    },

    textShadowRadius: 0,
  },

  resultTotal: {
    color: '#AAAAAA',

    fontSize: 28,

    fontWeight: '900',

    textShadowColor: '#000',

    textShadowOffset: {
      width: 2,
      height: 2,
    },

    textShadowRadius: 0,
  },

  // =========================================================
  // MENSAGEM
  // =========================================================

  resultMessage: {
    color: '#DDDDDD',

    fontSize: 14,

    fontWeight: '800',

    textAlign: 'center',

    lineHeight: 21,

    marginBottom: 22,

    maxWidth: 500,

    textShadowColor: '#000',

    textShadowOffset: {
      width: 1,
      height: 1,
    },

    textShadowRadius: 0,
  },

  // =========================================================
  // BOTÃO
  // =========================================================

  restartButton: {
    backgroundColor: '#3F7D20',

    minWidth: 240,

    minHeight: 58,

    paddingVertical: 15,
    paddingHorizontal: 25,

    borderWidth: 4,

    borderColor: '#244D15',

    borderRadius: 0,

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

  restartButtonText: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '900',

    textAlign: 'center',

    letterSpacing: 2,

    textShadowColor: '#000',

    textShadowOffset: {
      width: 2,
      height: 2,
    },

    textShadowRadius: 0,
  },

  // =========================================================
  // PIXELS DO BOTÃO
  // =========================================================

  buttonPixelTopLeft: {
    position: 'absolute',

    left: 5,
    top: 5,

    width: 6,
    height: 6,

    backgroundColor: '#69B82E',
  },

  buttonPixelTopRight: {
    position: 'absolute',

    right: 5,
    top: 5,

    width: 6,
    height: 6,

    backgroundColor: '#D6A85C',
  },

  buttonPixelBottomLeft: {
    position: 'absolute',

    left: 5,
    bottom: 5,

    width: 6,
    height: 6,

    backgroundColor: '#D6A85C',
  },

  buttonPixelBottomRight: {
    position: 'absolute',

    right: 5,
    bottom: 5,

    width: 6,
    height: 6,

    backgroundColor: '#69B82E',
  },

});