import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AppSchd from "../AppSchd";
import DataTable from "../DataTable";
import InputForm from "../InputForm";
import SearchForm from "../SearchForm";

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
const ToDoDone = () => {
  //const
  const inputFormName = "▼Doneフォーム";
  const dataTableName = "▼Doneデータ";
  const dataTableItems: { name: string; display: string }[] = [
    { name: "TODOID", display: "none" },
    { name: "GOALID", display: "none" },
    { name: "目標名", display: "visible" },
    { name: "PLANID", display: "none" },
    { name: "計画名", display: "visible" },
    { name: "ToDo名", display: "visible" },
    { name: "STATUSID", display: "none" },
    { name: "進捗", display: "visible" },
    { name: "完了日", display: "visible" },
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
  const [TODOID, setTODOID] = useState<string>("");
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
    { name: "ToDo名", kind: "text", items: [] },
    { name: "完了日", kind: "text", items: [] },
  ];
  //function
  const getData = async () => {
    const url = "http://localhost:8080/AppSchd/ToDo/ToDoDone";
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
    params.append("TODONAME", inputFormValues[2]);
    params.append("TODOENDDATE", inputFormValues[3]);
    if (TODOID === "" && buttonName === "確定") {
      url = "http://localhost:8080/AppSchd/ToDo/ToDoINSERT";
    } else if (TODOID !== "" && buttonName === "更新") {
      url = "http://localhost:8080/AppSchd/ToDo/ToDoUPDATE";
      params.append("TODOID", TODOID);
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
      setInputFormValues(["", "", "", `${y}-${m}-${d}`]);
      setTODOID("");
    } else if (contextmenuStatus === "更新") {
      setButtonName("更新");
      if (selected !== undefined) {
        setInputFormValues([
          selected[0].GOALID,
          selected[0].PLANID,
          selected[0].TODONAME,
          selected[0].TODOENDDATE,
        ]);
        console.log(inputFormValues);
        setTODOID(selected[0].TODOID);
      }
    } else if (contextmenuStatus === "収納箱へ") {
    } else if (contextmenuStatus === "ゴミ箱へ") {
    }
    setContextmenuStatus("");
  }, [contextmenuStatus]);

  return (
    <Div001>
      <Div002>
        <AppSchd />
      </Div002>
      <Div003>
        <InputForm
          inputFormItem={inputFormItem}
          inputFormValues={inputFormValues}
          setInputFormValues={setInputFormValues}
          buttonName={buttonName}
          inputFormName={inputFormName}
          execDML={execDML}
        />
        <SearchForm
          searchFormItem={searchFormItem}
          searchFormValues={searchFormValues}
          setSearchFormValues={setSearchFormValues}
          getData={getData}
        />
      </Div003>
      <Div004>
        <DataTable
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

export default ToDoDone;
