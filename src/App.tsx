import { RouterProvider } from "react-router-dom"
import { router } from "./routers"
// import FieldInput from"@/components/

export function App() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
