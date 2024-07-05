import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './output.css';
import Root from "./components/Root";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginScreen from './routes/LoginScreen';
import HomeScreen from './routes/HomeScreen';
import NotFoundScreen from './routes/NotFoundScreen';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import WordsScreen from './routes/WordsScreen';
import QuizScreen from './routes/QuizScreen';
import SettingsScreen from './routes/SettingsScreen';
import GameScreen from './routes/GameScreen';
import StatisticsScreen from './routes/StatisticsScreen';
import AccountScreen from './routes/AccountScreen';
let proxy = "/proxy/3000"
const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundScreen />
  },
  {
    path: proxy + "/login",
    element: <LoginScreen />,
  },
  {
    path: proxy + "/game/:gameType/:category",
    element: <GameScreen />,
  },
  {
    path: proxy + "/",
    element: <Root/>,
    children: [
      {
        // path: proxy + "/home",
        index: true,
        element: <HomeScreen />
      },
      {
        path: proxy + "/words",
        element: <WordsScreen />
      },
      {
        path: proxy + "/quiz",
        element: <QuizScreen />
      },
      {
        path: proxy + "/settings",
        element: <SettingsScreen />
      },
      {
        path: proxy + "/statistics",
        element: <StatisticsScreen />
      },
      {
        path: proxy + "/account",
        element: <AccountScreen />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <NextUIProvider>
    <NextThemesProvider attribute='class' enableSystem={true} enableColorScheme = {true}>
      {/* <Root> */}
        <RouterProvider router={router} />
      {/* </Root> */}
    </NextThemesProvider>
  </NextUIProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
