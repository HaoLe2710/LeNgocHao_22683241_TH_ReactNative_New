import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native";

export default function HomeScreen(){
    return(
        <SafeAreaView>
            <View>
                <Text>A premium online store for sporter and their stylish choice</Text>
            </View>
            <View>
                <Image source={require('@assets/homescreendemo.png')}/>
            </View>
            <View>
                <Text>POWER BIKE SHOP</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Text>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        flex: 1,
        flexDirection: "column"
    }
})