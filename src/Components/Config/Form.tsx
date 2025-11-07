import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { User } from "../../types/users";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PersonalInfoStack } from "../../types/navigation";
import { UserContext } from "../../Context/UserContext";
import { Surface, Text, TextInput } from "react-native-paper";
import Confirm from "./Confirm";
import { SearchBox } from "@mapbox/search-js-react";

const Form = ({ navigation }: NativeStackScreenProps<PersonalInfoStack>) => {
  const { fetch, save } = useContext(UserContext);
  const [user, setUser] = useState<User>();

  const handleChangeText = (field: keyof User) => {
    return (value: string) => {
      setUser((previous) => ({...previous!, [field]: value }));
    };
  };

  const doSave = async () => {
    await save(user!);
    navigation.pop();
    if (user?.uid) {
      fetch(user.uid);
    }
  };

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
          onChangeText={handleChangeText("firstName")}
        />
        <Text style={styles.text}>Sobrenome</Text>
        <TextInput
          placeholder="Silva"
          onChangeText={handleChangeText("lastName")}
        />
        <Text style={styles.text}>Nome de Usuário</Text>
        <TextInput
          placeholder="fulanosilva"
          onChangeText={handleChangeText("username")}
        />
        <Text style={styles.text}>Endereço</Text>
        <SearchBox
        accessToken={process.env.EXPO_PUBLIC_MAPBOX_KEY}
        options={{
            language: 'pt',
            country: 'BR'
        }}
        onRetrieve={(item) => {
            setUser((previous) => ({
                ...previous!,
                address: item.features[0].properties.full_address
            }))
        }}
        />
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
    fontSize: 16
  }
});

export default Form;
