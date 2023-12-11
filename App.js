import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VideosScreen from "./screens/Videos";
import HomeScreen from "./screens/Home";
import FormatScreen from "./screens/Format";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Videos" component={VideosScreen} />
        <Stack.Screen name="Format" component={FormatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
