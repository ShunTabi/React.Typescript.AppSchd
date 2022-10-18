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
const S_ScheduleList = () => {
  //const
  const inputFormName = "▼予定フォーム";
  const dataTableName = "▼予定データ";
  const dataTableItems: { name: string; display: string }[] = [
    { name: "SCHEDULEID", display: "none" },
    { name: "GOALID", display: "none" },
    { name: "目標名", display: "visible" },
    { name: "PLANID", display: "none" },
    { name: "計画名", display: "visible" },
    { name: "STATUSID", display: "none" },
    { name: "進捗", display: "visible" },
    { name: "日付", display: "visible" },
    { name: "開始時間", display: "visible" },
    { name: "終了時間", display: "visible" },
    { name: "工数(H)", display: "visible" },
    { name: "更新日", display: "visible" },
  ];
  const contextmenuItems: { name: string }[] = [
    { name: "新規" },
    { name: "更新" },
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
    SCHEDULEID: string;
    GOALID: string;
    GOALNAME: string;
    PLANID: string;
    PLANNAME: string;
    STATUSID: string;
    STATUSNAME: string;
    SCHEDULEDATE: string;
    SCHEDULESTARTTIME: string;
    SCHEDULEENDTIME: string;
    SCHEDULEHOURS: string;
    SCHEDULEUPDATEDATE: string;
  };
  //useState
  const [inputFormValues, setInputFormValues] = useState<string[]>([
    "",
    "",
    `${y}-${m}-${d}`,
    `${h}:${mm}`,
    `${h}:${mm}`,
  ]);
  const [searchFormValues, setSearchFormValues] = useState<string[]>([""]);
  const [buttonName, setButtonName] = useState<string>("確定");
  const [contextmenuStatus, setContextmenuStatus] = useState<string>("");
  const [data, setData] = useState<typeData[]>([]);
  const [selected, setSelected] = useState<typeData[]>([]);
  const [SCHEDULEID, setSCHEDULEID] = useState<string>("");
  const [goalItems, setGoalItems] = useState<{ ID: string; NAME: string }[]>(
    []
  );
  const [planItems, setPlanItems] = useState<{ ID: string; NAME: string }[]>(
    []
  );
  //
  const inputFormItem: {
    name: string;
    kind: string;
    items: { ID: string; NAME: string }[];
  }[] = [
    { name: "目標名", kind: "select", items: goalItems },
    { name: "計画名", kind: "select", items: planItems },
    { name: "日付", kind: "text", items: [] },
    { name: "開始時間", kind: "text", items: [] },
    { name: "終了時間", kind: "text", items: [] },
  ];
  //function
  const getData = async () => {
    const url = "http://localhost:8080/AppSchd/Schedule/ScheduleList";
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
  const getPlanItems = async () => {
    const url = `http://localhost:8080/AppSchd/Record/RecordPlan/RecordPlanItems`;
    const params = new URLSearchParams({ GOALID: inputFormValues[0] });
    const res = await axios.get(url, { params: params });
    setPlanItems(res.data.getData);
  };
  const execDML = async () => {
    let url = "";
    const params = new URLSearchParams();
    params.append("PLANID", inputFormValues[1]);
    params.append("SCHEDULEDATE", inputFormValues[2]);
    params.append("SCHEDULESTARTTIME", inputFormValues[3]);
    params.append("SCHEDULEENDTIME", inputFormValues[4]);
    if (SCHEDULEID === "" && buttonName === "確定") {
      url = "http://localhost:8080/AppSchd/Schedule/ScheduleINSERT";
    } else if (SCHEDULEID !== "" && buttonName === "更新") {
      url = "http://localhost:8080/AppSchd/Schedule/ScheduleUPDATE";
      params.append("SCHEDULEID", SCHEDULEID);
    }
    const res = await axios.post(url, params);
    setButtonName("確定");
    setInputFormValues(["", "", `${y}-${m}-${d}`, `${h}:${mm}`, `${h}:${mm}`]);
    getData();
  };
  //useEffect
  useEffect(() => {
    getData();
    getGoalItems();
    getPlanItems();
  }, []);
  useEffect(() => {
    if (inputFormValues[0] === "") {
      setPlanItems([]);
    } else {
      getPlanItems();
    }
  }, [inputFormValues[0]]);
  useEffect(() => {
    if (contextmenuStatus === "新規") {
      setButtonName("確定");
      setInputFormValues([
        "",
        "",
        `${y}-${m}-${d}`,
        `${h}:${mm}`,
        `${h}:${mm}`,
      ]);
      setSCHEDULEID("");
    } else if (contextmenuStatus === "更新") {
      setButtonName("更新");
      if (selected !== undefined) {
        setInputFormValues([
          selected[0].GOALID,
          selected[0].PLANID,
          selected[0].SCHEDULEDATE,
          selected[0].SCHEDULESTARTTIME,
          selected[0].SCHEDULEENDTIME,
        ]);
        console.log(inputFormValues);
        setSCHEDULEID(selected[0].SCHEDULEID);
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

export default S_ScheduleList;
