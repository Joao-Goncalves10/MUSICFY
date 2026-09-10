import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAlbums, rateAlbum } from '../../database/albums';

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

export default function CreatePostScreen({ navigation }) {
  const [postText, setPostText] = useState('');
  const [albums, setAlbums] = useState([]);
  
  // Seleções do Usuário
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [rating, setRating] = useState(0);

  // Modais
  const [albumModalVisible, setAlbumModalVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);

  useEffect(() => {
    loadAlbumsList();
  }, []);

  async function loadAlbumsList() {
    const list = await getAlbums();
    setAlbums(list || []);
  }

  async function handlePublish() {
    if (!selectedAlbum) {
      Alert.alert('Atenção', 'Por favor, selecione um álbum para publicar.');
      return;
    }

    try {
      // Salva a avaliação no banco se houver nota
      if (rating > 0) {
        await rateAlbum(selectedAlbum.id, rating, postText);
      }

      Alert.alert('Sucesso', 'Sua publicação foi criada!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao publicar:', error);
      Alert.alert('Erro', 'Não foi possível salvar a publicação.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Criar publicação</Text>

        <TouchableOpacity onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Publicar</Text>
        </TouchableOpacity>
      </View>

      {/* PERFIL DO USUÁRIO */}
      <View style={styles.userInfo}>
        <View style={styles.userAvatar}>
          <Ionicons name="person" size={22} color={COLORS.blue} />
        </View>
        <Text style={styles.username}>@joaomusic</Text>
      </View>

      {/* CAMPO DE TEXTO */}
      <View style={styles.inputCard}>
        <TextInput
          style={styles.textInput}
          placeholder="O que você está ouvindo?"
          placeholderTextColor={COLORS.gray}
          multiline
          value={postText}
          onChangeText={setPostText}
        />

        {/* PREVIEW DO ÁLBUM SELECIONADO */}
        {selectedAlbum && (
          <View style={styles.selectedAlbumBadge}>
            {selectedAlbum.cover ? (
              <Image source={{ uri: selectedAlbum.cover }} style={styles.badgeCover} />
            ) : (
              <Ionicons name="disc" size={20} color={COLORS.blue} />
            )}
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.badgeTitle} numberOfLines={1}>
                {selectedAlbum.title}
              </Text>
              <Text style={styles.badgeArtist} numberOfLines={1}>
                {selectedAlbum.artist}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedAlbum(null)}>
              <Ionicons name="close-circle" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
        )}

        {/* PREVIEW DA NOTA SELECIONADA */}
        {rating > 0 && (
          <View style={styles.selectedRatingBadge}>
            <Ionicons name="star" size={18} color={COLORS.pink} />
            <Text style={styles.ratingBadgeText}>{rating}.0 / 5.0</Text>
            <TouchableOpacity onPress={() => setRating(0)} style={{ marginLeft: 'auto' }}>
              <Ionicons name="close-circle" size={18} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* BOTÕES DE SELEÇÃO (ÁLBUM E AVALIAÇÃO) */}
      <View style={styles.optionsRow}>
        <TouchableOpacity

        
          style={styles.optionPill}
          onPress={() => setAlbumModalVisible(true)}
        >
          <Ionicons name="disc-outline" size={20} color={COLORS.gray} />
          <Text style={styles.optionPillText}>Álbum</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionPill}
          onPress={() => setRatingModalVisible(true)}
        >
          <Ionicons name="star-outline" size={20} color={COLORS.purple} />
          <Text style={styles.optionPillText}>Avaliação</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL 1: SELECIONAR ÁLBUM */}
      <Modal
        visible={albumModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAlbumModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Escolha um Álbum</Text>
              <TouchableOpacity onPress={() => setAlbumModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={albums}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.albumItem}
                  onPress={() => {
                    setSelectedAlbum(item);
                    setAlbumModalVisible(false);
                  }}
                >
                  {item.cover ? (
                    <Image source={{ uri: item.cover }} style={styles.albumItemCover} />
                  ) : (
                    <View style={styles.albumPlaceholder}>
                      <Ionicons name="musical-notes" size={20} color={COLORS.blue} />
                    </View>
                  )}
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={styles.albumItemTitle}>{item.title}</Text>
                    <Text style={styles.albumItemArtist}>{item.artist}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* MODAL 2: SELECIONAR NOTA / AVALIAÇÃO */}
      <Modal
        visible={ratingModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.ratingModalContent}>
            <Text style={styles.modalTitle}>Sua Nota para o Álbum</Text>

            <View style={styles.starsPickerContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={36}
                    color={star <= rating ? COLORS.pink : COLORS.gray}
                    style={{ marginHorizontal: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.confirmRatingButton}
              onPress={() => setRatingModalVisible(false)}
            >
              <Text style={styles.confirmRatingText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  publishButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.blue,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  userAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginLeft: 10,
  },
  inputCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 18,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  textInput: {
    fontSize: 16,
    color: COLORS.text,
    textAlignVertical: 'top',
  },
  selectedAlbumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 8,
    borderRadius: 14,
    marginTop: 12,
  },
  badgeCover: {
    width: 32,
    height: 32,
    borderRadius: 6,
  },
  badgeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },
  badgeArtist: {
    fontSize: 11,
    color: COLORS.gray,
  },
  selectedRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0FA',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
  },
  ratingBadgeText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.pink,
    marginLeft: 6,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  optionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  optionPillText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },

  // ESTILOS DOS MODAIS
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  albumItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  albumItemCover: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  albumPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  albumItemArtist: {
    fontSize: 13,
    color: COLORS.gray,
  },
  ratingModalContent: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    alignSelf: 'center',
    width: '85%',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  starsPickerContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  confirmRatingButton: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 16,
  },
  confirmRatingText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 15,
  },
});