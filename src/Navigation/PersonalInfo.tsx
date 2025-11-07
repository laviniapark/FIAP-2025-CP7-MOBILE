import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PersonalInfoStack} from "../types/navigation";
import Form from "../Components/Config/Form";
import Edit from "../Components/Config/Edit";
import { UserProvider } from "../Context/UserContext";
import Config from "../Components/Config";

const Stack = createNativeStackNavigator<PersonalInfoStack>();

const PersonalInfoNavigation = () => {
  return (
    <UserProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Config"
          component={Config}
          options={{
            headerRight: () => <Edit />,
          }}
        />
        <Stack.Screen name="Form" component={Form} />
      </Stack.Navigator>
    </UserProvider>
  );
};

export default PersonalInfoNavigation;
