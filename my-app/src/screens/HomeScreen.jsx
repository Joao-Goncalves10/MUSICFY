import React, { useCallback, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';

import {
  Ionicons,
  Feather,
} from '@expo/vector-icons';

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

import { getAlbums } from '../../database/albums';


// =====================================================
// PALETA MUSICFY
// =====================================================

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

  glassBg: 'rgba(255, 255, 255, 0.78)',
  glassBorder: 'rgba(255, 255, 255, 0.95)',
};


// =====================================================
// COMPONENTE DE ÁLBUM
// =====================================================

function AlbumCard({ album, onPress }) {
  return (
    <TouchableOpacity
      style={styles.albumCard}
      onPress={onPress}
      activeOpacity={0.85}
    >

      {/* CAPA */}
      {album.cover ? (
        <Image
          source={{ uri: album.cover }}
          style={styles.albumCover}
        />
      ) : (
        <View style={styles.albumCoverPlaceholder}>
          <Ionicons
            name="musical-notes"
            size={34}
            color={PALETTE.azulAero}
          />
        </View>
      )}

      {/* INFORMAÇÕES */}
      <View style={styles.albumInfo}>

        <Text
          style={styles.albumTitle}
          numberOfLines={1}
        >
          {album.title}
        </Text>

        <Text
          style={styles.albumArtist}
          numberOfLines={1}
        >
          {album.artist}
        </Text>

        <Text style={styles.albumYear}>
          {album.year || 'Ano não informado'}
        </Text>

      </View>

    </TouchableOpacity>
  );
}


// =====================================================
// HOME
// =====================================================

export default function HomeScreen({
  navigation,
}) {

  const [fontsLoaded, fontError] = useFonts({

    Nunito_800ExtraBold,
    Nunito_600SemiBold,

    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,

  });


  const [albums, setAlbums] = useState([]);

  const [search, setSearch] = useState('');


  // =====================================================
  // CARREGAR ÁLBUNS DO SQLITE
  // =====================================================

  const loadAlbums = async () => {

    try {

      const data = await getAlbums();

      setAlbums(data);

    } catch (error) {

      console.error(
        'Erro ao carregar álbuns:',
        error
      );

    }

  };


  // =====================================================
  // ATUALIZAR A HOME SEMPRE QUE VOLTAR PARA ELA
  // =====================================================

  useFocusEffect(
    useCallback(() => {

      loadAlbums();

    }, [])
  );


  // =====================================================
  // LOADING DAS FONTES
  // =====================================================

  if (!fontsLoaded && !fontError) {

    return (

      <SafeAreaView style={styles.container}>

        <View style={styles.loadingContainer}>

          <Ionicons
            name="musical-notes"
            size={35}
            color={PALETTE.azulAero}
          />

          <Text style={styles.loadingText}>
            Carregando MUSICFY...
          </Text>

        </View>

      </SafeAreaView>

    );

  }


  // =====================================================
  // FILTRO DE PESQUISA
  // =====================================================

  const filteredAlbums = albums.filter((album) => {

    const searchText =
      search.toLowerCase();

    return (

      album.title
        ?.toLowerCase()
        .includes(searchText)

      ||

      album.artist
        ?.toLowerCase()
        .includes(searchText)

    );

  });


  // =====================================================
  // RENDERIZAÇÃO DO ÁLBUM
  // =====================================================

  const renderAlbum = ({ item }) => (

    <AlbumCard
      album={item}
      onPress={() => {
        navigation.navigate('AlbumDetails', { id: item.id });

      }}
    />

  );


  // =====================================================
  // TELA
  // =====================================================

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#0c4783"
      />


      {/* =================================================
          FUNDO AERO
      ================================================= */}

      <LinearGradient
        colors={[
          '#b1cbe4',
          '#D5E9FF',
          '#b3d9ff',
        ]}
        style={StyleSheet.absoluteFillObject}
      />


      {/* =================================================
          CONTEÚDO PRINCIPAL
      ================================================= */}

      <FlatList

        data={filteredAlbums}

        keyExtractor={(item) =>
          item.id.toString()
        }

        renderItem={renderAlbum}

        numColumns={2}

        columnWrapperStyle={styles.columnWrapper}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={
          styles.contentContainer
        }


        /* =================================================
           CABEÇALHO
        ================================================= */

        ListHeaderComponent={

          <>

            {/* HEADER */}

            <View style={styles.header}>

              <View>

                <Text style={styles.logoTitle}>
                  MUSICFY
                </Text>

                <Text style={styles.subtext}>
                  O que vamos ouvir hoje?
                </Text>

              </View>


              <TouchableOpacity
                style={styles.avatarContainer}
              >

                <View style={styles.avatarPlaceholder}>

                  <Ionicons
                    name="person"
                    size={21}
                    color={PALETTE.azulAero}
                  />

                </View>

              </TouchableOpacity>

            </View>


            {/* =================================================
                PESQUISA
            ================================================= */}

            <View style={styles.searchCard}>

              <Feather
                name="search"
                size={20}
                color={PALETTE.azulAero}
                style={styles.searchIcon}
              />

              <TextInput
                style={styles.searchInput}

                placeholder="Buscar álbuns e artistas..."

                placeholderTextColor={
                  PALETTE.cinzaMedio
                }

                value={search}

                onChangeText={setSearch}

              />

              {search.length > 0 && (

                <TouchableOpacity
                  onPress={() => setSearch('')}
                >

                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={PALETTE.cinzaMedio}
                  />

                </TouchableOpacity>

              )}

            </View>


            {/* =================================================
                BANNER
            ================================================= */}

            <View style={styles.welcomeCard}>

              <LinearGradient
                colors={[
                  PALETTE.azulAero,
                  PALETTE.aquaGlow,
                ]}

                start={{
                  x: 0,
                  y: 0,
                }}

                end={{
                  x: 1,
                  y: 1,
                }}

                style={styles.welcomeGradient}
              >

                <View>

                  <Text style={styles.welcomeSmall}>
                    ✦ MUSICFY
                  </Text>

                  <Text style={styles.welcomeTitle}>
                    Sua biblioteca musical.
                  </Text>

                  <Text style={styles.welcomeText}>
                    Descubra, avalie e compartilhe
                    o que você está ouvindo.
                  </Text>

                </View>

                <Ionicons
                  name="musical-notes"
                  size={65}
                  color="rgba(255,255,255,0.8)"
                />

              </LinearGradient>

            </View>


            {/* =================================================
                TÍTULO
            ================================================= */}

            <View style={styles.sectionHeader}>

              <View>

                <Text style={styles.sectionTitle}>
                  ✦ Sua biblioteca
                </Text>

                <Text style={styles.sectionSubtitle}>
                  {albums.length} álbum
                  {albums.length !== 1
                    ? 's'
                    : ''
                  }
                </Text>

              </View>

            </View>

          </>

        }


        /* =================================================
           QUANDO NÃO EXISTIREM ÁLBUNS
        ================================================= */

        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <View style={styles.emptyIcon}>

              <Ionicons
                name="disc-outline"
                size={55}
                color={PALETTE.azulAero}
              />

            </View>


            <Text style={styles.emptyTitle}>
              Sua biblioteca está vazia
            </Text>


            <Text style={styles.emptyText}>
              Adicione seu primeiro álbum
              para começar sua coleção.
            </Text>


            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('AddAlbum')}
            >

              <LinearGradient
                colors={[
                  PALETTE.azulAero,
                  PALETTE.roxoOrbital,
                ]}

                style={styles.emptyButtonGradient}
              >

                <Ionicons
                  name="add"
                  size={20}
                  color={PALETTE.branco}
                />

                <Text style={styles.emptyButtonText}>
                  Adicionar álbum
                </Text>

              </LinearGradient>

            </TouchableOpacity>

          </View>

        }

      />


      {/* =================================================
          DOCK INFERIOR
      ================================================= */}

      <View style={styles.dockContainer}>

        <View style={styles.dockGlass}>

          {/* HOME */}

          <TouchableOpacity style={styles.dockItem}>

            <Ionicons
              name="home"
              size={24}
              color={PALETTE.azulAero}
            />

          </TouchableOpacity>


          {/* EXPLORAR */}

          <TouchableOpacity
            style={styles.dockItem}
            onPress={() => navigation.navigate('Explore')}
          >

            <Ionicons
              name="search-outline"
              size={24}
              color={PALETTE.cinzaMedio}
            />

          </TouchableOpacity>


          {/* BOTÃO ADICIONAR */}

          <TouchableOpacity
            style={styles.addDockButtonWrapper}
            onPress={() => navigation.navigate('CreatePost')}
            accessibilityLabel="Adicionar álbum"
          >

            <LinearGradient
              colors={[
                  PALETTE.azulAero,
                  PALETTE.aquaGlow,
                ]}

                start={{
                  x: 0,
                  y: 1,
                }}

                end={{
                  x: 1,
                  y: 1,
                }}

              style={styles.addDockButton}
            >

              <Ionicons
                name="add"
                size={30}
                color={PALETTE.azulEscuro}
              />

            </LinearGradient>

          </TouchableOpacity>


          {/* NOTIFICAÇÕES */}

          <TouchableOpacity
            style={styles.dockItem}
            onPress={() => navigation.navigate('Notification')}
          >

            <Ionicons
              name="heart-outline"
              size={24}
              color={PALETTE.cinzaMedio}
            />

          </TouchableOpacity>


          {/* PERFIL */}

          <TouchableOpacity
            style={styles.dockItem}
            onPress={() => navigation.navigate('Profile')}
          >

            <Ionicons
              name="person-outline"
              size={24}
              color={PALETTE.cinzaMedio}
            />

          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>

  );

}


// =====================================================
// ESTILOS
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },


  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  loadingText: {
    marginTop: 10,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: PALETTE.azulAero,
    fontSize: 15,
  },


  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 120,
  },


  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },


  logoTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 30,
    color: PALETTE.azulAero,
    letterSpacing: 0.8,
  },


  subtext: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 13,
    color: PALETTE.cinzaMedio,
    marginTop: 2,
  },


  avatarContainer: {
    padding: 2,
    borderRadius: 25,
    backgroundColor: PALETTE.branco,
    borderWidth: 2,
    borderColor: PALETTE.azulCeu,

    shadowColor: PALETTE.azulAero,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },


  avatarPlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF8FF',
  },


  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: PALETTE.glassBg,

    borderColor: PALETTE.glassBorder,
    borderWidth: 1.5,

    borderRadius: 20,

    paddingHorizontal: 14,

    height: 48,

    marginBottom: 18,

    shadowColor: PALETTE.azulAero,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },


  searchIcon: {
    marginRight: 8,
  },


  searchInput: {
    flex: 1,

    fontFamily:
      'PlusJakartaSans_400Regular',

    fontSize: 14,

    color: PALETTE.azulEscuro,
  },


  welcomeCard: {
    borderRadius: 25,
    overflow: 'hidden',

    marginBottom: 24,

    shadowColor: PALETTE.azulAero,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 5,
  },


  welcomeGradient: {
    minHeight: 145,

    padding: 20,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },


  welcomeSmall: {
    fontFamily:
      'PlusJakartaSans_700Bold',

    fontSize: 11,

    color: 'rgba(255,255,255,0.9)',

    marginBottom: 5,
  },


  welcomeTitle: {
    fontFamily:
      'Nunito_800ExtraBold',

    fontSize: 23,

    color: PALETTE.branco,

    maxWidth: 230,
  },


  welcomeText: {
    fontFamily:
      'PlusJakartaSans_400Regular',

    fontSize: 11,

    lineHeight: 16,

    color: 'rgba(255,255,255,0.9)',

    maxWidth: 235,

    marginTop: 5,
  },


  sectionHeader: {
    marginBottom: 14,
  },


  sectionTitle: {
    fontFamily:
      'Nunito_800ExtraBold',

    fontSize: 21,

    color: PALETTE.azulEscuro,
  },


  sectionSubtitle: {
    fontFamily:
      'PlusJakartaSans_400Regular',

    fontSize: 12,

    color: PALETTE.cinzaMedio,

    marginTop: 2,
  },


  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },


  // =====================================================
  // ALBUM CARD
  // =====================================================

  albumCard: {
    width: '48.5%',

    backgroundColor: PALETTE.glassBg,

    borderColor: PALETTE.glassBorder,

    borderWidth: 1.5,

    borderRadius: 20,

    padding: 10,

    shadowColor: PALETTE.azulAero,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.1,

    shadowRadius: 8,

    elevation: 3,
  },


  albumCover: {
    width: '100%',
    aspectRatio: 1,

    borderRadius: 15,

    backgroundColor: '#D5E9FF',
  },


  albumCoverPlaceholder: {
    width: '100%',
    aspectRatio: 1,

    borderRadius: 15,

    backgroundColor: '#DDF5FF',

    alignItems: 'center',
    justifyContent: 'center',
  },


  albumInfo: {
    paddingTop: 9,
  },


  albumTitle: {
    fontFamily:
      'Nunito_800ExtraBold',

    fontSize: 15,

    color: PALETTE.azulEscuro,
  },


  albumArtist: {
    fontFamily:
      'PlusJakartaSans_500Medium',

    fontSize: 11,

    color: PALETTE.cinzaAero,

    marginTop: 2,
  },


  albumYear: {
    fontFamily:
      'PlusJakartaSans_400Regular',

    fontSize: 10,

    color: PALETTE.cinzaMedio,

    marginTop: 3,
  },


  // =====================================================
  // EMPTY STATE
  // =====================================================

  emptyContainer: {
    alignItems: 'center',

    paddingHorizontal: 30,

    paddingTop: 25,
  },


  emptyIcon: {
    width: 95,
    height: 95,

    borderRadius: 48,

    backgroundColor:
      'rgba(255,255,255,0.8)',

    borderWidth: 1.5,

    borderColor:
      PALETTE.glassBorder,

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 15,
  },


  emptyTitle: {
    fontFamily:
      'Nunito_800ExtraBold',

    fontSize: 20,

    color: PALETTE.azulEscuro,

    textAlign: 'center',
  },


  emptyText: {
    fontFamily:
      'PlusJakartaSans_400Regular',

    fontSize: 13,

    lineHeight: 19,

    color: PALETTE.cinzaMedio,

    textAlign: 'center',

    marginTop: 7,

    marginBottom: 18,
  },


  emptyButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },


  emptyButtonGradient: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    paddingHorizontal: 18,

    paddingVertical: 11,

    gap: 6,
  },


  emptyButtonText: {
    fontFamily:
      'PlusJakartaSans_700Bold',

    fontSize: 13,

    color: PALETTE.branco,
  },


  // =====================================================
  // DOCK
  // =====================================================

  dockContainer: {
    position: 'absolute',

    bottom: 20,

    left: 20,

    right: 20,

    alignItems: 'center',
  },


  dockGlass: {
    flexDirection: 'row',

    backgroundColor:
      'rgba(255,255,255,0.88)',

    borderColor:
      PALETTE.glassBorder,

    borderWidth: 1.5,

    borderRadius: 30,

    paddingHorizontal: 16,

    paddingVertical: 8,

    alignItems: 'center',

    justifyContent: 'space-between',

    width: '100%',

    shadowColor:
      PALETTE.azulAero,

    shadowOffset: {
      width: 0,
      height: 8,
    },

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

    shadowColor:
      PALETTE.aquaGlow,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.4,

    shadowRadius: 6,

    elevation: 6,
  },


  addDockButton: {
    width: 60,
    height: 60,

    borderRadius: 50,

    alignItems: 'center',
    justifyContent: 'center',
  },

});