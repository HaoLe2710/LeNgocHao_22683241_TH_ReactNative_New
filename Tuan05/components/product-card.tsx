import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type ProductCardProps = {
  image: string;
  title: string;
  price: number;
};

export default function ProductCard({ image, title, price }: ProductCardProps) {
  return (
    <View style={styles.card}>
      {/* Hình ảnh */}
      <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />

      {/* Tên sản phẩm */}
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      {/* 5 ngôi sao */}
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <FontAwesome
            key={i}
            name="star"
            size={14}
            color="#FFD700"
            style={{ marginRight: 2 }}
          />
        ))}
      </View>

      {/* Giá tiền */}
      <Text style={styles.price}>{price.toLocaleString()} đ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    margin: 8,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 4,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  starRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
