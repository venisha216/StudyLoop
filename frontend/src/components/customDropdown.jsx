import { Listbox } from "@headlessui/react";
import { useState } from "react";
import "./CustomDropdown.css";

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  return (
    <div className="dropdown-container">
      <Listbox value={value} onChange={onChange}>
        
        {/* BUTTON */}
        <Listbox.Button className={`dropdown-button ${value ? "selected" : "placeholder"}`}>
          <span className="dropdown-label">
            {value ? value.name : placeholder}
         </span><i className="fa-solid fa-chevron-down dropdown-arrow"></i>
        </Listbox.Button>

        {/* OPTIONS */}
        <Listbox.Options className="dropdown-options">
          {options.map((option) => (
            <Listbox.Option
              key={option._id}
              value={option}
              className={({ active }) =>
                `dropdown-option ${active ? "active" : ""}`
              }
            >
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>

      </Listbox>
    </div>
  );
};

export default CustomDropdown;