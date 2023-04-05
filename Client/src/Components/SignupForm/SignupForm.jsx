import { useState } from "react";
import SignupFormBuyer from "./SignupFormBuyer";
import SignupFormSeller from "./SignupFormSeller";
import "./personType.css";
function SignupForm() {
  const [personType, setPersonType] = useState("seller");

  function handlePersonType(event) {
    setPersonType(event.target.value);
  }
  return (
    <div className="personType">
      <div className="personTypeInputs">
        <input
          className="radioInput"
          type="radio"
          id="seller"
          name="personType"
          value="seller"
          checked={personType === "seller"}
          onChange={handlePersonType}
        />
        <label htmlFor="seller" className="personTypeLabel">
          Seller account
        </label>

        <input
          className="radioInput"
          type="radio"
          id="buyer"
          name="personType"
          value="buyer"
          checked={personType === "buyer"}
          onChange={handlePersonType}
        />
        <label htmlFor="seller" className="personTypeLabel">
          Buyer account
        </label>
      </div>
      {personType === "seller" && <SignupFormSeller />}
      {personType === "buyer" && <SignupFormBuyer />}
    </div>
  );
}
export default SignupForm;
