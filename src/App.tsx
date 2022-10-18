import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import B_SearchBook from "./components/AppBook/SearchBook/B_SearchBook";
import B_SearchMyBook from "./components/AppBook/SearchMyBook/B_SearchMyBook";
import S_RecycleBin from "./components/AppSchd/Bin/S_RecycleBin";
import S_StorageBin from "./components/AppSchd/Bin/S_StorageBin";
import S_RecordGenre from "./components/AppSchd/Record/S_RecordGenre";
import S_RecordGoal from "./components/AppSchd/Record/S_RecordGoal";
import S_RecordPlan from "./components/AppSchd/Record/S_RecordPlan";
import S_ScheduleList from "./components/AppSchd/Schedule/S_ScheduleList";
import S_ScheduleOneDay from "./components/AppSchd/Schedule/S_ScheduleOneDay";
import S_ToDoDone from "./components/AppSchd/ToDo/Done";
import S_ToDoToDo from "./components/AppSchd/ToDo/ToDo";
import NotFound from "./components/NotFound";
//CSS in JS
const Div001 = styled.div`
  user-select: none;
  width: 100%;
  font-size: 12px;
`;
function App() {
  return (
    <Div001 className="App">
      <BrowserRouter>
        <Routes>
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
              <Route path="ScheduleWeek"></Route>
              <Route path="ScheduleList" element={<S_ScheduleList />}></Route>
            </Route>
            <Route path="ToDo">
              <Route path="ToDo" element={<S_ToDoToDo />}></Route>
              <Route path="Done" element={<S_ToDoDone />}></Route>
            </Route>
            <Route path="Bin">
              <Route path="StorageBin" element={<S_StorageBin />}></Route>
              <Route path="RecycleBin" element={<S_RecycleBin />}></Route>
            </Route>
          </Route>
          <Route path="/AppBook">
            <Route path="SearchBook" element={<B_SearchBook />}></Route>
            <Route path="SearchMyBook" element={<B_SearchMyBook />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Div001>
  );
}

export default App;
