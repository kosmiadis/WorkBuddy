import { RouterProvider } from "react-router-dom"
import router from "./routes"
import Provider from "./Provider"

function App() {
    return <Provider>
        <RouterProvider router={router} />
    </Provider>
    
}

export default App
