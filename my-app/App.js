import React from 'react';
import { StyleSheet, View } from 'react-native';
import AeroButton from './src/components/AeroButton'; // Importando o componente

export default function App() {
  return (
    <View style={styles.container}>
      {/* Botão ativo (ícone azul destacado) */}
      <AeroButton name="home" focused={true} />

      {/* Botão inativo */}
      <AeroButton name="search" focused={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDE5FF', // Fundo claro estilo Frutiger Aero para testar o efeito de transparência
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 15,
  },
});