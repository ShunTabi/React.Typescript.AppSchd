import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//CSS in JS
const Div001 = styled.div`
  flex: 15%;
  height: 100%;
`;
const Ul001 = styled.ul`
  margin: 0;
  padding: 0;
  &:nth-child(1) li button {
    background: linear-gradient(green, springgreen);
  }
  &:nth-child(2) li button {
    background: linear-gradient(aquamarine, springgreen);
  }
  > li button {
    padding: 5px;
    margin: 0;
    &:nth-child(1) {
    }
    color: white;
    cursor: pointer;
    border-style: none;
    width: 100px;
    height: 45px;
    font-size: 12px;
    box-shadow: 1px 1px 4px inset;
    &:hover {
      background: whitesmoke;
      color: gray;
    }
  }
`;
const Li001 = styled.li`
  list-style-type: none;
  width: 100px;
  height: 45px;
`;
const B_AppBook = () => {
  //useNavigate
  const navigate = useNavigate();
  //const
  //useState
  const [location, setLocation] = useState<number[]>([0, 0]);
  const [buttons1, setButtons1] = useState<
    {
      name: string;
      status: boolean;
      items: { name: string; link: string; status: boolean }[];
    }[]
  >([
    {
      name: "SearchBook",
      status: false,
      items: [
        {
          name: "書籍検索",
          link: "SearchBook",
          status: false,
        },
      ],
    },
    {
      name: "SearchMyBook",
      status: false,
      items: [
        {
          name: "自分の書籍",
          link: "SearchMyBook",
          status: false,
        },
      ],
    },
  ]);
  const [buttons2, setButtons2] = useState<
    { name: string; link: string; status: boolean }[]
  >([]);
  return (
    <Div001>
      <Ul001>
        {buttons1.map((item, index) => (
          <Li001 key={index}>
            <button
              disabled={item.status}
              onContextMenu={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                setLocation([e.pageY - 10, e.pageX - 10]);
                setButtons2(item.items);
              }}
            >
              {item.name}
            </button>
          </Li001>
        ))}
      </Ul001>
      <Ul001
        onMouseLeave={() => {
          setButtons2([]);
        }}
        style={{
          position: "fixed",
          zIndex: "10",
          top: location[0],
          left: location[1],
        }}
      >
        {buttons2.map((item, index) => (
          <Li001 key={index}>
            <button
              onClick={() => {
                navigate("../" + item.link);
              }}
            >
              {item.name}
            </button>
          </Li001>
        ))}
      </Ul001>
    </Div001>
  );
};
export default B_AppBook;
