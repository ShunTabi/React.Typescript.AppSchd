import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import S_BinStorage from "./components/AppSchd/Bin/S_BinStorage";
import S_NoteList from "./components/AppSchd/Note/S_NoteList";
import S_NoteRecord from "./components/AppSchd/Note/S_NoteRecord";
import S_RecordGenre from "./components/AppSchd/Record/S_RecordGenre";
import S_RecordGoal from "./components/AppSchd/Record/S_RecordGoal";
import S_RecordPlan from "./components/AppSchd/Record/S_RecordPlan";
import S_ScheduleList from "./components/AppSchd/Schedule/S_ScheduleList";
import S_ScheduleOneDay from "./components/AppSchd/Schedule/S_ScheduleOneDay";
import S_ScheduleWeek from "./components/AppSchd/Schedule/S_ScheduleWeek";
import S_ToDoDone from "./components/AppSchd/ToDo/S_ToDoDone";
import S_ToDoToDo from "./components/AppSchd/ToDo/S_ToDoToDo";

//CSS in JS
const Div001 = styled.div``;
const App = () => {
  return (
    <Div001>
      <BrowserRouter>
        <Routes>
          <Route path="/"></Route>
          <Route path="/AppSchd">
            <Route path="Record">
              <Route path="RecordGenre" element={<S_RecordGenre />}></Route>
              <Route path="RecordGoal" element={<S_RecordGoal />}></Route>
              <Route path="RecordPlan" element={<S_RecordPlan />}></Route>
            </Route>
            <Route path="Schedule">
              <Route
                path="ScheduleOneDay"
                element={<S_ScheduleOneDay />}
              ></Route>
              <Route path="ScheduleWeek" element={<S_ScheduleWeek />}></Route>
              <Route path="ScheduleList" element={<S_ScheduleList />}></Route>
            </Route>
            <Route path="ToDo">
              <Route path="ToDoToDo" element={<S_ToDoToDo />}></Route>
              <Route path="ToDoDone" element={<S_ToDoDone />}></Route>
            </Route>
            <Route path="Note">
              <Route path="NoteRecord" element={<S_NoteRecord />}></Route>
              <Route path="NoteList" element={<S_NoteList />}></Route>
            </Route>
            <Route path="Analysis">
              <Route path="AnalysisChart"></Route>
            </Route>
            <Route path="Bin">
              <Route path="BinStorage" element={<S_BinStorage />}></Route>
            </Route>
          </Route>
          <Route path="*" element={<h1>NoFound</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </Div001>
  );
};

export default App;
