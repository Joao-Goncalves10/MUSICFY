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

import { getAlbums, deleteAlbum } from '../../database/albums';

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

// Dados padrão de faixas caso o álbum no banco ainda não possua lista
const DEFAULT_TRACKS = [
  { id: '1', title: 'Faixa 1 - Introdução', duration: '2:15', rating: 5 },
  { id: '2', title: 'Faixa 2 - Single Principal', duration: '3:40', rating: 4 },
  { id: '3', title: 'Faixa 3 - Interlúdio', duration: '1:30', rating: 4 },
  { id: '4', title: 'Faixa 4 - Faixa de Trabalho', duration: '3:12', rating: 5 },
  { id: '5', title: 'Faixa 5 - Encerramento', duration: '4:05', rating: 3 },
];

export default function AlbumDetailsScreen({ route, navigation }) {
  const { id } = route.params;

  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [averageRating, setAverageRating] = useState('0.0');

  useEffect(() => {
    loadAlbum();
  }, []);

  // Recalcula a média sempre que as notas das faixas mudam
  useEffect(() => {
    if (tracks.length === 0) return;

    const ratedTracks = tracks.filter((t) => t.rating > 0);
    if (ratedTracks.length === 0) {
      setAverageRating('0.0');
      return;
    }

    const sum = ratedTracks.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = (sum / ratedTracks.length).toFixed(1);
    setAverageRating(avg);
  }, [tracks]);

  async function loadAlbum() {
    const albums = await getAlbums();
    const foundAlbum = albums.find((item) => item.id === id);

    if (foundAlbum) {
      setAlbum(foundAlbum);
      // Carrega as faixas do banco ou atribui o padrão caso não exista
      setTracks(foundAlbum.tracks || DEFAULT_TRACKS);
    }
  }

  // Função para avaliar uma faixa individualmente
  function handleRateTrack(trackId, ratingValue) {
    const updatedTracks = tracks.map((track) => {
      if (track.id === trackId) {
        // Se clicar na mesma nota já atribuída, remove a avaliação
        const newRating = track.rating === ratingValue ? 0 : ratingValue;
        return { ...track, rating: newRating };
      }
      return track;
    });

    setTracks(updatedTracks);
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
        <Text style={{ color: COLORS.text }}>Carregando álbum...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color={COLORS.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Álbum</Text>

          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={23} color="#FF3B6B" />
          </TouchableOpacity>
        </View>

        {/* CAPA */}
        <View style={styles.coverContainer}>
          {album.cover ? (
            <Image source={{ uri: album.cover }} style={styles.cover} />
          ) : (
            <View style={styles.coverPlaceholder}>
              <Ionicons name="musical-notes" size={70} color={COLORS.blue} />
            </View>
          )}
        </View>

        {/* INFORMAÇÕES */}
        <Text style={styles.title}>{album.title}</Text>
        <Text style={styles.artist}>{album.artist}</Text>
        <Text style={styles.year}>{album.year}</Text>

        {/* DESCRIÇÃO DO ÁLBUM */}
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionText}>
            {album.description ||
              'Um projeto musical incrível explorando novos horizontes e composições marcantes no repertório do artista.'}
          </Text>
        </View>

        {/* NOTA MÉDIA CALCULADA */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingTitle}>Média Geral das Faixas</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= Math.round(Number(averageRating)) ? 'star' : 'star-outline'}
                size={22}
                color={COLORS.pink}
              />
            ))}
          </View>
          <Text style={styles.ratingNumber}>{averageRating} / 5.0</Text>
        </View>

        {/* FAIXAS E AVALIAÇÃO INDIVIDUAL */}
        <Text style={styles.sectionTitle}>✦ Faixas & Avaliações</Text>

        <View style={styles.tracksContainer}>
          {tracks.map((item, index) => (
            <View style={styles.trackRow} key={item.id}>
              <Text style={styles.trackNumber}>
                {String(index + 1).padStart(2, '0')}
              </Text>

              <View style={styles.trackDetails}>
                <Text style={styles.trackTitle}>{item.title}</Text>
                <Text style={styles.trackDuration}>{item.duration}</Text>
              </View>

              {/* Avaliação individual de cada música */}
              <View style={styles.trackRatingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleRateTrack(item.id, star)}
                    activeOpacity={0.6}
                  >
                    <Ionicons
                      name={star <= item.rating ? 'star' : 'star-outline'}
                      size={16}
                      color={star <= item.rating ? COLORS.pink : COLORS.gray}
                      style={{ marginLeft: 2 }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* BOTÃO PARA SALVAR OU AVALIAR */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Review', {
              albumId: album.id,
              tracks: tracks,
              averageRating: averageRating,
            })
          }
        >
          <LinearGradient
            colors={[COLORS.blue, COLORS.purple]}
            style={styles.reviewButton}
          >
            <Ionicons name="star" size={20} color={COLORS.white} />
            <Text style={styles.reviewButtonText}>Escrever Resenha</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* AVALIAÇÃO DO USUÁRIO */}
        <Text style={styles.sectionTitle}>✦ Sua Resenha</Text>

        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <View style={styles.userCircle}>
              <Ionicons name="person" size={18} color={COLORS.blue} />
            </View>
            <Text style={styles.username}>@musiclover</Text>
          </View>

          <Text style={styles.reviewText}>
            {album.review ||
              'Ainda não há resenha escrita para este álbum. Clique no botão acima para adicionar suas opiniões!'}
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
    width: 240,
    height: 240,
    borderRadius: 28,
  },
  coverPlaceholder: {
    width: 240,
    height: 240,
    borderRadius: 28,
    backgroundColor: '#D5EFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 20,
    textAlign: 'center',
  },
  artist: {
    fontSize: 17,
    color: COLORS.gray,
    marginTop: 4,
    textAlign: 'center',
  },
  year: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.blue,
    marginTop: 4,
    textAlign: 'center',
  },
  descriptionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
  },
  descriptionText: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 18,
    textAlign: 'center',
  },
  ratingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 18,
    marginTop: 18,
    alignItems: 'center',
  },
  ratingTitle: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: '600',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6,
  },
  ratingNumber: {
    fontWeight: '800',
    fontSize: 16,
    color: COLORS.text,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 26,
    marginBottom: 12,
  },
  tracksContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 14,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  trackNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.blue,
    width: 28,
  },
  trackDetails: {
    flex: 1,
    paddingRight: 8,
  },
  trackTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  trackDuration: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  trackRatingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewButton: {
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
  },
  reviewButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginTop: 12,
    marginBottom: 40,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EAF8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontWeight: '800',
    color: COLORS.text,
  },
  reviewText: {
    color: COLORS.gray,
    lineHeight: 20,
    marginTop: 10,
  },
});