import { ImageSourcePropType } from "react-native"

export type Product = {
    id: number
    name: string
    image: ImageSourcePropType
    price: number
    color: string
}