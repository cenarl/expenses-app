import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Picker,
  TouchableOpacity,
} from "react-native";
import Expense from "./components/Expense";

export default function App() {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Fatura");
  const [amount, setAmount] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const newData = expenses.filter((item) => {
      const itemName = item.name.toUpperCase();
      const itemCategory = item.selectedCategory.toUpperCase();
      const textData = filterText.toUpperCase();
      return itemName.includes(textData) || itemCategory.includes(textData);
    });
    setFilteredExpenses(newData);
  }, [filterText, expenses]);

  const findSum = () => {
    const total = filteredExpenses.reduce(
      (prevValue, currentValue) => prevValue + parseInt(currentValue.amount),
      0
    );
    return total;
  };

  const addPress = () => {
    setExpenses((expenses) => [
      ...expenses,
      { name, selectedCategory, amount },
    ]);

    setName("");
    setSelectedCategory("Fatura");
    setAmount("");
  };

  const deletePress = (item) => {
    let index = expenses.indexOf(item);

    let newArray = [...expenses];
    newArray.splice(index, 1);
    setExpenses(newArray);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>GİDER EKLE</Text>
        <TextInput
          value={name}
          placeholder="Gider adı.."
          style={styles.input}
          onChangeText={setName}
        />
        <Picker
          selectedValue={selectedCategory}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }
        >
          <Picker.Item label="Fatura" value="Fatura" />
          <Picker.Item label="Yiyecek" value="Yiyecek" />
          <Picker.Item label="Ulasim" value="Ulasim" />
          <Picker.Item label="Giyim" value="Giyim" />
        </Picker>
        <TextInput
          value={amount}
          style={styles.input}
          placeholder="Tutar.."
          onChangeText={setAmount}
        />
        <TouchableOpacity onPress={addPress} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>EKLE</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.header}>GİDERLER</Text>

        <TextInput
          value={filterText}
          placeholder="Filtrelemek için kelime girin.."
          style={styles.input}
          onChangeText={setFilterText}
        />
        <View style={styles.total}>
          <Text style={{ fontSize: 20, color: "white" }}>
            TOPLAM: {findSum()} TL
          </Text>
        </View>
      </View>

      {expenses.length === 0 ? (
        <Text style={{ fontSize: 15, alignSelf: "center", marginTop: 20 }}>
          Gideriniz yok.
        </Text>
      ) : (
        <View>
          {filteredExpenses.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => deletePress(item)}>
                <Expense
                  name={item.name}
                  category={item.selectedCategory}
                  amount={item.amount}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9eeef",
  },
  innerContainer: {
    backgroundColor: "#e9eeef",
  },
  input: {
    backgroundColor: "white",

    fontFamily: "sans-serif",
    fontStyle: "italic",
    fontSize: 14,
    placeholderTextColor: "#8c8c8c",

    shadowRadius: 3.84,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,

    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#a6a4a4",

    padding: 10,
    marginVertical: 5,
    marginHorizontal: 50,
    height: 40,
  },
  button: {
    backgroundColor: "#71a5bd",

    alignSelf: "center",
    alignItems: "center",

    paddingVertical: 12,
    paddingHorizontal: 20,

    borderRadius: 10,
    width: "30%",
    marginVertical: 15,
    marginHorizontal: 50,
  },
  buttonText: {
    fontFamily: "sans-serif",
    fontSize: 16,
    fontWeight: 500,
    color: "white",
  },
  header: {
    color: "#424c63",
    fontFamily: "sans-serif",
    fontSize: 25,
    fontWeight: "bold",
    width: "fit-content",
    marginTop: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  Text: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 30,
    fontSize: 20,
    width: "fit-content",
  },
  total: {
    backgroundColor: "#71a5bd",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 50,
    margin: 20,
    borderRadius: 15,
  },
});
