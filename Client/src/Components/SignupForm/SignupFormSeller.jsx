import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";
import axios from "../../Service/api";
function SignupFormSeller() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    region: "",
    city: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  //   console.log(formData.favColor);
  const navigate = useNavigate();
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(formData);

    setFormErrors(validate(formData));
    setIsSubmit(true);
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);

      try {
        axios({
          method: "POST",
          url: "/seller",
          data: {
            ...formData,
          },
        })
          .then((response) => {
            navigate("");
            console.log("data sent");
          })
          .catch((error) => {
            console.log("catching error while database connection");
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      setIsSubmit(false);
      errors.firstName = "firstaname is required!";
    }
    if (!values.lastName) {
      setIsSubmit(false);
      errors.lastName = "lastname is required!";
    }
    if (!values.email) {
      setIsSubmit(false);
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      setIsSubmit(false);
      errors.email = "This is not a valid email format!";
    }
    if (!values.phone) {
      setIsSubmit(false);
      errors.phone = "phone is required!";
    }

    if (!values.password) {
      setIsSubmit(false);
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      setIsSubmit(false);
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      setIsSubmit(false);
      errors.password = "Password cannot exceed more than 10 characters";
    }

    if (values.password !== values.confirmPassword) {
      setIsSubmit(false);
      errors.confirmPassword = "Password mismatch";
    }

    if (!values.region) {
      setIsSubmit(false);
      errors.region = "region is required!";
    }
    if (!values.city) {
      setIsSubmit(false);
      errors.city = "city is required!";
    }
    return errors;
  };
  return (
    <div className="formdiv">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="header">Create an account</h1>
        <hr style={{ color: "black" }} />
        <div className="totalForm">
          <div className="commonForm">
            <input
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              name="firstName"
              value={formData.firstName}
              className="input"
            />
            <span>{formErrors.firstName}</span>
            <input
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              name="lastName"
              value={formData.lastName}
              className="input"
            />
            <span>{formErrors.lastName}</span>
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={formData.email}
              className="input"
            />
            <span>{formErrors.email}</span>
            <input
              type="number"
              placeholder="Phone number"
              onChange={handleChange}
              name="phone"
              value={formData.phone}
              className="input"
            />
            <span>{formErrors.phone}</span>
            <input
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              className="input"
            />
            <span>{formErrors.password}</span>
            <input
              type="password"
              placeholder="Confirm password"
              onChange={handleChange}
              name="confirmPassword"
              value={formData.confirmPassword}
              className="input"
            />
            <span>{formErrors.confirmPassword}</span>
          </div>

          <div className="additionalForm">
            <select
              id="region"
              value={formData.region}
              onChange={handleChange}
              name="region"
              className="input"
              placeholder="Region"
            >
              <option value="">
                <pre>-----------------Choose Region------------</pre>
              </option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Dire dawa">Dire dawa</option>
              <option value="Oromia">Oromia</option>
              <option value="Amhara">Amhara</option>
              <option value="Tigray">Tigray</option>
              <option value="Sidama">Sidama</option>
              <option value="Afar">Afar</option>
              <option value="Somali">Somali</option>
              <option value="Gambela"> Gambela </option>
              <option value="Harari">Harari</option>
              <option value="Benishangul-Gumuz">Benishangul-Gumuz</option>
              <option value="South West Ethiopia Peoples'">
                South West Ethiopia Peoples'
              </option>
              <option value="Southern Nations, Nationalities, and Peoples'">
                Southern Nations, Nationalities, and Peoples'
              </option>
              <span>{formErrors.region}</span>
            </select>

            <input
              type="text"
              placeholder="City"
              onChange={handleChange}
              name="city"
              value={formData.city}
              className="input"
            />
            <span>{formErrors.city}</span>
          </div>
        </div>

        <button className="submitButton"> Create account</button>
      </form>
    </div>
  );
}

export default SignupFormSeller;
