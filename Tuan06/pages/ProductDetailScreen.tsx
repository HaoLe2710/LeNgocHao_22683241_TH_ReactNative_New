import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootProps } from "../App";

type Props = NativeStackScreenProps<RootProps, "Detail">;

export default function ProductDetailScreen({ route, navigation }: Props) {
  const product = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Ảnh sản phẩm */}
      <Image source={product.image} style={styles.productImage} />

      {/* Tên sản phẩm */}
      <Text style={styles.name}>{product.name}</Text>

      {/* Rating */}
      <View style={styles.row}>
        {[...Array(5)].map((_, i) => (
          <Image
            key={i}
            style={styles.rating}
            source={require("../assets/star.png")}
          />
        ))}
        <Text style={{ marginLeft: 5 }}>(Xem 828 đánh giá)</Text>
      </View>

      {/* Giá */}
      <Text style={styles.price}>{product.price.toLocaleString()} đ</Text>

      {/* Khuyến mãi */}
      <View style={styles.promoRow}>
        <Text style={{ flex: 1 }}>Ở đâu rẻ hơn hoàn tiền</Text>
        <Image
          style={{ width: 20, height: 20 }}
          source={require("../assets/question.png")}
        />
      </View>

      {/* Nút chọn màu */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.optionButton}
      >
        <Text style={styles.optionText}>4 màu - Chọn màu</Text>
      </TouchableOpacity>

      {/* Nút chọn mua */}
      <TouchableOpacity
        onPress={() => console.log("Mua sản phẩm:", product)}
        style={styles.buyButton}
      >
        <Text style={styles.buyText}>Chọn mua</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  productImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  rating: {
    height: 16,
    width: 16,
    marginRight: 2,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "red",
    marginBottom: 15,
  },
  promoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  optionButton: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: "#aaa",
  },
  optionText: {
    textAlign: "center",
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 8,
  },
  buyText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
