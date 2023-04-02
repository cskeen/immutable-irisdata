import React from "react";
import {Routes, Route} from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import Home from "./pages/Home";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

const theme = createTheme({
  // Customize the theme here
});

function App() {
  const methods = useForm();

  return (
    <FormProvider {...methods} >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
              <Routes>
                <Route index element={<Home />} />
              </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </FormProvider>
  );
}

export default App;
