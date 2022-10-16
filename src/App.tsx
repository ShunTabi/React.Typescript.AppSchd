import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import NotFound from "./components/AppSchd/NotFound";
import RecordGenre from "./components/AppSchd/Record/RecordGenre";
import RecordGoal from "./components/AppSchd/Record/RecordGoal";
import RecordPlan from "./components/AppSchd/Record/RecordPlan";
import ScheduleOneDay from "./components/AppSchd/Schedule/ScheduleOneDay";
import ScheduleList from "./components/AppSchd/Schedule/ScheduleList";
import ToDoDone from "./components/AppSchd/ToDo/Done";
import ToDoToDo from "./components/AppSchd/ToDo/ToDo";
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
              <Route path="RecordGenre" element={<RecordGenre />}></Route>
              <Route path="RecordGoal" element={<RecordGoal />}></Route>
              <Route path="RecordPlan" element={<RecordPlan />}></Route>
            </Route>
            <Route path="Schedule">
              <Route path="ScheduleOneDay" element={<ScheduleOneDay />}></Route>
              <Route path="ScheduleWeek"></Route>
              <Route path="ScheduleList" element={<ScheduleList />}></Route>
            </Route>
            <Route path="ToDo">
              <Route path="ToDo" element={<ToDoToDo />}></Route>
              <Route path="Done" element={<ToDoDone />}></Route>
            </Route>
            <Route path="Bin">
              <Route path="StorageBin"></Route>
              <Route path="RecycleBin"></Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Div001>
  );
}

export default App;
