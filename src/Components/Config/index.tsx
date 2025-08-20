import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Button, Surface, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

const Config = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <Surface style={styles.container}>
      <Surface mode="flat" style={styles.content}>
        <Text>Primeiro Nome</Text>
        <Text>{user?.firstName}</Text>
        <Text>Sobrenome</Text>
        <Text>{user?.lastName}</Text>
        <Text>Email</Text>
        <Text>{user?.email}</Text>
        <Text>Genero</Text>
        <Text>{user?.gender}</Text>
      </Surface>
      <Button onPress={logout}>Logout</Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Config;
