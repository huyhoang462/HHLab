import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/home";
import Todo from "./pages/Todo";
import Pomodoro from "./pages/Pomodoro/Pomodoro";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route element={<Home />} path="/" />
            <Route element={<Todo />} path="/todo" />
            <Route element={<Pomodoro />} path="/pomodoro" />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
