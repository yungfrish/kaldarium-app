import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

import { Main } from "./Main";
import "moment";
import "moment/locale/de"; // language must match config

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
