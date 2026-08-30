import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

/**
 * Componente de botão com design Aero/Glassmorphism
 * @param {string} name - Nome do ícone Ionicons
 * @param {boolean} focused - Se o botão está em foco/ativo
 * @param {Function} onPress - Callback ao pressionar
 */
export default function AeroButton({ name, focused, onPress }) {
  return (
    <View style={styles.container}>
      {/* Bordas e brilho externo com gradiente */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.8)', 'rgba(180, 220, 255, 0.3)']}
        style={styles.gradientBorder}
      >
        {/* Efeito de vidro desfocado no fundo */}
        <BlurView intensity={30} tint="light" style={styles.blurContainer}>
          {/* Brilho interno (Highlight superior) */}
          <LinearGradient
            colors={['rgba(255,255,255,0.7)', 'transparent']}
            style={styles.topGloss}
          />
          <Ionicons 
            name={name} 
            size={22} 
            color={focused ? '#1A5CFF' : '#5C82A6'} 
          />
        </BlurView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#3A82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradientBorder: {
    padding: 1.5,
    borderRadius: 20,
  },
  blurContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(215, 235, 255, 0.35)',
  },
  topGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
});