import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UsersNavigation from "./Users";
import { HomeTabs } from "../types/navigation";
import PersonalInfoNavigation from "./PersonalInfo";

const Stack = createBottomTabNavigator<HomeTabs>();

const Tabs = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Students" component={UsersNavigation} />
      <Stack.Screen name="Config" component={PersonalInfoNavigation} />
    </Stack.Navigator>
  );
};

export default Tabs;
