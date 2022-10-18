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
    background: linear-gradient(mediumblue, cornflowerblue);
  }
  &:nth-child(2) li button {
    background: linear-gradient(lightsteelblue, cornflowerblue);
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
const S_AppSchd = () => {
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
      name: "Record",
      status: false,
      items: [
        {
          name: "種別",
          link: "Record/RecordGenre",
          status: false,
        },
        {
          name: "目標",
          link: "Record/RecordGoal",
          status: false,
        },
        {
          name: "計画",
          link: "Record/RecordPlan",
          status: false,
        },
      ],
    },
    {
      name: "Schedule",
      status: false,
      items: [
        {
          name: "日別予定",
          link: "Schedule/ScheduleOneDay",
          status: false,
        },
        {
          name: "週間予定",
          link: "Schedule/ScheduleWeek",
          status: false,
        },
        {
          name: "予定リスト",
          link: "Schedule/ScheduleList",
          status: false,
        },
      ],
    },
    {
      name: "ToDo",
      status: false,
      items: [
        {
          name: "ToDo",
          link: "ToDo/ToDo",
          status: false,
        },
        {
          name: "Done",
          link: "ToDo/Done",
          status: false,
        },
      ],
    },
    {
      name: "Analysis",
      status: false,
      items: [
        {
          name: "Chart",
          link: "Analysis/Chart",
          status: false,
        },
      ],
    },
    {
      name: "Bin",
      status: false,
      items: [
        {
          name: "収納箱",
          link: "Bin/StorageBin",
          status: false,
        },
        {
          name: "ゴミ箱",
          link: "Bin/RecycleBin",
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
                navigate("../../" + item.link);
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
export default S_AppSchd;
