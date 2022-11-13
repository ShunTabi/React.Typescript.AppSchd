import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import S_FormInput1 from "../Com/S_FormInput1";
import S_FormSearch1 from "../Com/S_FormSearch1";
import S_Menu from "../Com/S_Menu";
import S_DataTable1 from "../Com/S_DataTable1";
//CSS in JS
const Div000 = styled.div`
  height: 100vh;
  width: 100vw;
`;
const Div001 = styled.div`
  display: flex;
  height: 86vh;
  width: 100vw;
`;
const Div002 = styled.div`
  height: 100%;
  width: 300px;
  background: lightblue;
  overflow-y: auto;
`;
const Div003 = styled.div`
  height: 100%;
  width: 95vw;
  background: lightsteelblue;
  overflow-y: auto;
`;
const Div004 = styled.div`
  height: 100%;
  width: 5vw;
  background: gainsboro;
  overflow-y: auto;
`;
//const1
const tableLabels: { name: string; display: string; type: string }[] = [
  { name: "TODOID", display: "none", type: "normal" },
  { name: "GOALID", display: "none", type: "normal" },
  { name: "目標名", display: "visible", type: "normal" },
  { name: "PLANID", display: "none", type: "normal" },
  { name: "計画名", display: "visible", type: "normal" },
  { name: "ToDo名", display: "visible", type: "normal" },
  { name: "STATUSID", display: "none", type: "normal" },
  { name: "進捗", display: "visible", type: "normal" },
  { name: "完了日", display: "visible", type: "normal" },
  { name: "更新日", display: "visible", type: "normal" },
];
const tableName: string = "Doneデータ";
const getDate = (m1: number, d1: number) => {
  let now: Date = new Date();
  now.setMonth(now.getMonth() + 1 + m1);
  now.setDate(now.getDate() + d1);
  const y: string = now.getFullYear().toString(),
    m: string = now.getMonth().toString().padStart(2, "0"),
    d: string = now.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
};
const S_ToDoDone = () => {
  //type
  type dataType = {
    TODOID: string;
    GOALID: string;
    GOALNAME: string;
    PLANID: string;
    PLANNAME: string;
    TODONAME: string;
    STATUSID: string;
    STATUSNAME: string;
    TODOENDDATE: string;
    TODOUPDATEDATE: string;
  }[];
  //useState
  const [searchValues, setSearchValues] = useState<string[]>([""]);
  const [inputValues, setInputValues] = useState<string[]>([
    "",
    "",
    "",
    getDate(0, 0),
  ]);
  const [buttonName, setButtonName] = useState("確定");
  const [data, setData] = useState<dataType>([]);
  const [selected, setSelected] = useState<dataType>([]);
  const [TODOID, setTODOID] = useState<string>("");
  const [goalNames, setGoalNames] = useState<{ ID: string; NAME: string }[]>(
    []
  );
  const [planNames, setPlanNames] = useState<{ ID: string; NAME: string }[]>(
    []
  );
  //function
  const Clearing = () => {
    setButtonName("確定");
    setInputValues(["", "", "", getDate(0, 0)]);
    setTODOID("");
    setSelected([]);
  };
  const selectValues = async () => {
    const url = "http://localhost:8080/AppSchd/ToDo/ToDoDone";
    const params = new URLSearchParams({ KEYWORD: searchValues[0] });
    const res = await axios.get(url, { params: params });
    setData(res.data.getData);
    if (res.status === 200) {
      console.log(`検索しました【${searchValues}】`);
    } else {
      console.log(res);
    }
    Clearing();
  };
  const selectGoalNames = async () => {
    const url =
      "http://localhost:8080/AppSchd/Record/RecordGoal/RecordGoalItems";
    const res = await fetch(url);
    const output = await res.json();
    setGoalNames(output.getData);
  };
  const selectPlanNames = async () => {
    const url = `http://localhost:8080/AppSchd/Record/RecordPlan/RecordPlanItems`;
    const params = new URLSearchParams({ GOALID: inputValues[0] });
    const res = await axios.get(url, { params: params });
    setPlanNames(res.data.getData);
  };
  const dmlExec = async () => {
    let url = "";
    const params = new URLSearchParams();
    params.append("PLANID", inputValues[1]);
    params.append("TODONAME", inputValues[2]);
    params.append("TODOENDDATE", inputValues[3]);
    if (TODOID === "" && buttonName === "確定") {
      url = "http://localhost:8080/AppSchd/ToDo/ToDoINSERT";
    } else if (TODOID !== "" && buttonName === "更新") {
      url = "http://localhost:8080/AppSchd/ToDo/ToDoUPDATE";
      params.append("TODOID", TODOID);
    }
    const res = await axios.post(url, params);
    if (res.status === 200) {
      console.log(`データ操作しました【${inputValues}】`);
      selectValues();
      Clearing();
    } else {
      console.log(res);
    }
  };
  const selectedUpdateItem = () => {
    setTODOID(selected[0].TODOID);
    setInputValues([
      selected[0].GOALID,
      selected[0].PLANID,
      selected[0].TODONAME,
      selected[0].TODOENDDATE,
    ]);
    setButtonName("更新");
  };
  //useEffect
  useEffect(() => {
    selectValues();
    selectGoalNames();
    console.log("ToDoDoneを読み込みました。");
  }, []);
  useEffect(() => {
    selectPlanNames();
  }, [inputValues[0]]);
  //const2
  const inputLabels: {
    name: string;
    type: string;
    box: { ID: string; NAME: string }[];
  }[] = [
    {
      name: "目標名",
      type: "select",
      box: goalNames,
    },
    {
      name: "計画名",
      type: "select",
      box: planNames,
    },
    {
      name: "ToDo名",
      type: "text",
      box: [],
    },
    {
      name: "完了日",
      type: "text",
      box: [],
    },
  ];
  const searchLabels: {
    name: string;
    type: string;
    box: { ID: string; NAME: string }[];
  }[] = [
    {
      name: "目標名/計画名",
      type: "text",
      box: [],
    },
  ];
  const contextmenuItems: { img: string; name: string; func: Function }[] = [
    { img: "", name: "新規", func: Clearing },
    { img: "", name: "更新", func: selectedUpdateItem },
    { img: "", name: "削除", func: selectValues },
    { img: "", name: "ステータス変更(→未)", func: selectValues },
    { img: "", name: "ステータス変更(→対応中)", func: selectValues },
    { img: "", name: "ステータス変更(→完了)", func: selectValues },
    { img: "", name: "ステータス変更(→保留)", func: selectValues },
    { img: "", name: "最新化", func: selectValues },
    { img: "", name: "収納箱へ", func: selectValues },
    { img: "", name: "ゴミ箱へ", func: selectValues },
  ];
  return (
    <Div000>
      <S_Menu />
      <Div001>
        <Div002>
          <S_FormInput1
            inputLabels={inputLabels}
            inputValues={inputValues}
            setInputValues={setInputValues}
            buttonName={buttonName}
            dmlExec={dmlExec}
          />
          <S_FormSearch1
            searchLabels={searchLabels}
            searchValues={searchValues}
            setSearchValues={setSearchValues}
            selectValues={selectValues}
          />
        </Div002>
        <Div003>
          <S_DataTable1
            tableName={tableName}
            tableLabels={tableLabels}
            data={data}
            contextmenuItems={contextmenuItems}
            setSelected={setSelected}
          />
        </Div003>
        <Div004 />
      </Div001>
    </Div000>
  );
};

export default S_ToDoDone;
