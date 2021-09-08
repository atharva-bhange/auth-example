import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";

import Navigation from "components/Navigation";

const queryClient = new QueryClient();

function App() {
	return (
		<div>
			<QueryClientProvider client={queryClient}>
				<Navigation />
			</QueryClientProvider>
		</div>
	);
}

export default App;
