import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { Checkbox, Form, Input, SubmitButton } from "formik-semantic-ui-react";
import * as Yup from "yup";
import "./pages.css";
import { loginGoogle, register } from "../helpers/firebase";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Register = () => {
  const { currentUser } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  };
  useEffect(() => {
    if (currentUser.uid) setIsSubmitting(false);
  }, [currentUser]);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, "Too short")
      .max(15, "Must be 15 char or less")
      .required("Required"),

    email: Yup.string().email("Email is invalid").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 char or more")
      .matches(/\d+/, "Password must have a number")
      .matches(/[a-z]+/, "Password must have a lowercase")
      .matches(/[A-Z]+/, "Password must have a uppercase")
      .matches(/[!?.@#$%^&*()-+]+/, "Password must have a special char")
      .test("password", "Password is an invalid", (value) => !/\s+/.test(value))
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirming password is required"),
    agreeToTerms: Yup.boolean()
      .label("Terms")
      .test(
        "aggreeToTerms",
        "Must agree to terms to continue",
        (value) => value === true
      ),
  });

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    register(e, history);
  };

  const handleGoogle = () => {
    loginGoogle(history);
  };
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" style={{ color: `#c75c5c` }} textAlign="center">
          <Image src="/fire.png" /> Register a new user
        </Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form size="large">
            <Segment stacked>
              {" "}
              <Input
                name="username"
                errorPrompt
                fluid
                icon="user"
                iconPosition="left"
                placeholder="User name"
                id="username"
              />
              <Input
                name="email"
                errorPrompt
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
                id="email"
              />
              <Input
                name="password"
                errorPrompt
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                id="password"
              />
              <Input
                name="confirmPassword"
                errorPrompt
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm password"
                type="password"
                id="confirmPassword"
              />
              <Checkbox
                name="agreeToTerms"
                label="I accept the Terms and Conditions"
                errorPrompt={{ pointing: "left" }}
                id="agreeToTerms"
              />
              <SubmitButton
                style={{ backgroundColor: `#c75c5c`, color: "white" }}
                fluid
                size="large"
                loading={isSubmitting}
              >
                Register
              </SubmitButton>
            </Segment>
          </Form>
        </Formik>
        <Message className="google-container">
          {" "}
          <Image
            src="./google.png"
            className="google-button"
            onClick={handleGoogle}
          />
          Already have an account?{" "}
          <Button className="register-button" as={Link} to="/login">
            Login
          </Button>{" "}
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
