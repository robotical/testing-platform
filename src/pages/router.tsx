import { useSelector } from "react-redux";
import { IRootState } from "../store";
import LandingPage from "./LandingPage";
import Tester from "./Tester";
import TestingProject from "./TestingProject";

export type RouteComponentType = {
    component: (props?: any) => JSX.Element;
  };
  
export type RouteIdType = "landing-page" | "tester-index" | "manager-index" | "testing-project";

const ROUTES_MAP: { [key in RouteIdType]: RouteComponentType } = {
    "landing-page": {
        component: LandingPage,
    },
    "tester-index": {
        component: Tester,
    },
    "manager-index": {
        component: Tester,
    },
    "testing-project": {
        component: TestingProject,
    },
};

export default function Router() {
    const currentRoute = useSelector((state: IRootState) => state.routerSlice.currentRoute);
    const Component = ROUTES_MAP[currentRoute.id].component;
    const props = currentRoute.props;

    return <Component {...props} />;
}