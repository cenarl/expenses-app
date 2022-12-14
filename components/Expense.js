import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Expense = (props) => {
  const { name, category, amount } = props;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>{name}</Text>

        <Text style={styles.text}>{category}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={{ color: "#cf2b2b", fontSize: 20, fontWeight: 500 }}>
          {amount} TL
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowRadius: 3.84,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,

    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#a6a4a4",

    padding: 10,
    marginBottom: 20,
    marginHorizontal: 50,

    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    width: "fit-content",
    marginHorizontal: 20,
    textAlign: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    marginVertical: 1,
    textTransform: "capitalize ",
  },
});

export default Expense;
