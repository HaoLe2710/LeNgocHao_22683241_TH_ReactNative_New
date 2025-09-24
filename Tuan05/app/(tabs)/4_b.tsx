import ProductRow from "@/components/product-row";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function UI4_b(){

    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product|null>(null)
    const [loading, setLoading] = useState(true)

    type Product = {
        id: string;
        name: string;
        image: string;
        price: number
    };

    useEffect(() => {
        console.log("products:", products);
    }, [products]);

      useEffect(() => {
        fetch("https://68ca01fdceef5a150f6692a8.mockapi.io/products") // API test miễn phí
        .then((response) => response.json())
        .then((json: Product[]) => {
            setProducts(json);
        })
        .catch((error) => {
            console.error("Lỗi fetch:", error);
        })
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="blue" />
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
        {/* Header trên */}
        <View style={styles.header}>
            <Image style={styles.icon} source={require("@/assets/images/back.png")} />
            <Text>CHAT</Text>
            <Image style={styles.icon} source={require("@/assets/images/cart.png")} />
        </View>

        {/* Nội dung chính (FlatList) */}
        <FlatList
            style={{ flex: 1, backgroundColor: "white" }}
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductRow item={item} />}
            ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "red" }}>
                Không có sản phẩm nào!
            </Text>
            }
        />

        {/* Footer cố định */}
        <View style={styles.header}>
            <Image style={styles.icon} source={require("@/assets/images/menu.png")} />
            <Image style={styles.icon} source={require("@/assets/images/home.png")} />
            <Image style={styles.icon} source={require("@/assets/images/back.png")} />
        </View>
        </View>
        
    )

    
}
const styles = StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor: 'white'
        },
        center: { flex: 1, justifyContent: "center", alignItems: "center" },
        header:{
            // flex: 1, 
            backgroundColor: '#03fce3',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10
        },
        icon:{
            height: 30,
            width: 30
        },
        content:{
            // flex: 4
        }
    })