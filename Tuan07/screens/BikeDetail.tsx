import { Image, SafeAreaView, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Bike } from "../dtos/models";

export default function BikeDetail() {
  const { bike } = useLocalSearchParams();
  const parsedBike: Bike = JSON.parse(bike as string);

  console.log("Bike nhận được:", parsedBike);

  return (
    <SafeAreaView>
      <Image 
        source={{ uri: parsedBike.image }} 
        style={{ width: 200, height: 200 }} 
      />
      <Text>{parsedBike.name}</Text>
      <Text>{parsedBike.price}</Text>
      <Text>Description</Text>
      <Text>
        It is a very important form of writing as we write almost everything 
        in paragraphs, be it an answer, essay, story, emails, etc.
      </Text>
    </SafeAreaView>
  );
}
