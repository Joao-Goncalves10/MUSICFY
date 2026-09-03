import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createAlbum, updateAlbum } from '../../database/albums';

const COLORS = {
  background: '#EAF8FF',
  blue: '#0096FF',
  text: '#0D1B2A',
  gray: '#64748B',
  white: '#FFFFFF',
};

export default function AddAlbumScreen({ route, navigation }) {
  const album = route.params?.album;
  const isEditing = Boolean(album);
  const [title, setTitle] = useState(album?.title || '');
  const [artist, setArtist] = useState(album?.artist || '');
  const [year, setYear] = useState(album?.year ? String(album.year) : '');
  const [cover, setCover] = useState(album?.cover || '');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    const normalizedTitle = title.trim();
    const normalizedArtist = artist.trim();
    const normalizedYear = year.trim();

    if (!normalizedTitle || !normalizedArtist) {
      Alert.alert('Atenção', 'Informe o nome do álbum e do artista.');
      return;
    }

    if (normalizedYear && !/^\d{4}$/.test(normalizedYear)) {
      Alert.alert('Atenção', 'O ano deve ter quatro números.');
      return;
    }

    try {
      setSaving(true);
      const albumData = [
        normalizedTitle,
        normalizedArtist,
        normalizedYear ? Number(normalizedYear) : null,
        cover.trim() || null,
      ];

      if (isEditing) {
        await updateAlbum(album.id, ...albumData);
      } else {
        await createAlbum(...albumData);
      }

      Alert.alert('Sucesso', isEditing ? 'Álbum atualizado.' : 'Álbum adicionado à sua biblioteca.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Erro ao adicionar álbum:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o álbum.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Voltar">
          <Ionicons name="arrow-back" size={26} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditing ? 'Editar álbum' : 'Adicionar álbum'}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome do álbum *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: The Fame Monster"
          placeholderTextColor={COLORS.gray}
          value={title}
          onChangeText={setTitle}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Artista *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Lady Gaga"
          placeholderTextColor={COLORS.gray}
          value={artist}
          onChangeText={setArtist}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Ano</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: 2009"
          placeholderTextColor={COLORS.gray}
          value={year}
          onChangeText={setYear}
          keyboardType="number-pad"
          maxLength={4}
        />

        <Text style={styles.label}>URL da capa</Text>
        <TextInput
          style={styles.input}
          placeholder="https://..."
          placeholderTextColor={COLORS.gray}
          value={cover}
          onChangeText={setCover}
          autoCapitalize="none"
          keyboardType="url"
        />

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.disabledButton]}
          onPress={handleSave}
          disabled={saving}
        >
          <Ionicons name="add-circle-outline" size={21} color={COLORS.white} />
          <Text style={styles.saveButtonText}>
            {saving ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Adicionar álbum'}
          </Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '800',
  },
  headerSpacer: {
    width: 26,
  },
  form: {
    marginTop: 20,
  },
  label: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 7,
    marginTop: 15,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    color: COLORS.text,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    paddingVertical: 15,
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 8,
  },
});
