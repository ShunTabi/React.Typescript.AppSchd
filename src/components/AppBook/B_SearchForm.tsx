import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const Div001 = styled.div``;
const Fieldset001 = styled.fieldset`
  background: linear-gradient(aquamarine, azure);
`;
const B_SearchForm = ({
  searchFormValues,
  setSearchFormValues,
  getData,
}: {
  searchFormValues: string[];
  setSearchFormValues: Function;
  getData: Function;
}) => {
  //type
  type typeData = {
    BOOKID: string;
    BOOKTITLE: string;
    BOOKAUTHORS: string;
    BOOKPUBLISHER: string;
    BOOKPUBLISHEDDATE: string;
    BOOKDESCRIPTION: string;
    BOOKLANGUAGE: string;
    BOOKPAGECOUNT: string;
    BOOKPREVIEWLINK: string;
    BOOKINFOLINK: string;
  };
  //useState
  //function
  return (
    <Div001>
      <Fieldset001>
        <legend>▼検索フォーム</legend>
        <table>
          <tbody>
            <tr>
              <td>書籍名</td>
              <td>
                <input
                  type="text"
                  value={searchFormValues[0]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchFormValues([e.target.value]);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button
                  onClick={() => {
                    if (
                      searchFormValues[0] === "" ||
                      searchFormValues[0].indexOf("%") > -1
                    ) {
                      return;
                    }
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
    </Div001>
  );
};

export default B_SearchForm;
