import { Formik } from "formik";
import React, { useContext, useEffect } from "react";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import {
  Grid,
  Header,
  Image,
  Message,
  Button,
  Segment,
} from "semantic-ui-react";
import { Form, Input, SubmitButton } from "formik-semantic-ui-react";
import "./pages.css";
import { login, loginGoogle } from "../helpers/firebase";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (currentUser.displayName) setIsSubmitting(false);
  }, [currentUser]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 char or more")
      .matches(/\d+/, "Password must have a number")
      .matches(/[a-z]+/, "Password must have a lowercase")
      .matches(/[A-Z]+/, "Password must have a uppercase")
      .matches(/[!?.@#$%^&*()-+]+/, "Password must have a special char")
      .test("password", "Password is an invalid", (value) => !/\s+/.test(value))
      .required("Required"),
  });

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    login(e, history);
  };
  const handleGoogle = () => {
    loginGoogle(history);
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" style={{ color: `#c75c5c` }} textAlign="center">
          <Image src="/fire.png" /> Log-in to your account
        </Header>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form size="large">
            {" "}
            <Segment stacked>
              <Input
                name="email"
                placeholder="Email"
                errorPrompt
                fluid
                icon="mail"
                iconPosition="left"
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                errorPrompt
                fluid
                icon="lock"
                iconPosition="left"
              />
              <SubmitButton
                fluid
                style={{ backgroundColor: `#c75c5c`, color: "white" }}
                loading={isSubmitting}
              >
                Login
              </SubmitButton>{" "}
            </Segment>
          </Form>
        </Formik>

        <Message className="google-container">
          <Image
            src="./google.png"
            className="google-button"
            onClick={handleGoogle}
          />
          <div>
            New to us?&nbsp;
            <Button className="register-button" as={Link} to="/register">
              Sign Up
            </Button>
          </div>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
