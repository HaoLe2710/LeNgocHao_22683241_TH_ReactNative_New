import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

type Product = {
  id: string;
  name: string;
  shop: string;
  image: string;
};

export default function ProductRow({ item }: { item: Product }) {
  return (
    <View style={styles.row}>
      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Thông tin sản phẩm */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.shop}>Shop: {item.shop}</Text>
      </View>

      {/* Nút Chat */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "gray",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  shop:{
    color: 'red',
    fontWeight: 'bold'
  }
});
