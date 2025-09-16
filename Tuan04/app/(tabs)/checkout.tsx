import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Checkout() {
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState('');

  return (
    <View style={styles.container}>
      {/* Product Info */}
      <View style={styles.productRow}>
        <Image source={require('../../assets/images/book.png')} style={styles.productImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.productTitle}>Nguyên hàm, tích phân và ứng dụng</Text>
          <Text style={styles.productSupplier}>Cung cấp bởi Tiki Trading</Text>
          <Text style={styles.productPrice}>141.800 đ</Text>
          <Text style={styles.productOldPrice}>141.800 đ</Text>
          <View style={styles.quantityRow}>
            <TouchableOpacity style={styles.quantityBtn} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Text style={styles.quantityBtnText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityBtn} onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.quantityBtnText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.buyLater}>Mua sau</Text>
          </View>
        </View>
      </View>
      {/* Discount */}
      <View style={styles.discountRow}>
        <TextInput
          style={styles.discountInput}
          placeholder="Mã giảm giá"
          placeholderTextColor="#222"
          value={discount}
          onChangeText={setDiscount}
        />
        <TouchableOpacity style={styles.discountBtn}>
          <Text style={styles.discountBtnText}>Áp dụng</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.discountSaved}>Mã giảm giá đã lưu <Text style={styles.discountLink}>Xem tại đây</Text></Text>
      {/* Gift Card */}
      <View style={styles.giftRow}>
        <Text style={styles.giftText}>Bạn có phiếu quà tặng Tiki/Got it/ Urbox?</Text>
        <Text style={styles.giftLink}>Nhập tại đây?</Text>
      </View>
      {/* Subtotal */}
      <View style={styles.subtotalRow}>
        <Text style={styles.subtotalLabel}>Tạm tính</Text>
        <Text style={styles.subtotalValue}>141.800 đ</Text>
      </View>
      {/* Total */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Thành tiền</Text>
        <Text style={styles.totalValue}>141.800 đ</Text>
      </View>
      {/* Order Button */}
      <TouchableOpacity style={styles.orderBtn}>
        <Text style={styles.orderBtnText}>TIẾN HÀNH ĐẶT HÀNG</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  productRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  productImage: {
    width: 70,
    height: 90,
    marginRight: 12,
    resizeMode: 'contain',
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111',
  },
  productSupplier: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#e53935',
    marginBottom: 2,
  },
  productOldPrice: {
    fontSize: 14,
    color: '#aaa',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  quantityBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityBtnText: {
    fontSize: 18,
    color: '#111',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
    minWidth: 24,
    textAlign: 'center',
  },
  buyLater: {
    color: '#1976d2',
    marginLeft: 16,
    fontSize: 14,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  discountInput: {
    flex: 1,
    backgroundColor: '#fffde7',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 16,
    marginRight: 8,
  },
  discountBtn: {
    backgroundColor: '#1976d2',
    borderRadius: 6,
    paddingHorizontal: 18,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  discountSaved: {
    fontSize: 14,
    color: '#222',
    marginBottom: 8,
  },
  discountLink: {
    color: '#1976d2',
    textDecorationLine: 'underline',
  },
  giftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  giftText: {
    fontSize: 14,
    color: '#222',
    flex: 1,
  },
  giftLink: {
    color: '#1976d2',
    fontSize: 14,
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  subtotalLabel: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
  },
  subtotalValue: {
    fontSize: 16,
    color: '#e53935',
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    color: '#e53935',
    fontWeight: 'bold',
  },
  orderBtn: {
    backgroundColor: '#e53935',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  orderBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
