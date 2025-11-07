import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { User } from "../../types/users";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PersonalInfoStack } from "../../types/navigation";
import { UserContext } from "../../Context/UserContext";
import { Surface, Text, TextInput } from "react-native-paper";
import Confirm from "./Confirm";
import * as Location from 'expo-location';
import mapbox from "../../api/geolocation";
import { Address } from "../../types/users";

const Form = ({ navigation }: NativeStackScreenProps<PersonalInfoStack>) => {
  const { fetch, save } = useContext(UserContext);
  const [user, setUser] = useState<User>();

  const handleChangeText = (field: keyof User) => {
    return (value: string) => {
      setUser((previous) => ({...previous!, [field]: value }));
    };
  };

  const handleAddressChangeText = (field: keyof Address) => {
    return (value: string) => {
      setUser((previous) => ({
      ...previous!,
      address: {
        [field]: value
      }
    }))
    }
  };

  const doSave = async () => {
    await save(user!);
    navigation.pop();
    if (user?.uid) {
      fetch(user.uid);
    }
  };

  const getCurrentLocation = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    if (result.status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync();

    const latitude = loc.coords.latitude;
    const longitude = loc.coords.longitude;

    const { data } = await mapbox.get("/search/geocode/v6/reverse", {
      params: {latitude, longitude}
    });

    const endereco = data.features[0]?.properties?.full_address;
    if (!endereco) {
      console.log("Endereço não encontrado");
      return;
    };

    setUser((previous) => ({
      ...previous!,
      address: {
        fullAddress: endereco
      }
    }))
  };

  useEffect(() => {
    if(user?.uid) {
      fetch(user.uid);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Confirm save={doSave} />,
    });
  }, [navigation, user]);

  return (
    <ScrollView>
      <Surface style={styles.container}>
        <Text style={styles.text}>Nome</Text>
        <TextInput
          placeholder="Fulano"
          value={user?.firstName ?? ""}
          onChangeText={handleChangeText("firstName")}
        />
        <Text style={styles.text}>Sobrenome</Text>
        <TextInput
          placeholder="Silva"
          value={user?.lastName ?? ""}
          onChangeText={handleChangeText("lastName")}
        />
        <Text style={styles.text}>Nome de Usuário</Text>
        <TextInput
          placeholder="fulanosilva"
          value={user?.username ?? ""}
          onChangeText={handleChangeText("username")}
        />
        <Text style={styles.text}>Endereço</Text>
        <Text>Digitar endereço manualmente</Text>
        <TextInput
          placeholder="Logradouro 123, Cidade - Estado, CEP, País"
          value={user?.address?.fullAddress ?? ""}
          onChangeText={handleAddressChangeText("fullAddress")}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={getCurrentLocation}
        >
          <Text style={styles.text}>Pegar Localização Atual</Text>
        </TouchableOpacity>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    marginRight: 12,
    alignSelf: "flex-start",
  }
});

export default Form;
