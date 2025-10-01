import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/bike-list');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.subtitle}>A premium online store for sporter and their stylish choice</Text>
            </View>
            
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/homesreendemo.png')} 
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            
            <View style={styles.titleContainer}>
                <Text style={styles.title}>POWER BIKE SHOP</Text>
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: '#fff',
    },
    contentContainer: {
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        lineHeight: 24,
    },
    imageContainer: {
        marginBottom: 30,
    },
    image: {
        width: 300,
        height: 200,
    },
    titleContainer: {
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#e94141',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});