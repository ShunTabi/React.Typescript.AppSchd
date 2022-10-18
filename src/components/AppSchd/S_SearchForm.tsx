import styled from "styled-components";

const Fieldset001 = styled.fieldset`
  background: linear-gradient(lightcyan, paleturquoise);
  padding: 0;
  > table {
    border-spacing: 0;
  }
`;
const S_SearchForm = ({
  searchFormItem,
  searchFormValues,
  setSearchFormValues,
  getData,
}: {
  searchFormItem: { name: string }[];
  searchFormValues: string[];
  setSearchFormValues: Function;
  getData: Function;
}) => {
  return (
    <Fieldset001>
      <legend>▼検索フォーム</legend>
      <table>
        <tbody>
          {searchFormItem.map((item: { name: string }, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <input
                  type="text"
                  value={searchFormValues[index]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchFormValues(
                      searchFormValues.map((item2, index2) =>
                        index === index2 ? e.target.value : item2
                      )
                    );
                  }}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              <button
                onClick={() => {
                  getData();
                }}
              >
                検索
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Fieldset001>
  );
};

export default S_SearchForm;
