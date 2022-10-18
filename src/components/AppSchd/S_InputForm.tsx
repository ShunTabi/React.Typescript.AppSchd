import styled from "styled-components";
//CSS in JS
const Fieldset001 = styled.fieldset`
  background: linear-gradient(lightcyan, paleturquoise);
  padding: 0;
  > table {
    border-spacing: 0;
  }
`;
const S_InputForm = ({
  inputFormItem,
  inputFormValues,
  setInputFormValues,
  buttonName,
  inputFormName,
  execDML,
}: {
  inputFormItem: {
    name: string;
    kind: string;
    items: { ID: string; NAME: string }[];
  }[];
  inputFormValues: string[];
  setInputFormValues: Function;
  buttonName: string;
  inputFormName: string;
  execDML: Function;
}) => {
  return (
    <Fieldset001>
      <legend>{inputFormName}</legend>
      <table>
        <tbody>
          {inputFormItem.map(
            (
              item: {
                name: string;
                kind: string;
                items: { ID: string; NAME: string }[];
              },
              index: number
            ) => (
              <tr key={index}>
                <td>{item.name}</td>
                {(() => {
                  if (item.kind === "text") {
                    return (
                      <td>
                        <input
                          type={item.kind}
                          value={inputFormValues[index]}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setInputFormValues(
                              inputFormValues.map((item2, index2) =>
                                index === index2 ? e.target.value : item2
                              )
                            );
                          }}
                        />
                      </td>
                    );
                  } else if (item.kind === "select") {
                    return (
                      <td>
                        <select
                          value={inputFormValues[index]}
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            setInputFormValues(
                              inputFormValues.map((item2, index2) =>
                                index === index2 ? e.target.value : item2
                              )
                            );
                          }}
                        >
                          <option value=""></option>
                          {item.items.map((item2, index2) => (
                            <option value={item2.ID} key={index2}>
                              {item2.NAME}
                            </option>
                          ))}
                        </select>
                      </td>
                    );
                  }
                })()}
              </tr>
            )
          )}
          <tr>
            <td></td>
            <td>
              <button
                onClick={() => {
                  execDML();
                }}
              >
                {buttonName}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Fieldset001>
  );
};

export default S_InputForm;
