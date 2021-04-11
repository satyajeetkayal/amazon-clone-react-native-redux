import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

import { products } from "../data";
import { ADD_TO_CART } from "../store/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-paper";

const { width } = Dimensions.get("window");
const ShoppingData = () => {
  const dispatch = useDispatch();

  const addToBasket = (item) => {
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });
  };

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text style={styles.product_title}>{item.title}</Text>
            <View>
              <Image
                style={styles.product_image}
                source={{ uri: item.image }}
              />
              <Text style={styles.product_price}>{item.price}</Text>
              <Text>{item.rating}</Text>
              <View>
                <Button
                  color="#f0c14b"
                  mode="contained"
                  onPress={() => addToBasket(item)}
                >
                  Add to Cart
                </Button>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ShoppingData;

const styles = StyleSheet.create({
  product: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 20,
    padding: 20,
    width: width - 20,
    maxHeight: 400,
    minWidth: 100,
    backgroundColor: "white",
    zIndex: 1,
  },
  product_info: {
    height: 100,
    marginBottom: 15,
  },
  product_price: {
    marginTop: 5,
  },
  product_rating: {
    display: "flex",
    flexDirection: "column",
  },
  product_image: {
    maxHeight: 200,
    aspectRatio: 0.9,
    width: "100%",
    resizeMode: "contain",
    marginBottom: 15,
  },
  product_title: {
    fontSize: 17,
    fontWeight: "800",
  },
});
