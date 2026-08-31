import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { getAlbums, deleteAlbum } from '../database/albums';

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

export default function AlbumDetailsScreen({ route, navigation }) {

  const { id } = route.params;

  const [album, setAlbum] = useState(null);

  useEffect(() => {
    loadAlbum();
  }, []);

  async function loadAlbum() {

    const albums = await getAlbums();

    const foundAlbum = albums.find(
      item => item.id === id
    );

    setAlbum(foundAlbum);
  }

  async function handleDelete() {

    Alert.alert(
      'Excluir álbum',
      'Tem certeza que deseja excluir este álbum?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Excluir',
          style: 'destructive',

          onPress: async () => {

            await deleteAlbum(id);

            navigation.goBack();

          },
        },
      ]
    );
  }

  if (!album) {

    return (
      <SafeAreaView style={styles.loading}>
        <Text>Carregando álbum...</Text>
      </SafeAreaView>
    );

  }

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >

            <Ionicons
              name="arrow-back"
              size={28}
              color={COLORS.text}
            />

          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Álbum
          </Text>

          <TouchableOpacity
            onPress={handleDelete}
          >

            <Ionicons
              name="trash-outline"
              size={23}
              color="#FF3B6B"
            />

          </TouchableOpacity>

        </View>


        {/* CAPA */}

        <View style={styles.coverContainer}>

          {album.cover ? (

            <Image
              source={{ uri: album.cover }}
              style={styles.cover}
            />

          ) : (

            <View style={styles.coverPlaceholder}>

              <Ionicons
                name="musical-notes"
                size={70}
                color={COLORS.blue}
              />

            </View>

          )}

        </View>


        {/* INFORMAÇÕES */}

        <Text style={styles.title}>
          {album.title}
        </Text>

        <Text style={styles.artist}>
          {album.artist}
        </Text>

        <Text style={styles.year}>
          {album.year}
        </Text>


        {/* NOTA */}

        <View style={styles.ratingCard}>

          <Text style={styles.ratingTitle}>
            Avaliação da comunidade
          </Text>

          <Text style={styles.rating}>
            ★★★★★
          </Text>

          <Text style={styles.ratingNumber}>
            4.8 / 5
          </Text>

        </View>


        {/* BOTÃO */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              'Review',
              {
                albumId: album.id,
              }
            )
          }
        >

          <LinearGradient
            colors={[
              COLORS.blue,
              COLORS.purple,
            ]}
            style={styles.reviewButton}
          >

            <Ionicons
              name="star"
              size={20}
              color={COLORS.white}
            />

            <Text style={styles.reviewButtonText}>
              Avaliar álbum
            </Text>

          </LinearGradient>

        </TouchableOpacity>


        {/* AVALIAÇÕES */}

        <Text style={styles.sectionTitle}>
          ✦ Avaliações
        </Text>


        <View style={styles.reviewCard}>

          <View style={styles.reviewHeader}>

            <View style={styles.userCircle}>
              <Ionicons
                name="person"
                size={18}
                color={COLORS.blue}
              />
            </View>

            <Text style={styles.username}>
              @musiclover
            </Text>

          </View>

          <Text style={styles.stars}>
            ★★★★★
          </Text>

          <Text style={styles.reviewText}>
            Esse álbum é simplesmente incrível.
            Não consigo parar de ouvir!
          </Text>

        </View>

      </ScrollView>

    </SafeAreaView>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 18,
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },

  coverContainer: {
    alignItems: 'center',
    marginTop: 15,
  },

  cover: {
    width: 250,
    height: 250,
    borderRadius: 28,
  },

  coverPlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 28,
    backgroundColor: '#D5EFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 22,
  },

  artist: {
    fontSize: 17,
    color: COLORS.gray,
    marginTop: 4,
  },

  year: {
    fontSize: 13,
    color: COLORS.blue,
    marginTop: 5,
  },

  ratingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 18,
    marginTop: 22,
    alignItems: 'center',
  },

  ratingTitle: {
    color: COLORS.gray,
    fontSize: 12,
  },

  rating: {
    fontSize: 25,
    color: COLORS.pink,
    marginTop: 5,
  },

  ratingNumber: {
    fontWeight: '800',
    color: COLORS.text,
  },

  reviewButton: {
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
  },

  reviewButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 30,
    marginBottom: 12,
  },

  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 30,
  },

  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  userCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EAF8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  username: {
    fontWeight: '800',
    color: COLORS.text,
  },

  stars: {
    color: '#FFB800',
    fontSize: 18,
    marginTop: 10,
  },

  reviewText: {
    color: COLORS.gray,
    lineHeight: 20,
    marginTop: 6,
  },

});