import React from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

const COLORS = {
  blue: '#0096FF',
  background: '#EAF8FF',
  white: '#FFFFFF',
  text: '#0D1B2A',
  gray: '#64748B',
};

const notifications = [

  {
    id: '1',
    icon: 'heart',
    text: '@laura curtiu sua avaliação',
    time: '2h',
  },

  {
    id: '2',
    icon: 'person-add',
    text: '@mateus começou a seguir você',
    time: '4h',
  },

  {
    id: '3',
    icon: 'chatbubble',
    text: '@bia comentou sua publicação',
    time: '6h',
  },

  {
    id: '4',
    icon: 'heart',
    text: '@musiclover curtiu seu post',
    time: '1d',
  },

];


export default function NotificationsScreen({
  navigation,
}) {

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
          Notificações
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList

        data={notifications}

        keyExtractor={item =>
          item.id
        }

        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={styles.icon}>

              <Ionicons
                name={item.icon}
                size={20}
                color={COLORS.blue}
              />

            </View>


            <View style={styles.content}>

              <Text style={styles.text}>
                {item.text}
              </Text>

              <Text style={styles.time}>
                {item.time}
              </Text>

            </View>

          </View>

        )}

      />

    </SafeAreaView>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 0,
    marginBottom: 15,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EAF8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    marginLeft: 12,
    flex: 1,
  },

  text: {
    color: COLORS.text,
    fontWeight: '600',
  },

  time: {
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 3,
  },

});