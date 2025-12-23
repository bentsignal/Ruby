import { Pressable, Text } from "react-native";
import { router } from "expo-router";
import { authClient } from "~/lib/auth-client";

const TakeMeToLogin = () => {
  return (
    <Pressable
      className="bg-primary my-2 rounded-md p-3"
      onPress={() => router.push("/login")}
    >
      <Text className="text-primary-foreground font-bold">
        Take Me To Login
      </Text>
    </Pressable>
  );
};

const GoogleSignInButton = () => {
  return (
    <Pressable
      className="bg-primary my-2 rounded-md p-3"
      onPress={() =>
        authClient.signIn.social({ provider: "google", callbackURL: "/" })
      }
    >
      <Text className="text-primary-foreground font-bold">
        Sign In with Google
      </Text>
    </Pressable>
  );
};

const SignOutButton = () => {
  return (
    <Pressable
      className="bg-primary my-2 rounded-md p-3"
      onPress={() => authClient.signOut()}
    >
      <Text className="text-primary-foreground font-bold">Sign Out</Text>
    </Pressable>
  );
};

export { TakeMeToLogin, GoogleSignInButton, SignOutButton };
