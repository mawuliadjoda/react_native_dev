import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Link, useRouter } from "expo-router";
import { Button } from "@/components/Button";

export default function IndexScreen() {
  const router = useRouter();
  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading" bold >
        Index Screen
      </AppText>

  
      <Link href="/second" push asChild>
        <Button title="Go to Second Screen" />
      </Link>

      <Link href="/third" push asChild>
        <Button title="Go to Third Screen" />
      </Link>
    
      <Button title="Go to /fifth/sixth" onPress={() => router.push("/fifth/sixth")} />

    </View>
  );
}
