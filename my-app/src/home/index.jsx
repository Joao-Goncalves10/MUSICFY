import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import { useEffect, useState } from 'react';

import AlbumCard from '../../components/AlbumCard';
import { getAlbums } from '../../database/albums';
import { COLORS } from '../../constants/colors';

export default function Home() {
  const [albums, setAlbums] = useState([]);

  async function loadAlbums() {
    const data = await getAlbums();
    setAlbums(data);
  }

  useEffect(() => {
    loadAlbums();
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.greeting}>
        Olá! 💙
      </Text>

      <Text style={styles.title}>
        O que você está ouvindo?
      </Text>

      <Text style={styles.section}>
        ✦ Seus álbuns
      </Text>

      <FlatList
        data={albums}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <AlbumCard
            album={item}
            onPress={() => {
              console.log(item.id);
            }}
          />
        )}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Você ainda não adicionou
            nenhum álbum. 🎵
          </Text>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 60,
  },

  greeting: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '700',
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 5,
    marginBottom: 30,
  },

  section: {
    fontSize: 21,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 15,
  },

  empty: {
    textAlign: 'center',
    color: COLORS.textLight,
    marginTop: 50,
    fontSize: 16,
  },
});