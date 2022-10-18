import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import S_AppSchd from "../S_AppSchd";
import S_DataTable from "../S_DataTable";
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
const S_StorageBin = () => {
  //const
  const dataTableName = "▼収納箱データ";
  const dataTableItems: { name: string; display: string }[] = [
    { name: "COL_KEY", display: "none" },
    { name: "項目", display: "visible" },
    { name: "名前", display: "visible" },
    { name: "備考1", display: "visible" },
    { name: "備考2", display: "visible" },
    { name: "更新日", display: "visible" },
  ];
  const contextmenuItems: { name: string }[] = [
    { name: "復元" },
    { name: "完全削除" },
  ];
  const searchFormItem: { name: string }[] = [{ name: "キー" }];
  //type
  type typeData = {
    COL_KEY: string;
    COL_ITEM: string;
    COL_NAME: string;
    COL_REMARK1: string;
    COL_REMARK2: string;
    COL_UPDATEDATE: string;
  };
  //useState
  const [searchFormValues, setSearchFormValues] = useState<string[]>([""]);
  const [contextmenuStatus, setContextmenuStatus] = useState<string>("");
  const [data, setData] = useState<typeData[]>([]);
  const [selected, setSelected] = useState<typeData[]>([]);
  const [COL_ID, setCOL_ID] = useState<string>("");
  //function
  const getData = async () => {
    const url = "http://localhost:8080/AppSchd/Bin/StorageBin";
    const params = new URLSearchParams({ KEYWORD: searchFormValues[0] });
    const res = await axios.get(url, { params: params });
    setData(res.data.getData);
  };
  //useEffect
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (contextmenuStatus === "新規") {
    } else if (contextmenuStatus === "更新") {
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

export default S_StorageBin;
