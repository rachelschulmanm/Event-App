import { createBrowserRouter } from "react-router-dom";
import MaterialUIPickers from "../components/DatePicker";
import ButtonAppBar from "../components/ButtonAppBar";
import FlowerDesign from "../components/FlowerDesign";
import SittingPlan from "../components/SittingPlan";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <ButtonAppBar></ButtonAppBar>,
    children: [
      {
        path: "/datePicker",
        element: <MaterialUIPickers></MaterialUIPickers>,
      },
      {
        path: "/sittingPlan",
        element: <SittingPlan></SittingPlan>,
      },
      {
        path: "/flowerDesign",
        element: <FlowerDesign></FlowerDesign>,
      },
    ],
  },
]);
