import { ReactHTML } from "react";
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
const S_FormSearch1 = ({
  searchLabels,
  searchValues,
  setSearchValues,
  selectValues,
}: {
  searchLabels: {
    name: string;
    type: string;
    box: { ID: string; NAME: string }[];
  }[];
  searchValues: string[];
  setSearchValues: Function;
  selectValues: Function;
}) => {
  return (
    <Div000>
      <fieldset>
        <legend>検索フォーム</legend>
        <ul>
          {searchLabels.map((item, index) => (
            <li key={index}>
              <label>{item.name}：</label>
              <br />
              {(() => {
                if (item.type === "text") {
                  return (
                    <input
                      type="text"
                      value={searchValues[index]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchValues(
                          searchValues.map((item, index2) =>
                            index2 === index ? e.target.value : item
                          )
                        );
                        //console.log(searchValues);
                      }}
                    />
                  );
                } else if (item.type === "select") {
                  return (
                    <select
                      value={searchValues[index]}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setSearchValues(
                          searchValues.map((item2, index2) =>
                            index === index2 ? e.target.value : item2
                          )
                        );
                        //console.log(searchValues);
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
                } else if (item.type === "radio") {
                  return (
                    <p>
                      {item.box.map((item2, index2) => (
                        <label key={index2}>
                          <input
                            type="radio"
                            name="radio"
                            value={item2.ID}
                            checked={item2.ID === searchValues[index]}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setSearchValues(
                                searchValues.map((item2, index2) =>
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
                selectValues();
              }}
            >
              検索
            </button>
          </li>
        </ul>
      </fieldset>
    </Div000>
  );
};

export default S_FormSearch1;
