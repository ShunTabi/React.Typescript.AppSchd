import { useState } from "react";
import styled from "styled-components";
const Fieldset001 = styled.fieldset`
  background: linear-gradient(lightcyan, paleturquoise);
  height: 97%;
  overflow-y: auto;
  padding: 0;
`;
const Div001 = styled.div`
  position: fixed;
  z-index: 20;
  > ul {
    margin: 0;
    padding: 0;
  }
  > ul li {
    list-style-type: none;
    &:nth-child(odd) button {
      background: linear-gradient(white, cornflowerblue);
    }
    &:nth-child(even) button {
      background: linear-gradient(white, turquoise);
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
const Table001 = styled.table`
  text-align: left;
  border-spacing: 0;
  > thead {
    position: sticky;
    top: 0;
    z-index: 10;
    > tr {
      background: linear-gradient(royalblue, lightskyblue);
      color: white;
      > th {
        @media (width < 700px) {
          padding: 0;
        }
        @media (width >= 700px) and (width < 1000px) {
          padding: 2px 10px;
        }
        @media (width >= 1000px) {
          padding: 2px 10px;
        }
      }
    }
  }
  > tbody {
  }
  > tbody tr {
    background: linear-gradient(azure, lightsteelblue);
    &:hover {
      background: whitesmoke;
      color: gray;
      box-shadow: 1px 1px 3px inset;
    }
    > td {
      @media (width < 700px) {
        padding: 0;
      }
      @media (width >= 700px) and (width < 1000px) {
        padding: 2px 10px;
      }
      @media (width >= 1000px) {
        padding: 2px 15px;
      }
    }
  }
`;
const S_DataTable = ({
  dataTableItems,
  dataTableName,
  data,
  setSelected,
  contextmenuItems,
  setContextmenuStatus,
}: {
  dataTableItems: { name: string; display: string }[];
  dataTableName: string;
  data: any[];
  setSelected: Function;
  contextmenuItems: { name: string }[];
  setContextmenuStatus: Function;
}) => {
  //useState
  const [location, setLocation] = useState<number[]>([]);
  const [status, setStatus] = useState<boolean>(false);
  return (
    <Fieldset001>
      <Div001
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
                }}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </Div001>
      <legend>{dataTableName}</legend>
      <Table001>
        <thead>
          <tr>
            {dataTableItems.map((item, index) => (
              <th
                key={index}
                style={{
                  display: item.display,
                }}
              >
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => {
            return (
              <tr
                key={index}
                onContextMenu={(
                  e: React.MouseEvent<HTMLElement, MouseEvent>
                ) => {
                  setSelected([item]);
                  setLocation([e.pageY - 10, e.pageX - 10]);
                  setStatus(true);
                }}
              >
                {Object.keys(item).map((keyName, index2) => {
                  return (
                    <td
                      key={index2}
                      style={{
                        display: dataTableItems[index2]["display"],
                      }}
                    >
                      {item[keyName]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table001>
    </Fieldset001>
  );
};

export default S_DataTable;
