import { useSelector } from "react-redux";
import { IRootState } from "../store";
import LandingPage from "./LandingPage";
import Tester from "./Tester";
import ManagerProject from "./ManagerProjects";
import Manager from "./Manager";
import TestingProject from "./TestingProject";
import ProjectData from "./ProjectData";
import ManagerSelect from "./ManagerSelect";
import ManagerEditProjectList from "./ManagerEditProjectList";
import GoBack from "../components/GoBack";
import ManagerEditProject from "./ManagerEditProject";

export type RouteComponentType = {
  component: (props?: any) => JSX.Element;
  goBackRoute?: RouteIdType;
};

export type RouteIdType =
  | "landing-page"
  | "tester-index"
  | "manager-password"
  | "manager-index"
  | "testing-project"
  | "project-data"
  | "manager-select"
  | "manager-edit"
  | "manager-edit-project";

const ROUTES_MAP: { [key in RouteIdType]: RouteComponentType } = {
  "landing-page": {
    component: LandingPage,
  },
  "tester-index": {
    component: Tester,
    goBackRoute: "landing-page",
  },
  "manager-password": {
    component: Manager,
    goBackRoute: "landing-page",
  },
  "manager-index": {
    component: ManagerProject,
    goBackRoute: "manager-select",
  },
  "testing-project": {
    component: TestingProject
  },
  "project-data": {
    component: ProjectData,
    goBackRoute: "manager-index",
  },
  "manager-select": {
    component: ManagerSelect,
    goBackRoute: "manager-password",
  },
  "manager-edit": {
    component: ManagerEditProjectList,
    goBackRoute: "manager-select",
  },
  "manager-edit-project": {
    component: ManagerEditProject,
    goBackRoute: "manager-edit",
  }
};

export default function Router() {
  const currentRoute = useSelector(
    (state: IRootState) => state.routerSlice.currentRoute
  );
  const Component = ROUTES_MAP[currentRoute.id].component;
  const goBackRoute = ROUTES_MAP[currentRoute.id].goBackRoute;
  const props = currentRoute.props;

  return (
    <>
      {goBackRoute ? (
        <GoBack backTo={goBackRoute}>
          <Component {...props} />
        </GoBack>
      ) : (
        <Component {...props} />
      )}
    </>
  );
}
