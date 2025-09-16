import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Review() {
  const [review, setReview] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.productRow}>
        <Image source={require('../../assets/images/usb.png')} style={styles.productImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.productTitle}>USB Bluetooth Music Receiver HJX-001- Biến loa thường thành loa bluetooth</Text>
        </View>
      </View>
      <Text style={styles.satisfaction}>Cực kỳ hài lòng</Text>
      <View style={styles.starsRow}>
        {[...Array(5)].map((_, i) => (
          <FontAwesome key={i} name="star" size={36} color="#FFD600" style={{ marginHorizontal: 2 }} />
        ))}
      </View>
      <TouchableOpacity style={styles.imageButton}>
        <FontAwesome name="camera" size={28} color="#111" style={{ marginRight: 8 }} />
        <Text style={styles.imageButtonText}>Thêm hình ảnh</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.textArea}
        placeholder="Hãy chia sẻ những điều mà bạn thích về sản phẩm"
        placeholderTextColor="#aaa"
        multiline
        value={review}
        onChangeText={setReview}
      />
      <Text style={styles.link}>https://meet.google.com/nsj-ojwi-xpp</Text>
      <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Gửi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    width: '100%',
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 12,
    resizeMode: 'contain',
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111',
  },
  satisfaction: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 12,
    color: '#111',
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3b3bff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 18,
    width: '100%',
    justifyContent: 'center',
  },
  imageButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#111',
  },
  textArea: {
    width: '100%',
    minHeight: 80,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
    color: '#222',
  },
  link: {
    color: '#111',
    fontSize: 14,
    marginBottom: 18,
    alignSelf: 'flex-start',
  },
  sendButton: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '100%',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
