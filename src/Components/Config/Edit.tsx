import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PersonalInfoStack} from "../../types/navigation";
import { TouchableOpacity, Text } from "react-native";

const Edit = () => {
  const navigation = useNavigation<NativeStackNavigationProp<PersonalInfoStack>>();
  return <TouchableOpacity
      onPress={() => navigation.navigate("Form")}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: "#4A90E2",
        borderRadius: 8,
        marginRight: 12,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>Editar</Text>
    </TouchableOpacity>;
};

export default Edit;
