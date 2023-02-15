import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import FormInput from "../../components/Input";
import "../../components/input.css";
import Toast from "../../components/toast-notification/Toast";
import useDark from "../../hooks/useDark";
import AuthService from "../../services/auth.service";
import { TOAST_PROPERTIES } from "./table/ToastProperties";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(values.username, values.email, values.password).then((response) => {
        console.log(response)
        showToast('success')
      })
      navigate(location.state?.from?.pathname || "/login", { replace: true });
    } catch (err) {
      if (!err?.response) {
        showToast('danger','No Server Response');
      } else if (err.response?.status === 500) {
        showToast('danger','User is already there!');
      } else {
        showToast('danger','Register Failed');
      }
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Toast details
  const [nlist, setNList] = useState([]);
  const [position, setPosition] = useState('top-right');
  let [checkValue, setCheckValue] = useState(true);
  const [autoDeleteTime, setAutoDeleteTime] = useState(5000);

  const showToast = (type, response) => {
    setPosition('top-right');
    setCheckValue(true);
    setAutoDeleteTime(3000);
    const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title.toLowerCase() === type);
    if (type === 'success') {
      toastProperties.description = 'Login Successfull.'
    } else if (type === 'danger') {
      toastProperties.description = response
    }
    setNList([...nlist, toastProperties]);
  }

  const darkMode = useDark();

  return (
    <>
    <div className="app">
      <div className="darkmode">
        {darkMode}
        </div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
        <div className="new">
          <p>Or Already a member? <NavLink to="/login">Sign in</NavLink></p>
        </div>
      </form>
    </div>
    <Toast
    toastList={nlist}
    position={position}
    autoDelete={checkValue}
    autoDeleteTime={autoDeleteTime}
  />
</>
  );
};

export default SignUp;
