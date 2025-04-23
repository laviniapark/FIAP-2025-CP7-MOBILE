import React from "react";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import client from "../../api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const List = ({ navigation }: NativeStackScreenProps<UsersStack>) => {
  const [users, setUsers] = useState<Users>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await client.get<Users>("/users");
      setUsers(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <FlatList
      refreshing={isLoading}
      onRefresh={fetchUsers}
      data={users}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Details", { id: item.id })}
        >
          <Text>
            {item.firstName} {item.lastName}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default List;
