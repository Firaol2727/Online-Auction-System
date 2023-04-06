import LoginForm from "../../Components/LoginForm/LoginForm";
import NavBar from "../../Layouts/NavBar/NavBar";
import Footer from "../../Layouts/Footer/Footer";
import "./Login.css";

export default function Login() {
  return (
    <>
      <NavBar />
      <LoginForm />
      <Footer />
    </>
  );
}
