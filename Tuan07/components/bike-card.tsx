import { Bike } from "../dtos/models";
import { Image, StyleSheet, Text, View } from "react-native";


type BikeCardProps = {
  bike: Bike;
};

export default function BikeCard({bike}: BikeCardProps){

    return(
        <View style={styles.container}>
            <Image source={{uri: bike.image}} style={styles.image} resizeMode="contain"/>
            <Text style={styles.name}>{bike.name}</Text>
            <Text style={styles.price}>${bike.price}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 150,
        height: 120,
        marginBottom: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        color: '#e94141',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})