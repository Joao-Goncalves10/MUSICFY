import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import { COLORS } from '../constants/colors';

export default function AlbumCard({ album, onPress }) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <Image
        source={{ uri: album.cover }}
        style={styles.cover}
      />

      <View style={styles.info}>
        <Text style={styles.title}>
          {album.title}
        </Text>

        <Text style={styles.artist}>
          {album.artist}
        </Text>

        <Text style={styles.year}>
          {album.year}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 24,
    padding: 12,
    marginBottom: 14,

    flexDirection: 'row',

    borderWidth: 1,
    borderColor: COLORS.border,

    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  cover: {
    width: 90,
    height: 90,
    borderRadius: 18,
  },

  info: {
    marginLeft: 14,
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },

  artist: {
    fontSize: 15,
    color: COLORS.textLight,
    marginTop: 4,
  },

  year: {
    fontSize: 13,
    color: COLORS.primary,
    marginTop: 5,
  },
});