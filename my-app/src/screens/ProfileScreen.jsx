import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReviews } from '../../database/review';

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

export default function ProfileScreen({ navigation }) {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({
    name: 'João Silva',
    username: 'joaomusic',
    bio: 'música, café e caos ♫',
    avatar: null,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserProfile();
      loadReviews();
    });
    return unsubscribe;
  }, [navigation]);

  async function loadUserProfile() {
    try {
      const savedUser = await AsyncStorage.getItem('@user_profile');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do perfil:', error);
    }
  }

  async function loadReviews() {
    try {
      const data = await getReviews();
      setReviews(data || []);
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
      setReviews([]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={COLORS.text} />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Meu perfil</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile', { user })}
              >
                <Ionicons name="settings-outline" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.profile}>
              <View style={styles.avatar}>
                {user.avatar ? (
                  <Image source={{ uri: user.avatar }} style={styles.avatarImg} />
                ) : (
                  <Ionicons name="person" size={42} color={COLORS.blue} />
                )}
              </View>

              <Text style={styles.username}>@{user.username}</Text>
              <Text style={styles.bio}>{user.bio}</Text>

              <View style={styles.stats}>
                <View>
                  <Text style={styles.number}>{reviews.length}</Text>
                  <Text style={styles.statText}>Avaliações</Text>
                </View>

                <View>
                  <Text style={styles.number}>127</Text>
                  <Text style={styles.statText}>Seguidores</Text>
                </View>

                <View>
                  <Text style={styles.number}>89</Text>
                  <Text style={styles.statText}>Seguindo</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('EditProfile', { user })}
              >
                <Text style={styles.editText}>Editar perfil</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.section}>✦ Minhas avaliações</Text>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.reviewCard}>
            <View style={styles.albumPlaceholder}>
              <Ionicons name="disc" size={35} color={COLORS.blue} />
            </View>

            <Text style={styles.reviewRating}>
              {'★'.repeat(Math.round(item.rating || 0))}
            </Text>

            <Text style={styles.reviewText} numberOfLines={2}>
              {item.review || 'Sem resenha'}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Você ainda não avaliou nenhum álbum.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18 },
  headerTitle: { fontSize: 22, fontWeight: '900', color: COLORS.text },
  profile: { alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 25, padding: 20 },
  avatar: { width: 85, height: 85, borderRadius: 43, backgroundColor: '#EAF8FF', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  avatarImg: { width: '100%', height: '100%' },
  username: { fontSize: 21, fontWeight: '900', color: COLORS.text, marginTop: 10 },
  bio: { color: COLORS.gray, marginTop: 3, textAlign: 'center' },
  stats: { flexDirection: 'row', gap: 45, marginTop: 20 },
  number: { textAlign: 'center', fontWeight: '900', fontSize: 19, color: COLORS.blue },
  statText: { color: COLORS.gray, fontSize: 11 },
  editButton: { borderWidth: 1.5, borderColor: COLORS.blue, borderRadius: 14, paddingHorizontal: 30, paddingVertical: 9, marginTop: 18 },
  editText: { color: COLORS.blue, fontWeight: '800' },
  section: { fontSize: 21, fontWeight: '900', color: COLORS.text, marginTop: 28, marginBottom: 15 },
  reviewCard: { width: '48%', backgroundColor: COLORS.white, borderRadius: 18, padding: 10, marginBottom: 12 },
  albumPlaceholder: { aspectRatio: 1, borderRadius: 14, backgroundColor: '#DDF5FF', alignItems: 'center', justifyContent: 'center' },
  reviewRating: { color: '#FFB800', fontSize: 12, marginTop: 7 },
  reviewText: { fontSize: 11, color: COLORS.gray, marginTop: 3 },
  empty: { textAlign: 'center', color: COLORS.gray, marginTop: 30 },
});