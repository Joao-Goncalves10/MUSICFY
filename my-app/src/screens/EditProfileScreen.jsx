import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = {
  blue: '#0096FF',
  purple: '#915BFF',
  pink: '#FF4FD8',
  background: '#EAF8FF',
  white: '#FFFFFF',
  text: '#0D1B2A',
  gray: '#64748B',
  lightGray: '#F0F4F8',
};

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
];

export default function EditProfileScreen({ route, navigation }) {
  const currentProfile = route.params?.user || {};

  const [name, setName] = useState(currentProfile.name || 'João Silva');
  const [username, setUsername] = useState(currentProfile.username || 'joaomusic');
  const [bio, setBio] = useState(currentProfile.bio || 'música, café e caos ♫');
  const [avatar, setAvatar] = useState(currentProfile.avatar || AVATAR_OPTIONS[0]);

  async function handleSave() {
    if (!name.trim() || !username.trim()) {
      Alert.alert('Atenção', 'O nome e o nome de usuário não podem ficar vazios.');
      return;
    }

    const updatedUser = { name, username, bio, avatar };

    try {
      // Salva permanentemente no dispositivo
      await AsyncStorage.setItem('@user_profile', JSON.stringify(updatedUser));
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar dados do perfil:', error);
      Alert.alert('Erro', 'Não foi possível salvar o perfil.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar perfil</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveHeaderButton}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={50} color={COLORS.blue} />
              </View>
            )}
          </View>

          <Text style={styles.avatarSectionTitle}>Escolha um ícone de perfil</Text>

          <View style={styles.avatarPickerRow}>
            {AVATAR_OPTIONS.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setAvatar(item)}
                style={[
                  styles.avatarOption,
                  avatar === item && styles.avatarOptionSelected,
                ]}
              >
                <Image source={{ uri: item }} style={styles.avatarOptionImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome de exibição</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={COLORS.gray} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Seu nome"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome de usuário</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.atSymbol}>@</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="seuusuario"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Biografia</Text>
            <View style={[styles.inputContainer, styles.bioContainer]}>
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                placeholder="Escreva algo sobre você..."
                multiline
                maxLength={150}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  saveHeaderButton: { fontSize: 16, fontWeight: '800', color: COLORS.blue },
  avatarSection: { alignItems: 'center', marginVertical: 16 },
  avatarWrapper: { position: 'relative' },
  avatarImage: { width: 90, height: 90, borderRadius: 45 },
  avatarPlaceholder: { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center' },
  avatarSectionTitle: { fontSize: 13, fontWeight: '700', color: COLORS.gray, marginTop: 12 },
  avatarPickerRow: { flexDirection: 'row', gap: 12, marginTop: 10 },
  avatarOption: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'transparent' },
  avatarOptionSelected: { borderColor: COLORS.pink },
  avatarOptionImage: { width: '100%', height: '100%', borderRadius: 20 },
  formCard: { backgroundColor: COLORS.white, borderRadius: 24, padding: 18, marginVertical: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightGray, borderRadius: 14, paddingHorizontal: 12, height: 48 },
  atSymbol: { fontSize: 16, fontWeight: '800', color: COLORS.gray, marginRight: 4 },
  input: { flex: 1, fontSize: 15, color: COLORS.text, marginLeft: 8 },
  bioContainer: { height: 80, alignItems: 'flex-start', paddingVertical: 10 },
  bioInput: { marginLeft: 0, textAlignVertical: 'top' },
  saveBtn: { backgroundColor: COLORS.blue, height: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  saveBtnText: { color: COLORS.white, fontWeight: '800', fontSize: 16 },
});