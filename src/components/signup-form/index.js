import React from "react";
import { useForm } from "react-hook-form";

import Button from "../button";
import { SIGNUP } from "../../mutations";

import "./index.css";
import { useMutation } from "@apollo/client";

const SignUpForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signup, { data, loading, error }] = useMutation(SIGNUP, {
    onCompleted: () => {
      console.log(data);
    },
    onError: () => {
      console.log("error");
    },
  });

  const onSubmit = async (formData) => {
    await signup({
      variables: {
        signupInput: formData,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="signup-form">
        <p>
          Thanks for choosing to sign up! Please enter the details below and we
          will create your profile!
          <br />
          (* - Required Field)
        </p>
        <div className="user-type">
          Please select your user type:
          <select className="signup-input">
            <option value="Standard">Standard</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <div>
          <input
            className="signup-input"
            placeholder="Full Name*"
            required
          ></input>
        </div>
        <div>
          <input
            className="signup-input"
            placeholder="Username*"
            required
          ></input>
        </div>
        <div>
          <input
            className="signup-input"
            type="email"
            placeholder="Email Address*"
            required
          ></input>
        </div>
        <div>
          <input
            className="signup-input"
            type="password"
            placeholder="Password*"
            required
          ></input>
        </div>
        <div>
          <input
            className="signup-input"
            placeholder="Location*"
            required
          ></input>
        </div>
        <div>
          <input
            className="signup-input"
            type="url"
            placeholder="Profile Picture URL*"
            required
          ></input>
        </div>
        <div>
          <input
            className="signup-input"
            type="number"
            placeholder="Age"
          ></input>
        </div>
        <div>
          <input className="signup-input" placeholder="Gender"></input>
        </div>
        <div>
          <input className="signup-input" placeholder="Identify As"></input>
        </div>
        <div>
          <input className="signup-input" placeholder="Pronouns"></input>
        </div>
        <Button name="Sign Up" type="submit" />
      </div>
    </form>
  );
};

export default SignUpForm;
