import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import S_DataTable1 from "../Com/S_DataTable1";
import S_FormInput1 from "../Com/S_FormInput1";
import S_FormSearch1 from "../Com/S_FormSearch1";
import S_Menu from "../Com/S_Menu";
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
  { name: "PLANID", display: "none", type: "normal" },
  { name: "GOALID", display: "none", type: "normal" },
  { name: "目標名", display: "visible", type: "normal" },
  { name: "計画名", display: "visible", type: "normal" },
  { name: "PRIORID", display: "none", type: "normal" },
  { name: "PRIORNAME", display: "none", type: "normal" },
  { name: "優先度", display: "visible", type: "normal" },
  { name: "開始日", display: "visible", type: "normal" },
  { name: "終了日", display: "visible", type: "normal" },
  { name: "更新日", display: "visible", type: "normal" },
];
const tableName: string = "計画データ";
const getDate = (m1: number, d1: number) => {
  let now: Date = new Date();
  now.setMonth(now.getMonth() + 1 + m1);
  now.setDate(now.getDate() + d1);
  const y: string = now.getFullYear().toString(),
    m: string = now.getMonth().toString().padStart(2, "0"),
    d: string = now.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
};
const S_RecordPlan = () => {
  //type
  type dataType = {
    GOALID: string;
    GOALNAME: string;
    PLANENDDATE: string;
    PLANID: string;
    PLANNAME: string;
    PLANSTARTDATE: string;
    PLANUPDATEDATE: string;
    PRIORID: string;
    PRIORNAME: string;
    PRIORSUBNAME: string;
  }[];
  //useState
  const [inputValues, setInputValues] = useState<string[]>([
    "",
    "",
    "",
    getDate(0, 0),
    getDate(0, 14),
  ]);
  const [searchValues, setSearchValues] = useState<string[]>([""]);
  const [buttonName, setButtonName] = useState("確定");
  const [data, setData] = useState<dataType>([]);
  const [selected, setSelected] = useState<dataType>([]);
  const [PLANID, setPLANID] = useState<string>("");
  const [goalNames, setGoalNames] = useState<{ ID: string; NAME: string }[]>(
    []
  );
  const [priorNames, setPriorNames] = useState<{ ID: string; NAME: string }[]>(
    []
  );
  //function
  const Clearing = () => {
    setButtonName("確定");
    setInputValues(["", "", "", getDate(0, 0), getDate(0, 14)]);
    setPLANID("");
    setSelected([]);
  };
  const selectValues = async () => {
    const url = "http://localhost:8080/AppSchd/Record/RecordPlan";
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
  const selectPriorNames = async () => {
    const url = "http://localhost:8080/AppSchd/Prior/PriorItems";
    const res = await fetch(url);
    const output = await res.json();
    setPriorNames(output.getData);
  };
  const dmlExec = async () => {
    let url = "";
    const params = new URLSearchParams();
    params.append("GOALID", inputValues[0]);
    params.append("PLANNAME", inputValues[1]);
    params.append("PRIORID", inputValues[2]);
    params.append("PLANSTARTDATE", inputValues[3]);
    params.append("PLANENDDATE", inputValues[4]);
    if (PLANID === "" && buttonName === "確定") {
      url = "http://localhost:8080/AppSchd/Record/RecordPlan/RecordPlanINSERT";
    } else if (PLANID !== "" && buttonName === "更新") {
      url = "http://localhost:8080/AppSchd/Record/RecordPlan/RecordPlanUPDATE";
      params.append("PLANID", PLANID);
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
    setPLANID(selected[0].PLANID);
    setInputValues([
      selected[0].GOALID,
      selected[0].PLANNAME,
      selected[0].PRIORID,
      selected[0].PLANSTARTDATE,
      selected[0].PLANENDDATE,
    ]);
    setButtonName("更新");
  };
  //useEffect
  useEffect(() => {
    selectValues();
    selectGoalNames();
    selectPriorNames();
    console.log("RECORDPLANを読み込みました。");
  }, []);
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
      type: "text",
      box: [],
    },
    {
      name: "優先度",
      type: "text",
      box: priorNames,
    },
    {
      name: "開始日",
      type: "text",
      box: [],
    },
    {
      name: "終了日",
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

export default S_RecordPlan;
