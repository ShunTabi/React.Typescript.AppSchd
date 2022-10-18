import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import S_AppSchd from "../S_AppSchd";
import S_DataTable from "../S_DataTable";
import S_InputForm from "../S_InputForm";
import S_SearchForm from "../S_SearchForm";

//CSS in JS
const Div001 = styled.div`
  display: flex;
  weidth: 100vh;
  height: 100vh;
  background: linear-gradient(mediumslateblue, royalblue);
`;
const Div002 = styled.div`
  width: 100px;
`;
const Div003 = styled.div`
  @media (width < 700px) {
    flex: 30%;
    font-size: 8px;
  }
  @media (width >= 700px) and (width < 1000px) {
    flex: 30%;
    font-size: 10px;
  }
  @media (width >= 1000px) {
    flex: 25%;
    font-size: 12px;
  }
`;
const Div004 = styled.div`
  @media (width < 700px) {
    flex: 70%;
    font-size: 8px;
  }
  @media (width >= 700px) and (width < 1000px) {
    flex: 70%;
    font-size: 10px;
  }
  @media (width >= 1000px) {
    flex: 75%;
    font-size: 12px;
  }
`;
const S_RecordPlan = () => {
  //const
  const inputFormName = "▼計画フォーム";
  const dataTableName = "▼計画データ";
  const dataTableItems: { name: string; display: string }[] = [
    { name: "PLANID", display: "none" },
    { name: "GOALID", display: "none" },
    { name: "目標名", display: "visible" },
    { name: "計画名", display: "visible" },
    { name: "PRIORID", display: "none" },
    { name: "優先度", display: "none" },
    { name: "優先度", display: "visible" },
    { name: "開始日", display: "visible" },
    { name: "終了日", display: "visible" },
    { name: "更新日", display: "visible" },
  ];
  const contextmenuItems: { name: string }[] = [
    { name: "新規" },
    { name: "更新" },
    { name: "ステータス変更(→未)" },
    { name: "ステータス変更(→対応中)" },
    { name: "ステータス変更(→完了)" },
    { name: "ステータス変更(→保留)" },
    { name: "収納箱へ" },
    { name: "ゴミ箱へ" },
  ];
  const searchFormItem: { name: string }[] = [{ name: "目標/計画" }];
  const now: Date = new Date(),
    y: string = now.getFullYear().toString().padStart(4, "0"),
    m: string = (now.getMonth() + 1).toString().padStart(2, "0"),
    d: string = now.getDate().toString().padStart(2, "0"),
    h: string = now.getHours().toString().padStart(2, "0"),
    mm: string = now.getMinutes().toString().padStart(2, "0");
  //type
  type typeData = {
    PLANID: string;
    GOALID: string;
    GOALNAME: string;
    PLANNAME: string;
    PRIORID: string;
    PRIORNAME: string;
    PRIORSUBNAME: string;
    PLANSTARTDATE: string;
    PLANENDDATE: string;
    PLANUPDATEDATE: string;
  };
  //useState
  const [inputFormValues, setInputFormValues] = useState<string[]>([
    "",
    "",
    "",
    `${y}-${m}-${d}`,
  ]);
  const [searchFormValues, setSearchFormValues] = useState<string[]>([""]);
  const [buttonName, setButtonName] = useState<string>("確定");
  const [contextmenuStatus, setContextmenuStatus] = useState<string>("");
  const [data, setData] = useState<typeData[]>([]);
  const [selected, setSelected] = useState<typeData[]>([]);
  const [PLANID, setPLANID] = useState<string>("");
  const [goalItems, setGoalItems] = useState<{ ID: string; NAME: string }[]>(
    []
  );
  const [priorItems, setPriorItems] = useState<{ ID: string; NAME: string }[]>(
    []
  );
  //
  const inputFormItem: { name: string; kind: string; items: any }[] = [
    {
      name: "目標名",
      kind: "select",
      items: goalItems,
    },
    {
      name: "計画名",
      kind: "text",
      items: [],
    },
    {
      name: "優先度",
      kind: "select",
      items: priorItems,
    },
    {
      name: "開始日",
      kind: "text",
      items: [],
    },
    {
      name: "終了日",
      kind: "text",
      items: [],
    },
  ];
  //function
  const getData = async () => {
    const url = "http://localhost:8080/AppSchd/Record/RecordPlan";
    const params = new URLSearchParams({ KEYWORD: searchFormValues[0] });
    const res = await axios.get(url, { params: params });
    setData(res.data.getData);
  };
  const getGoalItems = async () => {
    const url =
      "http://localhost:8080/AppSchd/Record/RecordGoal/RecordGoalItems";
    const res = await axios.get(url);
    setGoalItems(res.data.getData);
  };
  const getPriorItems = async () => {
    const url = "http://localhost:8080/AppSchd/Prior/PriorItems";
    const res = await axios.get(url);
    setPriorItems(res.data.getData);
  };
  const execDML = async () => {
    let url = "";
    const params = new URLSearchParams();
    params.append("GOALID", inputFormValues[0]);
    params.append("PLANNAME", inputFormValues[1]);
    params.append("PRIORID", inputFormValues[2]);
    params.append("PLANSTARTDATE", inputFormValues[3]);
    params.append("PLANENDDATE", inputFormValues[4]);
    if (PLANID === "" && buttonName === "確定") {
      url = "http://localhost:8080/AppSchd/Record/RecordPlan/RecordPlanINSERT";
    } else if (PLANID !== "" && buttonName === "更新") {
      url = "http://localhost:8080/AppSchd/Record/RecordPlan/RecordPlanUPDATE";
      params.append("PLANID", PLANID);
    }
    const res = await axios.post(url, params);
    setButtonName("確定");
    setInputFormValues(["", "", "", `${y}-${m}-${d}`]);
    getData();
  };
  //useEffect
  useEffect(() => {
    getData();
    getGoalItems();
    getPriorItems();
  }, []);
  useEffect(() => {
    if (contextmenuStatus === "新規") {
      setButtonName("確定");
      setInputFormValues(["", "", "", `${y}-${m}-${d}`]);
      setPLANID("");
    } else if (contextmenuStatus === "更新") {
      setButtonName("更新");
      if (selected !== undefined) {
        setInputFormValues([
          selected[0].GOALID,
          selected[0].PLANNAME,
          selected[0].PRIORID,
          selected[0].PLANSTARTDATE,
          selected[0].PLANENDDATE,
        ]);
        setPLANID(selected[0].PLANID);
      }
    } else if (contextmenuStatus === "収納箱へ") {
    } else if (contextmenuStatus === "ゴミ箱へ") {
    }
    setContextmenuStatus("");
  }, [contextmenuStatus]);

  return (
    <Div001>
      <Div002>
        <S_AppSchd />
      </Div002>
      <Div003>
        <S_InputForm
          inputFormItem={inputFormItem}
          inputFormValues={inputFormValues}
          setInputFormValues={setInputFormValues}
          buttonName={buttonName}
          inputFormName={inputFormName}
          execDML={execDML}
        />
        <S_SearchForm
          searchFormItem={searchFormItem}
          searchFormValues={searchFormValues}
          setSearchFormValues={setSearchFormValues}
          getData={getData}
        />
      </Div003>
      <Div004>
        <S_DataTable
          dataTableItems={dataTableItems}
          dataTableName={dataTableName}
          data={data}
          setSelected={setSelected}
          contextmenuItems={contextmenuItems}
          setContextmenuStatus={setContextmenuStatus}
        />
      </Div004>
    </Div001>
  );
};

export default S_RecordPlan;
