import { useContext, useEffect } from "react";
import { Button, Surface, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { UserContext } from "../../Context/UserContext";
import { AuthContext } from "../../Context/AuthContext";

const Config = () => {
  const { user, logout } = useContext(AuthContext);
  const { users: info, fetch } = useContext(UserContext);

  useEffect(() => {
    if (user?.uid) {
      fetch(user.uid);
    }
  }, [user]);

  return (
    <Surface style={styles.container}>
      <Surface mode="flat" style={styles.content}>
        <Text>Primeiro Nome: {info?.firstName}</Text>
        <Text>Sobrenome: {info?.lastName}</Text>
        <Text>Email: {user?.email}</Text>
        <Text>Nome de Usuário: {info?.username}</Text>
        <Text>Endereço: {info?.address?.fullAddress}</Text>
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
  }
});

export default Config;
