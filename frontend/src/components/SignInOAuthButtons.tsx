import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();
  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <Button
      className="w-full text-white border-zinc-200 h-11 cursor-pointer"
      variant={"secondary"}
      onClick={signInWithGoogle}
    >
      <div className="flex items-center gap-2">
        <img src="/google.png" alt="" className="h-6 w-6" />
        Continue with Google
      </div>
    </Button>
  );
};

export default SignInOAuthButtons;
