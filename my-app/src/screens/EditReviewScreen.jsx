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

import {
  updateReview,
  deleteReview,
} from '../../database/review';

const COLORS = {
  blue: '#0096FF',
  purple: '#915BFF',
  pink: '#FF4FD8',
  background: '#EAF8FF',
  white: '#FFFFFF',
  text: '#0D1B2A',
  gray: '#64748B',
  danger: '#FF3B6B',
};

export default function EditReviewScreen({
  route,
  navigation,
}) {

  const {
    id,
    initialRating,
    initialReview,
    initialStatus,
  } = route.params;

  const [rating, setRating] =
    useState(initialRating);

  const [review, setReview] =
    useState(initialReview);

  const [status, setStatus] =
    useState(initialStatus);


  async function handleUpdate() {

    await updateReview(
      id,
      rating,
      review,
      status
    );

    Alert.alert(
      'Salvo! ✨',
      'Sua avaliação foi atualizada.'
    );

    navigation.goBack();
  }


  function handleDelete() {

    Alert.alert(
      'Excluir avaliação',
      'Essa ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Excluir',
          style: 'destructive',

          onPress: async () => {

            await deleteReview(id);

            navigation.goBack();

          },
        },
      ]
    );

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

        <Text style={styles.title}>
          Editar avaliação
        </Text>

        <View style={{ width: 27 }} />

      </View>


      <Text style={styles.label}>
        Sua nota
      </Text>


      <View style={styles.stars}>

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
              size={38}
              color="#FFB800"
            />

          </TouchableOpacity>

        ))}

      </View>


      <Text style={styles.label}>
        Sua resenha
      </Text>


      <TextInput

        style={styles.textArea}

        value={review}

        onChangeText={setReview}

        multiline

        textAlignVertical="top"

      />


      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleUpdate}
      >

        <Text style={styles.saveText}>
          Salvar alterações
        </Text>

      </TouchableOpacity>


      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >

        <Ionicons
          name="trash-outline"
          size={18}
          color={COLORS.danger}
        />

        <Text style={styles.deleteText}>
          Excluir avaliação
        </Text>

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },

  title: {
    fontSize: 19,
    fontWeight: '900',
    color: COLORS.text,
  },

  label: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 30,
    marginBottom: 12,
  },

  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },

  textArea: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    height: 160,
    padding: 16,
    fontSize: 14,
    color: COLORS.text,
  },

  saveButton: {
    height: 54,
    backgroundColor: COLORS.blue,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },

  saveText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 15,
  },

  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    marginTop: 22,
  },

  deleteText: {
    color: COLORS.danger,
    fontWeight: '800',
  },

});