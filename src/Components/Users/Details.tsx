import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";
import client from "../../api";
import { useEffect, useState } from "react";

const Details = ({ route }: NativeStackScreenProps<UsersStack, "Details">) => {
  const [user, setUser] = useState<User>();
  const { id } = route.params;

  const fetchUser = async () => {
    const { data } = await client.get<User>(`/users/${id}`);
    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <View>
      <Text>Primeiro nome</Text>
      <Text>{user?.firstName}</Text>
      <Text>Último nome</Text>
      <Text>{user?.lastName}</Text>
      <Image source={{ uri: user?.avatar }} />
    </View>
  );
};

export default Details;
