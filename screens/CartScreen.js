import React, { useLayoutEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_FROM_CART } from "../store/actionTypes";
import Icon from "react-native-vector-icons/Ionicons";
import CartIcon from "./CartIcon";
import LottieView from "lottie-react-native";
import { FAB } from "react-native-paper";
import { Button } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const removeCartitem = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: item,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      Title: "Cart",
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: "#81ecec" },
      headerRight: () => (
        <View>
          <CartIcon />
        </View>
      ),
    });
  }, []);

  const Separator = () => {
    return (
      <View
        style={{ borderBottomWidth: 1, borderBottomColor: "#a9a9a9" }}
      ></View>
    );
  };
  return (
    <View>
      <View>
        {cartItems.length !== 0 ? (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => Separator()}
            renderItem={({ item }) => (
              <View style={styles.product}>
                <Text style={styles.product_title} numberOfLines={1}>
                  {item.title}
                </Text>
                <View>
                  <Image
                    style={styles.product_image}
                    source={{ uri: item.image }}
                  />
                  <View>
                    <Text style={styles.product_rating}>{item.rating}</Text>
                    <Text style={styles.product_price}>{item.price}</Text>
                  </View>
                  <Button
                    color="#f0c14b"
                    mode="contained"
                    onPress={() => removeCartitem(item)}
                  >
                    Remove from Cart
                  </Button>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={{ flex: 1 }}>
            {/* <LottieView
              autoPlay
              style={{
                height: 200,
                width: 300,
                aspectRatio: 1,
                margin: 90,
                justifyContent: "center",
                alignItems: "center",
              }}
              source={require("../assets/42176-empty-cart.json")}
            /> */}
            <Icon
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              name="cart-sharp"
              color="black"
              size={50}
            />
            <Text
              style={{
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "black",
                fontSize: 30,
              }}
            >
              Your shopping cart is empty.
            </Text>
          </View>
        )}
      </View>
      <View>
        {cartItems.length !== 0 ? (
          <View>
            <FAB
              icon="check"
              uppercase={true}
              label="checkout"
              style={styles.fab}
              onPress={() => alert("clicked")}
            />
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  product: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 0,
    padding: 90,
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
  },
  product_image: {
    maxHeight: 200,
    aspectRatio: 0.9,
    width: "100%",
    resizeMode: "contain",
    marginBottom: 0,
  },
  product_title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  fab: {
    backgroundColor: "#f0c14b",
    color: "black",
    elevation: 50,
    position: "absolute",
    alignItems: "center",
    margin: 10,
    right: 0,
    bottom: 0,
    marginBottom: 15,
  },
});
