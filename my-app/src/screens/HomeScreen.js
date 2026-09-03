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
  Platform,
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

/**
 * Paleta de Cores - Design System Aero & Frutiger
 */
const PALETTE = {
  azulAero: '#0096FF',
  azulAeroEscuro: '#0055A5',
  verdeLime: '#7CFF00',
  roxoOrbital: '#915BFF',
  rosaNeon: '#FF4FD8',
  azulCeu: '#00C2FF',
  aquaGlow: '#00FFD1',
  azulEscuro: '#0D1B2A',
  cinzaAero: '#334155',
  cinzaMedio: '#132846',
  cinzaClaro: '#CBD5E1',
  cinzaSuave: '#F1F5F9',
  branco: '#FFFFFF',
  glassBg: 'rgba(242, 253, 255, 0.6)',
  glassBorder: 'rgba(223, 246, 255, 0.9)',
};

const FEATURED_ALBUM = {
  id: '1',
  title: 'petal',
  artist: 'Ariana Grande',
  type: 'Álbum',
  genre: 'Pop / R&B',
  duration: '37 min',
  rating: 4.8,
  cover: require('../assets/petal_cover.jpg'),
};

const RECENT_REVIEWS = [
  {
    id: '101',
    user: 'Marina Silva',
    username: '@marina_aero',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    album: 'The Fame Monster',
    artist: 'Lady Gaga',
    rating: 5,
    selectedTrack: 'Bad Romance',
    trackRating: 5,
    review: 'A produção synth-pop deste álbum é sensacional! Lembra demais os clássicos do Y2K com um toque moderno.',
    likes: 24,
    listened: true,
    cover: require('../assets/the_fame_monster_cover.jpg'),
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
  {
    id: '103',
    user: 'Camila Rocha',
    username: '@camila_music',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=200&auto=format&fit=crop',
    album: 'Future Nostalgia',
    artist: 'Dua Lipa',
    rating: 4.7,
    selectedTrack: 'Levitating',
    trackRating: 5,
    review: 'Dua Lipa trouxe o disco perfeito para dançar e se sentir bem. A produção é impecável!',
    likes: 18,
    listened: false,
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop',
  },
];

export default function HomeScreen({ navigation }) {
  const [fontsLoaded, fontError] = useFonts({
    Nunito_800ExtraBold,
    Nunito_600SemiBold,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
  });

  const [search, setSearch] = useState('');
  const [likedReviews, setLikedReviews] = useState({});

  if (!fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: PALETTE.azulAero, fontSize: 18, fontWeight: '600' }}>
            Carregando...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const toggleLike = (id) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#CEE2F6' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#1e80f0" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logoTitle}>MUSICFY</Text>
            <Text style={styles.subtext}>O que vamos ouvir hoje?</Text>
          </View>

          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
          </TouchableOpacity>
        </View>

        {/* Barra de Pesquisa */}
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

        {/* Card de Destaque */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Destaque da Comunidade</Text>
        </View>

        <View style={styles.heroGlassCard}>
          <Image
            source={typeof FEATURED_ALBUM.cover === 'string' ? { uri: FEATURED_ALBUM.cover } : FEATURED_ALBUM.cover}
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
              <Ionicons name="star" size={16} color="#00a6ff" />
              <Text style={styles.ratingText}>{FEATURED_ALBUM.rating} / 5.0</Text>
              <Text style={styles.infoText}>• {FEATURED_ALBUM.duration}</Text>
            </View>

            <View style={styles.actionButtonsRow}>
              {/* Botão Principal com Gradiente Oceano Fresh */}
              <TouchableOpacity
                style={styles.primaryButtonWrapper}
                onPress={() => navigation.navigate('Review', { albumId: FEATURED_ALBUM.id })}
              >
                <LinearGradient
                  colors={['#4dd5ff', '#2d6de3', '#7dfeb5']}
                  start={{ x: 0.1, y: 0 }}
                  end={{ x: 0.6, y: 2.5 }}
                  style={styles.primaryButton}
                >
                  {/* Reflexo Glossy Superior (Efeito Curvo de Gel) */}
                  <LinearGradient
                    colors={['rgba(189, 251, 253, 0.92)', 'rgba(255, 255, 255, 0)']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.85 }}
                    style={styles.glossHighlightTop}
                  />
                  <Ionicons name="create-outline" size={18} color="#FFF" style={styles.buttonIcon} />
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

            <View style={styles.reviewBody}>
              <Image
                source={typeof FEATURED_ALBUM.cover === 'string' ? { uri: FEATURED_ALBUM.cover } : FEATURED_ALBUM.cover}
                style={styles.heroCover}
                contentFit="cover"
                transition={300}
              />
              <View style={styles.reviewContentText}>
                <Text style={styles.reviewAlbumTitle}>{item.album}</Text>
                <Text style={styles.reviewArtist}>{item.artist}</Text>

                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= Math.floor(item.rating) ? 'star' : 'star-outline'}
                      size={14}
                      color="#00a6ff"
                    />
                  ))}
                  <Text style={styles.trackNote}>
                    Track destaque: <Text style={{ fontFamily: 'PlusJakartaSans_700Bold' }}>{item.selectedTrack}</Text>
                  </Text>
                </View>

                <Text style={styles.reviewText}>{item.review}</Text>
              </View>
            </View>

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

      {/* Dock Flutuante de Navegação */}
      <View style={styles.dockContainer}>
        <View style={styles.dockGlass}>
          <TouchableOpacity style={styles.dockItem}>
            <Ionicons name="home" size={24} color={PALETTE.azulAero} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dockItem}
            onPress={() => navigation.navigate('Explore')}
          >
            <Ionicons name="search-outline" size={24} color={PALETTE.cinzaMedio} />
          </TouchableOpacity>

          {/* Botão central em gradiente Verde Lime */}
          <TouchableOpacity
            style={styles.addDockButtonWrapper}
            onPress={() => navigation.navigate('CreatePost')}
          >
            <LinearGradient
              colors={['#4dd5ff', '#2d6de3', '#7dfeb5']}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.7, y: 1 }}
              style={styles.addDockButton}
            >
              {/* Brilho Superior Curvo do Botão Central */}
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 0.75 }}
                style={styles.glossHighlightDockTop}
              />
              <Ionicons name="add" size={32} color={PALETTE.branco} style={{ zIndex: 3 }} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dockItem}
            onPress={() => navigation.navigate('Notification')}
          >
            <Ionicons name="heart-outline" size={24} color={PALETTE.cinzaMedio} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dockItem}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-outline" size={24} color={PALETTE.cinzaMedio} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf8ff',
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
    borderColor: PALETTE.rosaNeon,
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
    borderColor: PALETTE.branco,
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
    borderColor: PALETTE.branco,
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 12,
    marginBottom: 22,
    // shadowColor: PALETTE.azulAero,
    // shadowOffset: { width: 0, height: 6 },
    // shadowOpacity: 0.12,
    // shadowRadius: 10,
    // elevation: 4,
  },
  heroCover: {
    width: 105,
    borderWidth: 3,
    borderColor: PALETTE.branco,
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
    flex: 1,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    overflow: 'hidden',
    },
  primaryButton: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 36,
  },
  glossHighlightTop: {
    position: 'absolute',
    top: 0,
    left: 2,
    right: 2,
    height: '28%',
    borderRadius: 50,
    zIndex: 2,
  },
  buttonIcon: {
    marginRight: 6,
    zIndex: 3,
  },
  primaryButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    color: PALETTE.branco,
    zIndex: 3,
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
    borderColor: PALETTE.branco,
    borderWidth: 1.5,
    borderRadius: 30,
    padding: 12,
    marginBottom: 14,
    // shadowColor: PALETTE.azulEscuro,
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.08,
    // shadowRadius: 6,
    // elevation: 2,
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
    backgroundColor: 'rgba(217, 238, 255, 0.77)',
    borderColor: PALETTE.branco,
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    shadowColor: PALETTE.azulAero,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  dockItem: {
    padding: 8,
  },

  addDockButtonWrapper: {
    marginTop: -28,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.95)',
  },
  addDockButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  glossHighlightDockTop: {
    position: 'absolute',
    top: 0,
    left: 3,
    right: 3,
    height: '28%',
    borderRadius: 24,
    zIndex: 2,
  },
});