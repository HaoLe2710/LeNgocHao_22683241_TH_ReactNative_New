import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View, StyleSheet } from "react-native";
import BikeCard from "../components/bike-card";
import { Bike } from "../dtos/models";

export default function BikeList() {
  const [bikeList, setBikeList] = useState<Bike[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  // Khởi tạo tags chỉ 1 lần
  useEffect(() => {
    setTags(["All", "Roadbike", "Mountain"]);
  }, []);

  // Fetch dữ liệu từ API
  useEffect(() => {
    fetch("https://68ca01fdceef5a150f6692a8.mockapi.io/bikes")
      .then((r) => r.json())
      .then((d: Bike[]) => setBikeList(d))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>The world’s Best Bike</Text>
      </View>

      {/* Tags */}
      <FlatList
        data={tags}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tag}>
            <Text>{item}</Text>
          </View>
        )}
        style={{ marginVertical: 10 }}
      />

      {/* Danh sách bike */}
      <FlatList
        data={bikeList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BikeCard bike={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  header: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tag: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
});
