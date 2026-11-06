import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import SignupForm from "../components/SignupForm";
import AuthFooter from "../components/AuthFooter";

const SignupPage = () => {
  return (
    <AuthBackground>
      <AuthCard>
        <AuthHeader
          title="Create Your Account"
          subtitle="Start organizing your thoughts today"
        />

        <SignupForm />

        <AuthFooter mode="signup" />
      </AuthCard>
    </AuthBackground>
  );
};

export default SignupPage;