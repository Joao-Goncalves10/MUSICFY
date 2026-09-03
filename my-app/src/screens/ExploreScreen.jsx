import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  getAlbums,
} from '../../database/albums';

const COLORS = {
  blue: '#0096FF',
  green: '#7CFF00',
  purple: '#915BFF',
  background: '#EAF8FF',
  white: '#FFFFFF',
  text: '#0D1B2A',
  gray: '#64748B',
};

export default function ExploreScreen({
  navigation,
}) {

  const [albums, setAlbums] =
    useState([]);

  const [search, setSearch] =
    useState('');


  useEffect(() => {

    loadAlbums();

  }, []);


  async function loadAlbums() {

    const data = await getAlbums();

    setAlbums(data);

  }


  const filteredAlbums =
    albums.filter(album =>

      album.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      album.artist
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );


  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={COLORS.blue}
          />
        </TouchableOpacity>
        <Text style={styles.title}>
          Explorar ✦
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.search}>

        <Ionicons
          name="search"
          size={20}
          color={COLORS.blue}
        />

        <TextInput
          style={styles.input}
          placeholder="Buscar música..."
          value={search}
          onChangeText={setSearch}
        />

      </View>


      <Text style={styles.section}>
        Álbuns
      </Text>


      <FlatList

        data={filteredAlbums}

        numColumns={2}

        keyExtractor={item =>
          item.id.toString()
        }

        columnWrapperStyle={{
          justifyContent:
            'space-between',
          marginBottom: 14,
        }}

        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}

            onPress={() =>
              navigation.navigate(
                'AlbumDetails',
                {
                  id: item.id,
                }
              )
            }
          >

            <View
              style={styles.cover}
            >

              <Ionicons
                name="disc-outline"
                size={45}
                color={COLORS.blue}
              />

            </View>


            <Text
              style={styles.album}
              numberOfLines={1}
            >
              {item.title}
            </Text>


            <Text
              style={styles.artist}
              numberOfLines={1}
            >
              {item.artist}
            </Text>

          </TouchableOpacity>

        )}

        ListEmptyComponent={

          <Text style={styles.empty}>
            Nenhum álbum encontrado.
          </Text>

        }

      />

    </SafeAreaView>

  );

}


const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 0,
    marginBottom: 8,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 18,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 20,
  },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 50,
    marginTop: 20,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    color: COLORS.text,
  },

  section: {
    fontSize: 21,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 25,
    marginBottom: 15,
  },

  card: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 10,
  },

  cover: {
    aspectRatio: 1,
    borderRadius: 15,
    backgroundColor: '#DDF5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  album: {
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 8,
  },

  artist: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 2,
  },

  empty: {
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 40,
  },

});