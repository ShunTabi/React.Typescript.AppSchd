import { ChangeEvent } from "react";
import styled from "styled-components";

//CSS in JS
const Div000 = styled.div`
  height: auto;
  width: auto;
  padding: 3px;
  > fieldset {
    padding: 3px;
    > ul {
      > li {
        padding: 3px;
        list-style: none;
        > input {
          height: 16px;
          border: none;
          padding: 2px;
          &:focus {
            outline: 0;
            box-shadow: 0 0 0 2px rgb(33, 150, 243) inset;
          }
        }
        > select {
          height: 19px;
          border: none;
          padding: 2px;
          &:focus {
            outline: 0;
            box-shadow: 0 0 0 2px rgb(33, 150, 243) inset;
          }
        }
        > textarea {
          height: 220px;
          width: 350px;
          border: none;
          padding: 2px;
          resize: vertical;
          max-height: 490px;
          overflow: auto;
          &:focus {
            outline: 0;
            box-shadow: 0 0 0 2px rgb(33, 150, 243) inset;
          }
        }
        > p {
          label {
            padding-right: 8px;
            &: last-child {
              padding: 0;
            }
          }
        > button {
          height: 20px;
          width: 35px;
          cursor: pointer;
        }
      }
    }
  }
`;
const S_FormInput1 = ({
  inputLabels,
  inputValues,
  buttonName,
  setInputValues,
  dmlExec,
}: {
  inputLabels: {
    name: string;
    type: string;
    box: { ID: string; NAME: string }[];
  }[];
  inputValues: string[];
  buttonName: string;
  setInputValues: Function;
  dmlExec: Function;
}) => {
  return (
    <Div000>
      <fieldset>
        <legend>入力フォーム</legend>
        <ul>
          {inputLabels.map((item, index) => (
            <li key={index}>
              <label>{item.name}：</label>
              <br />
              {(() => {
                if (item.type === "text") {
                  return (
                    <input
                      type="text"
                      value={inputValues[index]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setInputValues(
                          inputValues.map((item, index2) =>
                            index2 === index ? e.target.value : item
                          )
                        );
                        //console.log(inputValues);
                      }}
                    />
                  );
                } else if (item.type === "select") {
                  return (
                    <select
                      value={inputValues[index]}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setInputValues(
                          inputValues.map((item2, index2) =>
                            index === index2 ? e.target.value : item2
                          )
                        );
                        //console.log(inputValues);
                      }}
                    >
                      <option value=""></option>
                      {item.box.map((item2, index2) => (
                        <option value={item2.ID} key={index2}>
                          {item2.NAME}
                        </option>
                      ))}
                    </select>
                  );
                } else if (item.type === "textarea") {
                  return (
                    <textarea
                      value={inputValues[index]}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        setInputValues(
                          inputValues.map((item, index2) =>
                            index2 === index ? e.target.value : item
                          )
                        );
                      }}
                    ></textarea>
                  );
                } else if (item.type === "radio") {
                  return (
                    <p>
                      {item.box.map((item2, index2) => (
                        <label key={index2}>
                          <input
                            type="radio"
                            name="radio"
                            value={item2.ID}
                            checked={item2.ID === inputValues[index]}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setInputValues(
                                inputValues.map((item2, index2) =>
                                  index === index2 ? e.target.value : item2
                                )
                              );
                            }}
                          />
                          {item2.NAME}
                        </label>
                      ))}
                    </p>
                  );
                }
              })()}
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                for (let i = 0; i < inputValues.length; i++) {
                  if (inputValues[i] === "") {
                    console.log("空です。");
                    return;
                  }
                }
                dmlExec();
              }}
            >
              {buttonName}
            </button>
          </li>
        </ul>
      </fieldset>
    </Div000>
  );
};

export default S_FormInput1;
