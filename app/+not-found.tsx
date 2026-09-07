import { router } from "expo-router";
import { Button, Empty, Screen } from "../src/components/ui";
export default function NotFound() {
  return (
    <Screen>
      <Empty
        title="Let’s find your way back"
        detail="This screen isn’t part of the prototype."
        action={
          <Button title="Go to Home" onPress={() => router.replace("/home")} />
        }
      />
    </Screen>
  );
}
