// ExemploUseState.tsx
import { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  TextInput,
} from "react-native";

export default function App() {
  let contadorNormal = 0;
  function incrementarContadorNormal() {
    contadorNormal = contadorNormal + 1;
    console.warn("Valor do contador normal:", contadorNormal);
  }

  const [contador, setContador] = useState<number>(0);
  function incrementarContadorEstado() {
    setContador(contador + 1);
    console.warn("Valor do contador de estado:", contador + 1);
  }

  const [estaAtivo, setEstaAtivo] = useState<boolean>(true);
  function alternarAtividade() {
    setEstaAtivo(!estaAtivo); // Inverte o valor booleano
  }

  const [texto, setTexto] = useState<string>("");

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Exemplo de 'useState'</Text>

        {/* Exibindo o valor da variável normal na tela */}
        {/* Atenção: este valor não será atualizado automaticamente! */}
        <Text style={styles.valueText}>Contador Normal: {contadorNormal}</Text>

        <Button
          title="Incrementar Variável Normal"
          onPress={incrementarContadorNormal}
        />

        <Text style={styles.subTitle}>O que está acontecendo?</Text>
        <Text style={styles.explanation}>
          Ao clicar no botão, a variável 'contadorNormal' realmente aumenta.
          Você pode ver isso no console. No entanto, o componente não sabe que a
          variável mudou, então ele não re-renderiza. O valor na tela permanece
          0, mostrando que variáveis normais não causam atualizações na UI.
        </Text>
        <Text>------------------------------</Text>

        <Text style={styles.valueText}>Contador de Estado: {contador}</Text>

        <Button
          title="Incrementar Variável Normal"
          onPress={incrementarContadorEstado}
        />
        <Text style={styles.explanation}>
          Ao clicar no segundo botão, a função 'setContador' é chamada. O React
          percebe a mudança de estado e re-rendeiza o componente, atualizando a
          tela com o novo valor de 'contador'.
        </Text>

        <Text>------------------------------</Text>
        <Text style={styles.valueText}>
          Status: {estaAtivo ? "Ativo" : "Inativo"}
        </Text>

        <Button title="Alternar Status" onPress={alternarAtividade} />
        <Text style={styles.explanation}>
          Um único componente pode ter quantos estados forem necessários para
          controlar sua interface. Cada chamada a 'useState' cria um par único
          [valor, função de atualização] que o React gerencia independentemente.
        </Text>
        <Text>------------------------------</Text>
        <Text style={styles.valueText}>Campo de texto dinâmico</Text>
        <Text style={styles.explanation}>
          Digite no campo abaixo e veja o texto aparecer em tempo real!
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite um texto aqui..."
          value={texto}
          onChangeText={setTexto}
        />
        <Text style={styles.liveText}>Texto digitado: {texto}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
        padding: 20,
    paddingBottom: 200
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  valueText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#007AFF",
    marginVertical: 10,
    textAlign: "center",
  },
  explanation: {
    textAlign: "center",
    marginTop: 10,
    color: "#555",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    width: "90%",
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  liveText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 10,
  },
});
