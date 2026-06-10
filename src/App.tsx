import { BrowserRouter } from "react-router-dom";
import QueryProvider from "./providers/QueryProvider";
import AuthProvider from "./providers/AuthProvider";
import ThemeProvider from "./providers/ThemeProvider";
import NotificationProvider from "./providers/NotificationProvider";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <ThemeProvider>
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}
