import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import FormInput from "../../components/Input";
import "../../components/input.css";
import Toast from "../../components/toast-notification/Toast";
import useDark from "../../hooks/useDark";
import AuthService from "../../services/auth.service";
import { TOAST_PROPERTIES } from "./table/ToastProperties";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    }
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values.email + " " + values.password);
    try {
      await AuthService.login(values.email, values.password).then(
        (response) => {
          const role = response.roles.some(role => role.name === "ROLE_ADMIN");
          showToast('success')
          setTimeout(() => {
            navigate(location.state?.from?.pathname || role ? "/AdminDashboard" : "/Dashboard", { replace: true });
          }, 1000);
        }
      )
    } catch (err) {
      if (!err?.response) {
        showToast('danger','No Server Response');
      } else if (err.response?.status === 400) {
        showToast('danger','Missing Username or Password');
      } else if (err.response?.status === 401) {
        showToast('danger','Unauthorized');
      } else {
        showToast('danger','Login Failed');
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
          <h1>Login</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button>Login</button>
          <div className="new">
            <p>Or Not a member? <NavLink to="/register">Sign Up</NavLink></p>
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

export default SignIn;