import axios from "axios";
import { useState } from "react";

const fields = [
    {
        id: "name",
        type: "text",
        label: "Name",
    },
    {
        id: "email",
        type: "email",
        label: "Email",
    },
    {
        id: "department",
        type: "select",
        label: "Department",
        defaultValue: "hr",
        options: [
            {
                value: "hr",
                text: "Human Resource"
            },
            {
                value: "eng",
                text: "Engineering"
            },
            {
                value: "finance",
                text: "Finance",
            },
            {
                value: "sales",
                text: "Sales"
            }
        ]
    },
    {
        id: "designation",
        type: "text",
        label: "Designation"
    }
]

function getDefaultState() {
    const state = {};
    for (const field of fields) {
        state[field.id] = field.defaultValue || "";
    }
    return state;
}

export default function Registration() {
    const [inputVals, setInputVals] = useState(getDefaultState());
    const [alert, setAlert] = useState({
      text: "",
      type: ""
    });

    function handleInputChange(e) {
        const { id, value } = e.target;
        setInputVals(prev => ({
            ...prev,
            [id]: value,
        }))
        setAlert({
          text: "",
          type: ""
        })
    }

    async function handleSubmit(e) {
      e.preventDefault();
      for (const field in inputVals) {
        if (!inputVals[field].trim()) {
          setAlert({
            text: "Please fill all the required fields",
            type: "danger"
          })
          return;
        }
      } 

      try {
        await axios.post("/api/employees/new", {
          ...inputVals,
        });

        setAlert({
          text: "Record added successfully!",
          type: "success"
        })

        setInputVals(getDefaultState());
      } catch(err) {
        setAlert({
          text: err.response?.data?.error ?? err.toString(),
          type: "danger"
        });
      }
      
    }

    return (
      <>
        <div className="col-6 mx-auto mt-5">
          {alert.text && (
            <div className={`alert alert-${alert.type} text-center`} role="alert">
              {alert.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div className="form-floating mb-3" key={field.id}>
                {field.type === "select" ? (
                  <select
                    className="form-select"
                    id={field.id}
                    value={inputVals[field.id]}
                    onChange={handleInputChange}
                    required
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    className="form-control"
                    id={field.id}
                    value={inputVals[field.id]}
                    onChange={handleInputChange}
                    required
                  />
                )}
                <label htmlFor={field.id}>{field.label}</label>
              </div>
            ))}

            <button className="form-control btn btn-outline-primary">
              Submit
            </button>
          </form>
        </div>
      </>
    );
}