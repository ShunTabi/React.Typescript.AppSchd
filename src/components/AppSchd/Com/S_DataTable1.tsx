import { useState } from "react";
import styled from "styled-components";

const Div000 = styled.div`
  padding: 3px;
  > fieldset {
    padding: 0px;
  }
`;
const Div001 = styled.div`
  position: fixed;
  z-index: 20;
  > ul {
    min-width: 100px;
    max-width: 140px;
    > li {
      list-style: none;
      background: whitesmoke;
      color: gray;
      padding: 4px 10px;
      border-bottom: 1px solid gray;
      cursor: pointer;
      &:last-child {
        border: none;
      }
      &:hover {
        background: gray;
        color: whitesmoke;
        transition: 0.1s;
        pointer: cursor;
      }
    }
  }
`;
const Div002 = styled.div`
  margin: 3px;
  height: 81vh;
  overflow-y: auto;
  table {
    text-align: left;
    text-valign: top;
    border-spacing: 0;
    > thead {
      position: sticky;
      top: 0;
      z-index: 10;
      > tr {
        > th {
          color: white;
          background: steelblue;
          padding: 4px;
          font-weight: normal;
        }
      }
    }
    > tbody {
      vertical-align: top;
      > tr {
        background: lightsteelblue;
        > td {
          border-bottom: 1px solid black;
          padding: 5.5px 4px;
          > textarea {
            background: lightsteelblue;
            min-width: 300px;
            height: 100px;
            max-height: 60vh;
            border: none;
            resize: vertical;
            cursor: default;
            :focus {
              outline: none;
            }
          }
        }
        &:last-child {
          td {
            border: none;
          }
        }
        &:hover {
          background: whitesmoke;
          color: gray;
          transition: 0.1s;
          > td {
            > textarea {
              background: whitesmoke;
              color: gray;
              transition: 0.1s;
            }
          }
        }
      }
    }
  }
`;
const S_DataTable1 = ({
  tableName,
  tableLabels,
  data,
  contextmenuItems,
  //setSelected,
  createContextmenu,
}: {
  tableName: string;
  tableLabels: { name: string; display: string; type: string }[];
  data: any[];
  contextmenuItems: { img: string; name: string; func: Function }[];
  //setSelected: Function;
  createContextmenu: Function;
}) => {
  //useState
  const [contextmenuStatus, setContextmenuStatus] = useState<boolean>(false);
  const [location, setLocation] = useState<number[]>([0, 0]);
  const [selected, setSelected] = useState<any[]>([]);
  return (
    <Div000
      style={{
        visibility: data.length > 0 ? "visible" : "hidden",
        width: data.length > 0 ? "auto" : "0",
      }}
    >
      <fieldset>
        <legend>{tableName}</legend>
        <Div001
          style={{
            visibility: contextmenuStatus ? "visible" : "hidden",
            top: location[0],
            left: location[1],
          }}
          onMouseLeave={() => {
            setContextmenuStatus(false);
            createContextmenu([]);
            setSelected([]);
          }}
        >
          <ul>
            {contextmenuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  const data = selected;
                  item.func(data);
                  setContextmenuStatus(false);
                  createContextmenu([]);
                  setSelected([]);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </Div001>
        <Div002>
          <table>
            <thead>
              <tr>
                {tableLabels.map((item, index) => (
                  <th style={{ display: item.display }} key={index}>
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
                      createContextmenu([item]);
                      setLocation([e.pageY - 10, e.pageX - 10]);
                      setContextmenuStatus(true);
                    }}
                  >
                    {Object.keys(item).map((keyName, index2) => {
                      return (
                        <td
                          key={index2}
                          style={{
                            display: tableLabels[index2]["display"],
                          }}
                        >
                          {(() => {
                            if (tableLabels[index2]["type"] === "normal") {
                              return item[keyName];
                            } else if (
                              tableLabels[index2]["type"] === "textarea"
                            ) {
                              return (
                                <textarea
                                  value={item[keyName]}
                                  readOnly
                                ></textarea>
                              );
                            }
                          })()}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Div002>
      </fieldset>
    </Div000>
  );
};

export default S_DataTable1;
