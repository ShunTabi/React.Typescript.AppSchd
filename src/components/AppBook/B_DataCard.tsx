import { useState } from "react";
import styled from "styled-components";

const Div001 = styled.div`
  width: 1000px;
  margin: 0 auto;
  height: 97%;
  width: 100%;
  overflow-y: auto;
`;
const Div002 = styled.div`
  position: fixed;
  z-index: 20;
  > ul {
    margin: 0;
    padding: 0;
  }
  > ul li {
    list-style-type: none;
    &:nth-child(odd) button {
      background: linear-gradient(aquamarine, palegreen);
    }
    &:nth-child(even) button {
      background: linear-gradient(white, mediumspringgreen);
    }
    > button {
      width: 100%;
      height: 20px;
      font-size: 5px;
      border-style: none;
      box-shadow: 1px 1px 3px inset;
      color: cornflowerblue;
      &:hover {
        background: whitesmoke;
        color: gray;
      }
    }
  }
`;
const Fieldset001 = styled.fieldset`
  margin: 0;
  background: linear-gradient(aquamarine, azure);
  @media (width < 700px) {
  }
  @media (width >= 700px) and (width < 1000px) {
  }
  @media (width >= 1000px) {
  }
  > ul {
    margin: 0;
    padding: 0;
    > li {
      list-style-type: none;
    }
  }
`;
const Table001 = styled.table`
  border-spacing: 0;
  width: 100%;
  > tbody {
    > tr {
      background: linear-gradient(aquamarine, azure);
      > td {
        &:nth-child(1) {
          width: 50px;
        }
        vertical-align: top;
      }
    }
  }
`;
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
const B_DataCard = ({
  data,
  contextmenuItems,
  setContextmenuStatus,
  setSelected,
}: {
  data: typeData[];
  contextmenuItems: { name: string }[];
  setContextmenuStatus: Function;
  setSelected: Function;
}) => {
  //useState
  const [location, setLocation] = useState<number[]>([0, 0]);
  const [status, setStatus] = useState<boolean>(false);
  return (
    <Div001>
      <Div002
        style={{
          visibility: status ? "visible" : "hidden",
          top: location[0],
          left: location[1],
        }}
        onMouseLeave={() => {
          setStatus(false);
        }}
      >
        <ul>
          {contextmenuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  setContextmenuStatus(item.name);
                  setStatus(false);
                }}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </Div002>
      {data.map((item, index) => (
        <Fieldset001 key={index}>
          <legend>▼{item.BOOKTITLE}</legend>
          <Table001
            onContextMenu={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              setSelected([item]);
              setLocation([e.pageY - 10, e.pageX - 10]);
              setStatus(true);
            }}
          >
            <tbody>
              <tr hidden>
                <td>ID</td>
                <td>{item.BOOKID}</td>
              </tr>
              <tr>
                <td>著者</td>
                <td>{item.BOOKAUTHORS}</td>
              </tr>
              <tr>
                <td>出版社</td>
                <td>{item.BOOKPUBLISHER}</td>
              </tr>
              <tr>
                <td>出版日</td>
                <td>{item.BOOKPUBLISHEDDATE}</td>
              </tr>
              <tr>
                <td>説明</td>
                <td>{item.BOOKDESCRIPTION}</td>
              </tr>
              <tr>
                <td>ページ数</td>
                <td>{item.BOOKPAGECOUNT}</td>
              </tr>
              <tr>
                <td>言語</td>
                <td>{item.BOOKLANGUAGE}</td>
              </tr>
              <tr hidden>
                <td>プレビュー</td>
                <td>{item.BOOKPREVIEWLINK}</td>
              </tr>
              <tr hidden>
                <td>INFO</td>
                <td>{item.BOOKINFOLINK}</td>
              </tr>
            </tbody>
          </Table001>
        </Fieldset001>
      ))}
    </Div001>
  );
};

export default B_DataCard;
