import { AppProvider } from "./provider";
import { AppRouter } from "./router";
import '../App.css'

export const App = () => {
    return (
      <AppProvider>
        <AppRouter />
      </AppProvider>
    );
  };