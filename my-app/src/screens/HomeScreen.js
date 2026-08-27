import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import {
  useFonts,
  Nunito_800ExtraBold,
  Nunito_600SemiBold,
} from '@expo-google-fonts/nunito';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';

// Paleta de Cores Aero & Frutiger
const PALETTE = {
  azulAero: '#0096FF',
  verdeLime: '#7CFF00',
  roxoOrbital: '#915BFF',
  rosaNeon: '#FF4FD8',
  azulCeu: '#00C2FF',
  aquaGlow: '#00FFD1',
  azulEscuro: '#0D1B2A',
  cinzaAero: '#334155',
  cinzaMedio: '#64748B',
  cinzaClaro: '#CBD5E1',
  cinzaSuave: '#F1F5F9',
  branco: '#FFFFFF',
  glassBg: 'rgba(255, 255, 255, 0.75)',
  glassBorder: 'rgba(255, 255, 255, 0.9)',
};

// Dados Mockados de Exemplo
const FEATURED_ALBUM = {
  id: '1',
  title: 'Future Nostalgia',
  artist: 'Dua Lipa',
  type: 'Álbum',
  genre: 'Pop / Disco',
  duration: '37 min',
  rating: 4.8,
  cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=600&auto=format&fit=crop',
};

const RECENT_REVIEWS = [
  {
    id: '101',
    user: 'Marina Silva',
    username: '@marina_aero',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    album: 'Chromatica',
    artist: 'Lady Gaga',
    rating: 5,
    selectedTrack: 'Rain On Me',
    trackRating: 5,
    review: 'A produção synth-pop deste álbum é sensacional! Lembra demais os clássicos do Y2K com um toque moderno.',
    likes: 24,
    listened: true,
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '102',
    user: 'Lucas Mendes',
    username: '@lucas_vibes',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    album: 'After Hours',
    artist: 'The Weeknd',
    rating: 4.5,
    selectedTrack: 'Blinding Lights',
    trackRating: 5,
    review: 'Atmosfera incrível, impecável do início ao fim.',
    likes: 12,
    listened: true,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop',
  },
];

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_600SemiBold,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
  });

  const [search, setSearch] = useState('');
  const [likedReviews, setLikedReviews] = useState({});

  if (!fontsLoaded) return null;

  const toggleLike = (id) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EAF4FE" />
      
      {/* Fundo Gradiente Atmosférico Aero */}
      <LinearGradient
        colors={['#EAF4FE', '#D5E9FF', '#F1F5F9']}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logoTitle}>MUSICFY</Text>
            <Text style={styles.subtext}>O que vamos ouvir hoje?</Text>
          </View>

          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
          </TouchableOpacity>
        </View>

        {/* Barra de Pesquisa Estilo Aero Glass */}
        <View style={styles.searchCard}>
          <Feather name="search" size={20} color={PALETTE.azulAero} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar álbuns, EPs, artistas..."
            placeholderTextColor={PALETTE.cinzaMedio}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Card de Destaque / Álbum Recomendado */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Destaque da Comunidade</Text>
        </View>

        <View style={styles.heroGlassCard}>
          <Image
            source={{ uri: FEATURED_ALBUM.cover }}
            style={styles.heroCover}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.heroDetails}>
            <View style={styles.badgeRow}>
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>{FEATURED_ALBUM.type}</Text>
              </View>
              <Text style={styles.genreText}>{FEATURED_ALBUM.genre}</Text>
            </View>

            <Text style={styles.albumName}>{FEATURED_ALBUM.title}</Text>
            <Text style={styles.artistName}>{FEATURED_ALBUM.artist}</Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#FFD600" />
              <Text style={styles.ratingText}>{FEATURED_ALBUM.rating} / 5.0</Text>
              <Text style={styles.infoText}>• {FEATURED_ALBUM.duration}</Text>
            </View>

            <View style={styles.actionButtonsRow}>
              {/* Botão Principal com Gradiente Oceano Fresh */}
              <TouchableOpacity style={styles.primaryButtonWrapper}>
                <LinearGradient
                  colors={[PALETTE.azulAero, PALETTE.aquaGlow]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryButton}
                >
                  <Ionicons name="create-outline" size={18} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.primaryButtonText}>Avaliar</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="share-social-outline" size={20} color={PALETTE.azulAero} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Feed Social de Avaliações */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Avaliações Recentes</Text>
        </View>

        {RECENT_REVIEWS.map((item) => (
          <View key={item.id} style={styles.reviewCard}>
            {/* Usuário */}
            <View style={styles.reviewHeader}>
              <Image source={{ uri: item.avatar }} style={styles.userAvatar} contentFit="cover" />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.user}</Text>
                <Text style={styles.userHandle}>{item.username}</Text>
              </View>
              {item.listened && (
                <View style={styles.listenedBadge}>
                  <Ionicons name="checkmark-circle" size={14} color={PALETTE.verdeLime} />
                  <Text style={styles.listenedText}>Ouvido</Text>
                </View>
              )}
            </View>

            {/* Conteúdo da Avaliação */}
            <View style={styles.reviewBody}>
              <Image source={{ uri: item.cover }} style={styles.reviewAlbumCover} contentFit="cover" />
              <View style={styles.reviewContentText}>
                <Text style={styles.reviewAlbumTitle}>{item.album}</Text>
                <Text style={styles.reviewArtist}>{item.artist}</Text>

                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= Math.floor(item.rating) ? 'star' : 'star-outline'}
                      size={14}
                      color="#FFD600"
                    />
                  ))}
                  <Text style={styles.trackNote}>
                    Track destaque: <Text style={{ fontFamily: 'PlusJakartaSans_700Bold' }}>{item.selectedTrack}</Text>
                  </Text>
                </View>

                <Text style={styles.reviewText}>{item.review}</Text>
              </View>
            </View>

            {/* Ações da Resenha */}
            <View style={styles.reviewFooter}>
              <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(item.id)}>
                <Ionicons
                  name={likedReviews[item.id] ? 'heart' : 'heart-outline'}
                  size={18}
                  color={likedReviews[item.id] ? PALETTE.rosaNeon : PALETTE.cinzaMedio}
                />
                <Text style={[styles.likeCount, likedReviews[item.id] && { color: PALETTE.rosaNeon }]}>
                  {item.likes + (likedReviews[item.id] ? 1 : 0)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.commentButton}>
                <FontAwesome5 name="comment" size={14} color={PALETTE.cinzaMedio} />
                <Text style={styles.commentText}>Comentar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Dock Flutuante de Navegação (Aero Dock) */}
      <View style={styles.dockContainer}>
        <View style={styles.dockGlass}>
          <TouchableOpacity style={styles.dockItem}>
            <Ionicons name="home" size={24} color={PALETTE.azulAero} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dockItem}>
            <Ionicons name="search-outline" size={24} color={PALETTE.cinzaMedio} />
          </TouchableOpacity>

          {/* Botão central em gradiente Verde Lime */}
          <TouchableOpacity style={styles.addDockButtonWrapper}>
            <LinearGradient
              colors={['#7CFF00', '#38FF00']}
              style={styles.addDockButton}
            >
              <Ionicons name="add" size={30} color={PALETTE.azulEscuro} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dockItem}>
            <Ionicons name="heart-outline" size={24} color={PALETTE.cinzaMedio} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dockItem}>
            <Ionicons name="person-outline" size={24} color={PALETTE.cinzaMedio} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Estilização no padrão Frutiger Aero
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 28,
    color: PALETTE.azulAero,
    letterSpacing: 0.5,
  },
  subtext: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 13,
    color: PALETTE.cinzaMedio,
  },
  avatarContainer: {
    padding: 2,
    borderRadius: 25,
    backgroundColor: PALETTE.branco,
    borderWidth: 2,
    borderColor: PALETTE.azulCeu,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.glassBg,
    borderColor: PALETTE.glassBorder,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 20,
    shadowColor: PALETTE.azulAero,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: PALETTE.azulEscuro,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 18,
    color: PALETTE.azulEscuro,
  },
  heroGlassCard: {
    flexDirection: 'row',
    backgroundColor: PALETTE.glassBg,
    borderColor: PALETTE.glassBorder,
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 12,
    marginBottom: 22,
    shadowColor: PALETTE.azulAero,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  heroCover: {
    width: 105,
    height: 105,
    borderRadius: 14,
  },
  heroDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  typeBadge: {
    backgroundColor: PALETTE.azulCeu,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  typeBadgeText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: PALETTE.branco,
  },
  genreText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: PALETTE.cinzaMedio,
  },
  albumName: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: PALETTE.azulEscuro,
    marginTop: 2,
  },
  artistName: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 13,
    color: PALETTE.cinzaAero,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: PALETTE.azulEscuro,
    marginLeft: 4,
  },
  infoText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: PALETTE.cinzaMedio,
    marginLeft: 4,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  primaryButtonWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    flex: 1,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderRadius: 14,
  },
  primaryButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    color: PALETTE.branco,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: PALETTE.branco,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: PALETTE.cinzaClaro,
  },
  reviewCard: {
    backgroundColor: PALETTE.glassBg,
    borderColor: PALETTE.glassBorder,
    borderWidth: 1.5,
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    shadowColor: PALETTE.azulEscuro,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 14,
    color: PALETTE.azulEscuro,
  },
  userHandle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 11,
    color: PALETTE.cinzaMedio,
  },
  listenedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(124, 255, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  listenedText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: PALETTE.azulEscuro,
  },
  reviewBody: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  reviewAlbumCover: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  reviewContentText: {
    flex: 1,
    marginLeft: 10,
  },
  reviewAlbumTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 14,
    color: PALETTE.azulEscuro,
  },
  reviewArtist: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: PALETTE.cinzaMedio,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    gap: 2,
  },
  trackNote: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 10,
    color: PALETTE.cinzaAero,
    marginLeft: 6,
  },
  reviewText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: PALETTE.azulEscuro,
    marginTop: 4,
    lineHeight: 17,
  },
  reviewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(203, 213, 225, 0.4)',
    paddingTop: 8,
    marginTop: 8,
    gap: 16,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likeCount: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: PALETTE.cinzaMedio,
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commentText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: PALETTE.cinzaMedio,
  },
  dockContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  dockGlass: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderColor: PALETTE.glassBorder,
    borderWidth: 1.5,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    shadowColor: PALETTE.azulAero,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  dockItem: {
    padding: 8,
  },
  addDockButtonWrapper: {
    marginTop: -24,
    borderRadius: 25,
    shadowColor: PALETTE.verdeLime,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  addDockButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});