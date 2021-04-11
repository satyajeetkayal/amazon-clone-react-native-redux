import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const CartIcon = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.basket);
  return (
    <View>
      <Text style={{ color: "black", fontWeight: "bold", top: 5 }}>
        {cartItems.length}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        activeOpacity={0.5}
      >
        <Icon
          name="ios-cart"
          color="black"
          size={30}
          style={{ marginBottom: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartIcon;

const styles = StyleSheet.create({});
