import { ReactHookForm } from "./components/react-hook-form";
import { ReactHookFormEdit } from "./components/react-hook-form-edit";

function App() {
  return (
    <div className="flex flex-col gap-2">
      <ReactHookForm />
      <ReactHookFormEdit />
    </div>
  );
}

export default App;
