import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { createReview } from '../../database/review';

const COLORS = {
  blue: '#0096FF',
  green: '#7CFF00',
  purple: '#915BFF',
  pink: '#FF4FD8',
  background: '#EAF8FF',
  white: '#FFFFFF',
  text: '#0D1B2A',
  gray: '#64748B',
};

export default function ReviewScreen({
  route,
  navigation,
}) {

  const { albumId } = route.params;

  const [rating, setRating] = useState(0);

  const [review, setReview] = useState('');

  const [status, setStatus] = useState('ouvido');


  async function handleSubmit() {

    if (rating === 0) {

      Alert.alert(
        'Ops!',
        'Escolha uma nota para o álbum.'
      );

      return;
    }

    await createReview(
      albumId,
      rating,
      review,
      status
    );

    Alert.alert(
      'Avaliação publicada! 🎵',
      'Sua avaliação foi salva no MUSICFY.'
    );

    navigation.goBack();

  }


  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >

          <Ionicons
            name="arrow-back"
            size={27}
            color={COLORS.text}
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Avaliar álbum
        </Text>

        <View style={{ width: 27 }} />

      </View>


      <Text style={styles.question}>
        Qual foi sua experiência?
      </Text>


      {/* ESTRELAS */}

      <View style={styles.starsContainer}>

        {[1, 2, 3, 4, 5].map(number => (

          <TouchableOpacity
            key={number}
            onPress={() =>
              setRating(number)
            }
          >

            <Ionicons
              name={
                number <= rating
                  ? 'star'
                  : 'star-outline'
              }
              size={42}
              color="#FFB800"
            />

          </TouchableOpacity>

        ))}

      </View>


      <Text style={styles.ratingText}>
        {rating === 0
          ? 'Escolha uma nota'
          : `${rating} de 5 estrelas`}
      </Text>


      {/* RESENHA */}

      <Text style={styles.label}>
        Sua resenha
      </Text>

      <TextInput

        style={styles.textArea}

        placeholder="Conte o que você achou desse álbum..."

        placeholderTextColor={COLORS.gray}

        value={review}

        onChangeText={setReview}

        multiline

        textAlignVertical="top"

      />


      {/* STATUS */}

      <Text style={styles.label}>
        Status
      </Text>

      <View style={styles.statusContainer}>

        <TouchableOpacity
          style={[
            styles.statusButton,
            status === 'ouvido' &&
              styles.statusActive,
          ]}
          onPress={() =>
            setStatus('ouvido')
          }
        >

          <Text
            style={[
              styles.statusText,
              status === 'ouvido' &&
                styles.statusTextActive,
            ]}
          >
            ✓ Já ouvi
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.statusButton,
            status === 'quero_ouvir' &&
              styles.statusActive,
          ]}
          onPress={() =>
            setStatus('quero_ouvir')
          }
        >

          <Text
            style={[
              styles.statusText,
              status === 'quero_ouvir' &&
                styles.statusTextActive,
            ]}
          >
            + Quero ouvir
          </Text>

        </TouchableOpacity>

      </View>


      {/* PUBLICAR */}

      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.submitContainer}
      >

        <LinearGradient
          colors={[
            COLORS.blue,
            COLORS.purple,
          ]}
          style={styles.submit}
        >

          <Ionicons
            name="send"
            size={19}
            color={COLORS.white}
          />

          <Text style={styles.submitText}>
            Publicar avaliação
          </Text>

        </LinearGradient>

      </TouchableOpacity>

    </SafeAreaView>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 18,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: COLORS.text,
  },

  question: {
    fontSize: 25,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 25,
    textAlign: 'center',
  },

  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 25,
  },

  ratingText: {
    textAlign: 'center',
    color: COLORS.gray,
    marginTop: 8,
  },

  label: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 28,
    marginBottom: 8,
  },

  textArea: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    height: 140,
    fontSize: 14,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: '#D5EFFF',
  },

  statusContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  statusButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D5EFFF',
  },

  statusActive: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },

  statusText: {
    fontWeight: '700',
    color: COLORS.gray,
  },

  statusTextActive: {
    color: COLORS.white,
  },

  submitContainer: {
    marginTop: 30,
    borderRadius: 18,
    overflow: 'hidden',
  },

  submit: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  submitText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 15,
  },

});