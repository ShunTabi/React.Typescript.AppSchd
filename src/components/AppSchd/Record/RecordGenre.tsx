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
const RecordGenre = () => {
  //const
  const inputFormName = "▼種別フォーム";
  const dataTableName = "▼種別データ";
  const dataTableItems: { name: string; display: string }[] = [
    { name: "GENREID", display: "none" },
    { name: "種別名", display: "visible" },
    { name: "更新日", display: "visible" },
  ];
  const contextmenuItems: { name: string }[] = [
    { name: "新規" },
    { name: "更新" },
    { name: "収納箱へ" },
    { name: "ゴミ箱へ" },
  ];
  const searchFormItem: { name: string }[] = [{ name: "種別名" }];
  //type
  type typeData = {
    GENREID: string;
    GENRENAME: string;
    GENREUPDATEDATE: string;
  };
  //useState
  const [inputFormValues, setInputFormValues] = useState<string[]>([""]);
  const [searchFormValues, setSearchFormValues] = useState<string[]>([""]);
  const [buttonName, setButtonName] = useState<string>("確定");
  const [contextmenuStatus, setContextmenuStatus] = useState<string>("");
  const [data, setData] = useState<typeData[]>([]);
  const [selected, setSelected] = useState<typeData[]>([]);
  const [GENREID, setGENREID] = useState<string>("");
  //
  const inputFormItem: {
    name: string;
    kind: string;
    items: { ID: string; NAME: string }[];
  }[] = [{ name: "種別名", kind: "text", items: [] }];

  //function
  const getData = async () => {
    const url = "http://localhost:8080/AppSchd/Record/RecordGenre";
    const params = new URLSearchParams({ GENRENAME: searchFormValues[0] });
    const res = await axios.get(url, { params: params });
    setData(res.data.getData);
  };
  const execDML = async () => {
    let url = "";
    const params = new URLSearchParams();
    params.append("GENRENAME", inputFormValues[0]);
    if (GENREID === "" && buttonName === "確定") {
      url =
        "http://localhost:8080/AppSchd/Record/RecordGenre/RecordGenreINSERT";
    } else if (GENREID !== "" && buttonName === "更新") {
      url =
        "http://localhost:8080/AppSchd/Record/RecordGenre/RecordGenreUPDATE";
      params.append("GENREID", GENREID);
    }
    const res = await axios.post(url, params);
    setButtonName("確定");
    setInputFormValues([""]);
    getData();
  };
  //useEffect
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (contextmenuStatus === "新規") {
      setButtonName("確定");
      setInputFormValues([""]);
      setGENREID("");
    } else if (contextmenuStatus === "更新") {
      setButtonName("更新");
      if (selected !== undefined) {
        setInputFormValues([selected[0].GENRENAME]);
        setGENREID(selected[0].GENREID);
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

export default RecordGenre;
