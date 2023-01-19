import { useSelector } from "react-redux";
import { IRootState } from "../store";
import LandingPage from "./LandingPage";
import Tester from "./Tester";
import ManagerProject from "./ManagerProjects";
import Manager from "./Manager";
import TestingProject from "./TestingProject";
import ProjectData from "./ProjectData";

export type RouteComponentType = {
    component: (props?: any) => JSX.Element;
  };
  
export type RouteIdType = "landing-page" | "tester-index" | "manager-password" | "manager-index" | "testing-project" | "project-data";

const ROUTES_MAP: { [key in RouteIdType]: RouteComponentType } = {
    "landing-page": {
        component: LandingPage,
    },
    "tester-index": {
        component: Tester,
    },
    "manager-password": {
        component: Manager,
    },
    "manager-index": {
        component: ManagerProject,
    },
    "testing-project": {
        component: TestingProject,
    },
    "project-data": {
        component: ProjectData,
    },
};

export default function Router() {
    const currentRoute = useSelector((state: IRootState) => state.routerSlice.currentRoute);
    const Component = ROUTES_MAP[currentRoute.id].component;
    const props = currentRoute.props;

    return <Component {...props} />;
}