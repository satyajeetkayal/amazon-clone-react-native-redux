import React, { useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  LogBox,
  TouchableOpacity,
} from "react-native";

import Carousel from "react-native-banner-carousel";
import { Searchbar } from "react-native-paper";
import ShoppingData from "./ShoppingData";
import CartIcon from "./CartIcon";
import Icon from "react-native-vector-icons/Ionicons";
import { auth } from "../firebase";

//const navigation = useNavigation();
const { width } = Dimensions.get("window");
const bannerHeight = 260;
const images = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Fashion/Gateway/Clearance_Store_25thMarch/Clearance-PC-1500x600._CB656852662_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/Multititle/Feb/EN/1500x600_Hero-Tall_NP._CB658235929_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img21/1499store/2021/Feb/Hindi/Header_1500x600eng._CB660976519_.jpg",
];
const ShoppingView = ({ navigation }) => {
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]),
      LogBox.ignoreLogs(["VirtualizedLists should never be nested"]),
      LogBox.ignoreLogs(["Setting a timer for a long period of time"]),
      LogBox.ignoreLogs(["componentWillReceiveProps"]),
      LogBox.ignoreLogs(["componentWillMount"]);
  }, []);
  const renderImage = (image, index) => {
    return (
      <View key={index}>
        <Image
          style={{ width: width, marginTop: 0.2, height: bannerHeight }}
          source={{ uri: image }}
        />
      </View>
    );
  };

  const signOutUser = async () => {
    try {
      await auth.signOut().then((authUser) => {
        navigation.replace("Login");
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              style={{
                width: 50,
                height: 50,
                backgroundColor: "transparent",
                aspectRatio: 1.7,
                resizeMode: "center",
              }}
              source={{
                uri:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png",
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: { backgroundColor: "#81ecec" },
      headerLeft: () => (
        <View style={{ margin: 5, marginLeft: 10 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Icon name="menu-sharp" color="black" size={30} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ padding: 5 }}>
          <CartIcon />
        </View>
      ),
    });
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          position: "relative",
          backgroundColor: "#81ecec",
        }}
      >
        <Searchbar
          placeholder="Search"
          clearIcon="close"
          icon="camera"
          iconColor="black"
          style={{
            height: 40,
            borderRadius: 5,
            width: width,
            elevation: 10,
          }}
        />
      </View>
      <View
        style={{
          width: width,
          height: 30,
          backgroundColor: "#00cec9",
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Icon
          name="location-outline"
          size={15}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
            marginLeft: 5,
          }}
        />
        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          {" "}
          Deliver to User - India 324008
        </Text>
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="#81ecec" />
      <Carousel
        autoplay
        autoplayTimeout={5000}
        loop
        index={0}
        pageSize={width}
        showsPageIndicator={true}
        pageIndicatorStyle={{ backgroundColor: "white" }}
      >
        {images.map((image, index) => renderImage(image, index))}
      </Carousel>
      <ShoppingData />
    </ScrollView>
  );
};

export default ShoppingView;

const styles = StyleSheet.create({});
