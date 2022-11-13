import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
//CSS in JS
const Div000 = styled.div``;
const Div001 = styled.div`
  height: 7vh;
  min-height: 35px;
  width: 100vw;
  background: royalblue;
  > ul {
    display: flex;
    height: 100%;
    > li {
      list-style: none;
      height: 100%;
      width: 13vw;
      max-width: 100px;
      > button {
        width: 100%;
        height: 100%;
        border: none;
        background: royalblue;
        color: white;
        cursor: pointer;
        &:hover {
          background: gainsboro;
          color: gray;
          transition: 0.1s;
        }
        > img {
          width: 22px;
          height: auto;
        }
      }
    }
  }
`;
const Div002 = styled.div`
  height: 7vh;
  min-height: 35px;
  width: 100vw;
  background: cornflowerblue;
  > ul {
    display: flex;
    height: 100%;
    > li {
      list-style: none;
      height: 100%;
      width: 13vw;
      max-width: 100px;
      > button {
        width: 100%;
        height: 100%;
        border: none;
        background: cornflowerblue;
        color: white;
        cursor: pointer;
        &:hover {
          background: gainsboro;
          color: gray;
          transition: 0.1s;
        }
        > img {
          width: 22px;
          height: auto;
        }
      }
    }
  }
`;
const S_Menu = () => {
  //const
  const Functions: {
    name0: string;
    name1: string;
    img: string;
    sub: { name0: string; name1: string; img: string; link: string }[];
  }[] = [
    {
      name0: "Record",
      name1: "Record",
      img: require("../../../resources/AppSchd/000Record.png"),
      sub: [
        {
          name0: "Genre",
          name1: "種別",
          img: require("../../../resources/AppSchd/001RecordGenre.png"),
          link: "Record/RecordGenre",
        },
        {
          name0: "Goal",
          name1: "目標",
          img: require("../../../resources/AppSchd/001RecordGoal.png"),
          link: "Record/RecordGoal",
        },
        {
          name0: "Plan",
          name1: "計画",
          img: require("../../../resources/AppSchd/001RecordPlan.png"),
          link: "Record/RecordPlan",
        },
      ],
    },
    {
      name0: "Schedule",
      name1: "Schedule",
      img: require("../../../resources/AppSchd/000Schedule.png"),
      sub: [
        {
          name0: "ScheduleOneDay",
          name1: "日別",
          img: require("../../../resources/AppSchd/001ScheduleOneDay.png"),
          link: "Schedule/ScheduleOneDay",
        },
        {
          name0: "ScheduleWeek",
          name1: "週間",
          img: require("../../../resources/AppSchd/001ScheduleWeek.png"),
          link: "Schedule/ScheduleWeek",
        },
        {
          name0: "ScheduleList",
          name1: "リスト",
          img: require("../../../resources/AppSchd/001ScheduleList.png"),
          link: "Schedule/ScheduleList",
        },
      ],
    },
    {
      name0: "ToDo",
      name1: "ToDo",
      img: require("../../../resources/AppSchd/000ToDo.png"),
      sub: [
        {
          name0: "ToDo",
          name1: "ToDo",
          img: require("../../../resources/AppSchd/001ToDoToDo.png"),
          link: "ToDo/ToDoToDo",
        },
        {
          name0: "Done",
          name1: "Done",
          img: require("../../../resources/AppSchd/001ToDoDone.png"),
          link: "ToDo/ToDoDone",
        },
      ],
    },
    {
      name0: "Analysis",
      name1: "Analysis",
      img: require("../../../resources/AppSchd/000Analysis.png"),
      sub: [
        {
          name0: "Chart",
          name1: "チャート",
          img: require("../../../resources/AppSchd/001AnalysisChart.png"),
          link: "Analysis/AnalysisChart",
        },
      ],
    },
    {
      name0: "Note",
      name1: "Note",
      img: require("../../../resources/AppSchd/000Note.png"),
      sub: [
        {
          name0: "NoteOneDay",
          name1: "ノート",
          img: require("../../../resources/AppSchd/001NoteOneDay.png"),
          link: "Note/NoteOneDay",
        },
        {
          name0: "NoteList",
          name1: "リスト",
          img: require("../../../resources/AppSchd/001NoteList.png"),
          link: "Note/NoteList",
        },
      ],
    },
    {
      name0: "Bin",
      name1: "Bin",
      img: require("../../../resources/AppSchd/000Bin.png"),
      sub: [
        {
          name0: "Storage",
          name1: "収納箱",
          img: require("../../../resources/AppSchd/001BinStorage.png"),
          link: "Bin/BinStorage",
        },
      ],
    },
  ];
  const navigate = useNavigate();
  //useState
  const [activeBox, setActiveBox] = useState<
    {
      name0: string;
      name1: string;
      img: string;
      link: string;
    }[]
  >([]);
  const [ActiveButton, setActiveButton] = useState("");
  return (
    <Div000>
      <Div001>
        <ul>
          {Functions.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  setActiveBox(item.sub);
                  setActiveButton(item.name0);
                }}
              >
                <img src={item.img} alt="" />
                {item.name1}
              </button>
            </li>
          ))}
        </ul>
      </Div001>
      <Div002>
        <ul>
          {activeBox.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  navigate("../../" + item.link);
                }}
              >
                <img src={item.img} alt="" />
                {item.name1}
              </button>
            </li>
          ))}
        </ul>
      </Div002>
    </Div000>
  );
};

export default S_Menu;
