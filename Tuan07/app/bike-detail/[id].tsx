import { Image, SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Bike } from "../../dtos/models";

export default function BikeDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [bike, setBike] = useState<Bike | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`https://68ca01fdceef5a150f6692a8.mockapi.io/bkies/${id}`)
                .then(res => res.json())
                .then((data: Bike) => {
                    setBike(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Fetch bike detail error:", err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e94141" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!bike) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Bike not found</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: bike.image }} style={styles.image} resizeMode="contain" />
            </View>
            
            <View style={styles.contentContainer}>
                <Text style={styles.name}>{bike.name}</Text>
                
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.price}>${bike.price}</Text>
                
                <Text style={styles.descriptionLabel}>Description</Text>
                <Text style={styles.description}>
                    It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.
                </Text>
                
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#e94141',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#e94141',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageContainer: {
        height: 300,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '80%',
        height: '80%',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    priceLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#e94141',
        marginBottom: 20,
    },
    descriptionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 30,
    },
    addToCartButton: {
        backgroundColor: '#e94141',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,
    },
    addToCartText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});