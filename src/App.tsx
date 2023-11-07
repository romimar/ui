import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeviceList from "./components/device-list/DeviceList";
import DeviceListGrid from "./components/device-list-grid/DeviceListGrid";
import Card from "./components/card/Card";
  
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="grid" element={<DeviceListGrid />} />
                <Route path="device" element={<Card />} />
                <Route path="/" element={<DeviceList />}>
                    <Route path=":device" element={<Card />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
  
export default App;
