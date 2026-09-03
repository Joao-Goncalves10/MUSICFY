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
import { LinearGradient } from 'expo-linear-gradient';

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

// Lista de avatares pré-definidos para escolha rápida
const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
];

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('João Silva');
  const [username, setUsername] = useState('joaomusic');
  const [bio, setBio] = useState('Apaixonado por música pop, indie e colecionador de discos de vinil. 🎧✨');
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0]);

  function handleSave() {
    if (!name.trim() || !username.trim()) {
      Alert.alert('Atenção', 'O nome e o nome de usuário não podem ficar vazios.');
      return;
    }

    // Aqui você pode integrar o salvamento no SQLite ou AsyncStorage
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color={COLORS.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Editar perfil</Text>

          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveHeaderButton}>Salvar</Text>
          </TouchableOpacity>
        </View>

        {/* FOTO DE PERFIL / AVATAR */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={50} color={COLORS.blue} />
              </View>
            )}

            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={16} color={COLORS.white} />
            </View>
          </View>

          <Text style={styles.avatarSectionTitle}>Escolha um ícone de perfil</Text>

          {/* SELETOR RÁPIDO DE AVATARES */}
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

        {/* FORMULÁRIO */}
        <View style={styles.formCard}>
          {/* NOME DE EXIBIÇÃO */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome de exibição</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={COLORS.gray} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Seu nome"
                placeholderTextColor={COLORS.gray}
              />
            </View>
          </View>

          {/* NOME DE USUÁRIO (@) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome de usuário</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.atSymbol}>@</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="seuusuario"
                placeholderTextColor={COLORS.gray}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* BIOGRAFIA */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Biografia</Text>
            <View style={[styles.inputContainer, styles.bioContainer]}>
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                placeholder="Escreva algo sobre você..."
                placeholderTextColor={COLORS.gray}
                multiline
                maxLength={150}
              />
            </View>
            <Text style={styles.charCounter}>{bio.length}/150</Text>
          </View>
        </View>

        {/* BOTÃO SALVAR */}
        <TouchableOpacity onPress={handleSave} style={{ marginBottom: 30 }}>
          <LinearGradient
            colors={[COLORS.blue, COLORS.purple]}
            style={styles.saveButton}
          >
            <Ionicons name="checkmark-sharp" size={22} color={COLORS.white} />
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  saveHeaderButton: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.blue,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.blue,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  avatarSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.gray,
    marginTop: 14,
  },
  avatarPickerRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  avatarOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarOptionSelected: {
    borderColor: COLORS.pink,
  },
  avatarOptionImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 18,
    marginVertical: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
  },
  atSymbol: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.gray,
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    marginLeft: 8,
  },
  bioContainer: {
    height: 90,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  bioInput: {
    marginLeft: 0,
    textAlignVertical: 'top',
  },
  charCounter: {
    fontSize: 11,
    color: COLORS.gray,
    textAlign: 'right',
    marginTop: 4,
  },
  saveButton: {
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
});