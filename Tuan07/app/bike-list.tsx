import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import BikeCard from "../components/bike-card";
import { Bike } from "../dtos/models";
import { mockBikes } from "../dtos/mockData";

export default function BikeList() {
  const [bikeList, setBikeList] = useState<Bike[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string>("All");
  const router = useRouter();

  // Khởi tạo tags chỉ 1 lần
  useEffect(() => {
    setTags(["All", "Roadbike", "Mountain"]);
  }, []);

  // Load dữ liệu mock
  useEffect(() => {
    // setBikeList(mockBikes);
    fetch('https://68ca01fdceef5a150f6692a8.mockapi.io/bkies')
    .then(r => r.json())
    .then(d => setBikeList(d))
}, []);

  const handleBikePress = (bike: Bike) => {
    router.push(`/bike-detail/${bike.id}`);
  };

  const filteredBikes = bikeList;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>The world's Best Bike</Text>
      </View>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tag,
              activeTag === tag && styles.activeTag
            ]}
            onPress={() => setActiveTag(tag)}
          >
            <Text style={[
              styles.tagText,
              activeTag === tag && styles.activeTagText
            ]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bike List */}
      <FlatList
        data={filteredBikes}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleBikePress(item)}>
            <BikeCard bike={item} />
          </TouchableOpacity>
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.cardWrapper}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  header: {
    marginVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e94141",
  },
  tagsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeTag: {
    backgroundColor: "#e94141",
  },
  tagText: {
    color: "#666",
    fontSize: 16,
  },
  activeTagText: {
    color: "white",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  row: {
    justifyContent: "space-between", // giãn đều 2 cột
  },
  cardWrapper: {
    flex: 1, 
    margin: 5,  // thêm khoảng cách giữa các item
  },
});
