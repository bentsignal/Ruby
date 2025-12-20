import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { authClient } from "~/lib/auth-client";

const TakeMeToLogin = () => {
  return (
    <TouchableOpacity
      className="bg-primary my-2 rounded-md p-3"
      onPress={() => router.push("/login")}
    >
      <Text className="text-primary-foreground font-bold">
        Take Me To Login
      </Text>
    </TouchableOpacity>
  );
};

const GoogleSignInButton = () => {
  return (
    <TouchableOpacity
      className="bg-primary my-2 rounded-md p-3"
      onPress={() =>
        authClient.signIn.social({ provider: "google", callbackURL: "/" })
      }
    >
      <Text className="text-primary-foreground font-bold">
        Sign In with Google
      </Text>
    </TouchableOpacity>
  );
};

const SignOutButton = () => {
  return (
    <TouchableOpacity
      className="bg-primary my-2 rounded-md p-3"
      onPress={() => authClient.signOut()}
    >
      <Text className="text-primary-foreground font-bold">Sign Out</Text>
    </TouchableOpacity>
  );
};

export { TakeMeToLogin, GoogleSignInButton, SignOutButton };
