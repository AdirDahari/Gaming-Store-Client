import { useEffect, useState } from "react";
import "./App.css";
import Layout from "./layout/Layout";
import useAutoLogin from "./hooks/useAutoLogin";
import Router from "./router/Router";
import { ToastContainer } from "react-toastify";

function App() {
  const [doneAuth, setDoneAuth] = useState(false);
  const autoLogin = useAutoLogin();
  useEffect(() => {
    (async () => {
      try {
        await autoLogin();
      } catch (err) {
        console.log("Something wrong, Please try again later", err);
      } finally {
        setDoneAuth(true);
      }
    })();
  }, []);

  return (
    <Layout>
      <ToastContainer />
      {doneAuth ? <Router /> : <div></div>}
    </Layout>
  );
}

export default App;
