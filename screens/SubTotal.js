import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CurrencyFormat from "react-currency-format";
import cartItemReducer, { getBasketTotal } from "../store/reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const SubTotal = () => {
  const basket = useSelector((state) => getBasketTotal());

  return (
    <View>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <Text>{basket?.length}</Text>
            <Text>{value}</Text>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal()}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </View>
  );
};

export default SubTotal;

const styles = StyleSheet.create({});
