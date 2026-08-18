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

type StartScreenProps = {
  onStart: () => void;
};

export default function StartScreen({ onStart }: StartScreenProps) {
  const { width } = useWindowDimensions();

  const isMobile = width < 600;

  return (
    <ImageBackground
      source={background}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.card,
            {
              width: isMobile ? '92%' : 760,
              paddingHorizontal: isMobile ? 20 : 45,
              paddingVertical: isMobile ? 30 : 40,
            },
          ]}
        >
          {/* BORDA PIXELADA */}
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />

          {/* LOGO */}
          <Image
            source={logo}
            style={[
              styles.logo,
              {
                height: isMobile ? 90 : 125,
              },
            ]}
            resizeMode="contain"
          />

          {/* DIVISÓRIA */}
          <View style={styles.divider}>
            <View style={styles.dividerBlockLarge} />
            <View style={styles.dividerBlockSmall} />
            <View style={styles.dividerBlockLarge} />
            <View style={styles.dividerBlockSmall} />
            <View style={styles.dividerBlockLarge} />
          </View>

          {/* DESCRIÇÃO */}
          <Text
            style={[
              styles.description,
              {
                fontSize: isMobile ? 15 : 18,
              },
            ]}
          >
            TESTE SEUS CONHECIMENTOS
            {'\n'}
            SOBRE MINECRAFT
          </Text>

          {/* BOTÃO */}
          <TouchableOpacity
            style={[
              styles.startButton,
              {
                width: isMobile ? '95%' : 440,
                minHeight: isMobile ? 58 : 70,
              },
            ]}
            onPress={onStart}
            activeOpacity={0.8}
          >
            <View style={styles.buttonPixelTopLeft} />
            <View style={styles.buttonPixelTopRight} />

            <Text
              style={[
                styles.startButtonText,
                {
                  fontSize: isMobile ? 18 : 23,
                },
              ]}
            >
              COMEÇAR QUIZ
            </Text>

            <View style={styles.buttonPixelBottomLeft} />
            <View style={styles.buttonPixelBottomRight} />
          </TouchableOpacity>

          {/* INFORMAÇÃO */}
          <Text
            style={[
              styles.infoText,
              {
                fontSize: isMobile ? 11 : 13,
              },
            ]}
          >
            20 PERGUNTAS • BOA SORTE!
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // =========================================================
  // GERAL
  // =========================================================

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

    paddingHorizontal: 15,
  },

  // =========================================================
  // CARD
  // =========================================================

  card: {
    backgroundColor: '#242424',

    borderWidth: 5,
    borderColor: '#69B82E',

    alignItems: 'center',

    position: 'relative',

    shadowColor: '#000',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 0,
  },

  // =========================================================
  // CANTOS PIXELADOS
  // =========================================================

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

  // =========================================================
  // LOGO
  // =========================================================

  logo: {
    width: '80%',

    alignSelf: 'center',

    marginBottom: 12,
  },

  // =========================================================
  // DIVISÓRIA
  // =========================================================

  divider: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    height: 8,

    marginBottom: 22,
  },

  dividerBlockLarge: {
    width: 25,
    height: 10,

    backgroundColor: '#69B82E',

    marginHorizontal: 5,
  },

  dividerBlockSmall: {
    width: 12,
    height: 10,

    backgroundColor: '#D6A85C',

    marginHorizontal: 5,
  },

  // =========================================================
  // DESCRIÇÃO
  // =========================================================

  description: {
    color: '#FFFFFF',

    fontWeight: '900',

    textAlign: 'center',

    letterSpacing: 1.5,

    lineHeight: 25,

    textShadowColor: '#000',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,

    marginBottom: 30,
  },

  // =========================================================
  // BOTÃO
  // =========================================================

  startButton: {
    backgroundColor: '#3F7D20',

    borderWidth: 4,
    borderColor: '#244D15',

    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',

    shadowColor: '#000',
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 0,

    marginBottom: 28,
  },

  startButtonText: {
    color: '#FFFFFF',

    fontWeight: '900',

    letterSpacing: 2,

    textAlign: 'center',

    textShadowColor: '#000',
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 0,
  },

  // =========================================================
  // PIXELS DO BOTÃO
  // =========================================================

  buttonPixelTopLeft: {
    position: 'absolute',

    left: 7,
    top: 7,

    width: 7,
    height: 7,

    backgroundColor: '#69B82E',
  },

  buttonPixelTopRight: {
    position: 'absolute',

    right: 7,
    top: 7,

    width: 7,
    height: 7,

    backgroundColor: '#D6A85C',
  },

  buttonPixelBottomLeft: {
    position: 'absolute',

    left: 7,
    bottom: 7,

    width: 7,
    height: 7,

    backgroundColor: '#D6A85C',
  },

  buttonPixelBottomRight: {
    position: 'absolute',

    right: 7,
    bottom: 7,

    width: 7,
    height: 7,

    backgroundColor: '#69B82E',
  },

  // =========================================================
  // INFORMAÇÃO
  // =========================================================

  infoText: {
    color: '#AAAAAA',

    fontWeight: '900',

    letterSpacing: 1.5,

    textAlign: 'center',

    textShadowColor: '#000',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },
});