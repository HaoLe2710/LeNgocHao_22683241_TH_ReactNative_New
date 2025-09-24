import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootProps } from "../App";
import { Product } from "../models/Product";
import { useState } from "react";

type Props = NativeStackScreenProps<RootProps, "Home">;

export default function ProductColorChoosingScreen({ navigation }: Props) {

  const [product, setProduct] = useState<Product>({
    id: 1,
    name: "Vsmart Joy 3",
    price: 1799000,
    image: require('../assets/blue.png'), // thử để link ảnh online cho dễ test
    color: "Xanh",
  })

  function changeProduct(value: String){
    switch (value) {
      case "blue":
        setProduct({ ...product, image: require("../assets/blue.png"), color: "Xanh" });
        break;
      case "red":
        setProduct({ ...product, image: require("../assets/red.png"), color: "Đỏ" });
        break;
      case "black":
        setProduct({ ...product, image: require("../assets/black.png"), color: "Đen" });
        break;
      case "silver":
        setProduct({ ...product, image: require("../assets/silver.png"), color: "Bạc" });
        break;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Phần thông tin sản phẩm */}
      <View style={styles.productRow}>
        <Image source={product.image} style={styles.image} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text>Hàng chính hãng</Text>
          <View style={{ marginTop: 10 }}>
            <Text>Màu: {product.color}</Text>
            <Text>Cung cấp bởi Tiki Tradding</Text>
            <Text style={styles.price}>{product.price.toLocaleString()} đ</Text>
          </View>
        </View>
      </View>

      {/* Phần chọn màu */}
      <View style={styles.colorSection}>
        <Text style={{ marginBottom: 10 }}>Chọn một màu bên dưới</Text>
        <View style={styles.colorRow}>
          <TouchableOpacity onPress={() => changeProduct('black')} style={[styles.color, styles.black]} />
          <TouchableOpacity onPress={() => changeProduct('red')} style={[styles.color, styles.red]} />
          <TouchableOpacity onPress={() => changeProduct('blue')} style={[styles.color, styles.blue]} />
          <TouchableOpacity onPress={() => changeProduct('silver')} style={[styles.color, styles.silver]} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Detail",product)} style={styles.button}>
          <Text style={{ color: "white", textAlign: "center" }}>Xong</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  colorSection: {
    marginTop: 20,
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  color: {
    height: 50,
    width: 50,
  },
  red: {
    backgroundColor: "#f30d0d",
  },
  blue: {
    backgroundColor: "#234896",
  },
  silver: {
    backgroundColor: "#C5F1FB",
  },
  black: {
    backgroundColor: "black",
  },
  button: {
    padding: 15,
    backgroundColor: "cyan",
    borderRadius: 10,
  },
});
