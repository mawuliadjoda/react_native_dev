import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";

export default function DeeplyNestedScreen() {
  const router = useRouter();

  return (
    <View className="justify-center flex-1 p-4 bg-green-50">
      <AppText center size="heading" bold>
        Deeply Nested Screen
      </AppText>

      
      <View className="mt-6">
        <Button title="Home" onPress={() => router.push("/")} />
        <Button title="Second" theme="secondary" onPress={() => router.push("/second")} />
        <Button title="Third" theme="tertiary" onPress={() => router.push("/third")} />
        <Button title="Back" onPress={() => router.back()} />
      </View>
    </View>
  );
}