import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <AuthBackground>
      <AuthCard>
        <AuthHeader
          title="Welcome Back"
          subtitle="Login to access your notes"
        />

        <LoginForm />

        <AuthFooter mode="login" />
      </AuthCard>
    </AuthBackground>
  );
};

export default LoginPage;
