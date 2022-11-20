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
  { name: "GENREID", display: "none", type: "normal" },
  { name: "種別名", display: "visible", type: "normal" },
  { name: "更新日", display: "visible", type: "normal" },
];
const tableName: string = "種別データ";
const S_RecordGenre = () => {
  //type
  type dataType = {
    GENREID: string;
    GENRENAME: string;
    GENREUPDATEDATE: string;
  }[];
  //useState
  const [inputValues, setInputValues] = useState<string[]>([""]);
  const [searchValues, setSearchValues] = useState<string[]>([""]);
  const [buttonName, setButtonName] = useState("確定");
  const [data, setData] = useState<dataType>([]);
  //const [selected, setSelected] = useState<dataType>([]);
  const [GENREID, setGENREID] = useState<string>("");
  const [contextmenuItems, setContextmenuItems] = useState<
    {
      img: string;
      name: string;
      func: Function;
    }[]
  >([]);
  //function
  const Clearing = () => {
    setButtonName("確定");
    setInputValues([""]);
    setGENREID("");
    //setSelected([]);
  };
  const selectValues = async () => {
    const url = "http://localhost:8080/AppSchd/Record/RecordGenre";
    const params = new URLSearchParams({ GENRENAME: searchValues[0] });
    const res = await axios.get(url, { params: params });
    setData(res.data.getData);
    if (res.status === 200) {
      console.log(`検索しました【${searchValues}】`);
    } else {
      console.log(res);
    }
    Clearing();
  };
  const dmlExec = async () => {
    let url = "";
    const params = new URLSearchParams();
    params.append("GENRENAME", inputValues[0]);
    if (GENREID === "" && buttonName === "確定") {
      url =
        "http://localhost:8080/AppSchd/Record/RecordGenre/RecordGenreINSERT";
    } else if (GENREID !== "" && buttonName === "更新") {
      url =
        "http://localhost:8080/AppSchd/Record/RecordGenre/RecordGenreUPDATE";
      params.append("GENREID", GENREID);
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
  const dmlExecUPDATEVISIBLE0 = async (item: dataType) => {
    const url =
      "http://localhost:8080/AppSchd/Record/RecordGenre/RecordGenreUPDATEVISIBLESTATUS";
    const params = new URLSearchParams({
      GENREID: item[0].GENREID,
      VISIBLESTATUS: "0",
    });
    const res = await axios.post(url, params);
    if (res.status === 200) {
      selectValues();
      Clearing();
    } else {
      console.log(res);
    }
  };
  const dmlExecUPDATEVISIBLE2 = async (item: dataType) => {
    const url =
      "http://localhost:8080/AppSchd/Record/RecordGenre/RecordGenreUPDATEVISIBLESTATUS";
    const params = new URLSearchParams({
      GENREID: item[0].GENREID,
      VISIBLESTATUS: "2",
    });
    const res = await axios.post(url, params);
    if (res.status === 200) {
      selectValues();
      Clearing();
    } else {
      console.log(res);
    }
  };
  const selectedUpdateItem = (item: dataType) => {
    //setGENREID(selected[0].GENREID);
    //setInputValues([selected[0].GENRENAME]);
    setGENREID(item[0].GENREID);
    setInputValues([item[0].GENRENAME]);
    setButtonName("更新");
  };
  const createContextmenu = (item: dataType) => {
    const box: { img: string; name: string; func: Function }[] = [];
    box.push({ img: "", name: "新規", func: Clearing });
    box.push({ img: "", name: "更新", func: selectedUpdateItem });
    box.push({ img: "", name: "最新化", func: selectValues });
    box.push({ img: "", name: "収納箱へ", func: dmlExecUPDATEVISIBLE2 });
    box.push({ img: "", name: "ゴミ箱へ", func: dmlExecUPDATEVISIBLE0 });
    setContextmenuItems(box);
  };
  //useEffect
  useEffect(() => {
    selectValues();
    console.log("RECORDGENREを読み込みました。");
  }, []);
  //const2
  const inputLabels: {
    name: string;
    type: string;
    box: { ID: string; NAME: string }[];
  }[] = [
    {
      name: "種別名",
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
      name: "種別名",
      type: "text",
      box: [],
    },
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
            //setSelected={setSelected}
            createContextmenu={createContextmenu}
          />
        </Div003>
        <Div004 />
      </Div001>
    </Div000>
  );
};

export default S_RecordGenre;
