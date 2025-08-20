import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../Context/AuthContext";
import { Button, Surface, TextInput } from "react-native-paper";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Surface style={styles.container}>
      <TextInput placeholder="username" onChangeText={setUsername} />
      <TextInput placeholder="password" onChangeText={setPassword} />
      <Button onPress={() => login(username, password)}>Login</Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 10,
    justifyContent: "center",
  },
});

export default Login;
