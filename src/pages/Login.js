import React from "react";
// strapi function
import loginUser from "../strapi/loginUser";
import registerUser from "../strapi/registerUser";
// handle user
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";

const Login = () => {
  const history = useHistory();
  // setup user context
  const { userLogin, alert, showAlert } = React.useContext(UserContext);

  // state value
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("default");
  const [isMember, setIsMember] = React.useState(true);

  let isEmpty = !email || !password || !username || alert.show;

  const toggleMember = () => {
    setIsMember(prevMember => {
      let isMember = !prevMember;
      isMember ? setUsername("default") : setUsername("");
      return isMember;
    });
  };
  const handleSubmit = async e => {
    // alert
    showAlert({ msg: "accessing user data. please wait..." });
    e.preventDefault();
    let response;
    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      response = await registerUser({ email, password, username });
    }
    if (response) {
      const {
        jwt: token,
        user: { username }
      } = response.data;
      const newUser = { token, username };
      userLogin(newUser);
      history.push("/products");
      showAlert({
        msg: `you are logged in : ${username}. shop away my friend`
      });
    } else {
      // show alert
      showAlert({
        msg: "there was an error. please tyr again...",
        type: "danger"
      });
    }
  };
  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "sign in" : "register"}</h2>
      <form className="login-form">
        {/* single input */}
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input
            type="email"
            value={email}
            id="email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        {/* end of single input */}
        {/* single input */}
        <div className="form-control">
          <label htmlFor="passwortd">password</label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {/* end of single input */}
        {/* single input */}
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input
              type="text"
              value={username}
              id="username"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
        )}
        {/* end of single input */}
        {/* empty from text */}
        {isEmpty && (
          <p className="form-empty">please fill out all form fields</p>
        )}
        {!isEmpty && (
          <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={handleSubmit}
          >
            submit
          </button>
        )}
        {/* register link */}
        <p className="register-link">
          {isMember ? "need to register" : "already a member"}
          <button type="button" onClick={toggleMember}>
            click here
          </button>
        </p>
      </form>
    </section>
  );
};

export default Login;
