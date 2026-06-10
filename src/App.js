import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "./providers/QueryProvider";
import AuthProvider from "./providers/AuthProvider";
import ThemeProvider from "./providers/ThemeProvider";
import NotificationProvider from "./providers/NotificationProvider";
import AppRoutes from "./routes/AppRoutes";
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsx(QueryProvider, { children: _jsx(AuthProvider, { children: _jsx(ThemeProvider, { children: _jsx(NotificationProvider, { children: _jsx(AppRoutes, {}) }) }) }) }) }));
}
