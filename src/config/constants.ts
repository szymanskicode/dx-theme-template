import { Task } from "../types/task";
import { User } from "../types/users";

export const APP_TITLE = "QWall by QSense";

export const DEFAULT_USER_IMG_URL = "https://www.thetonyrobbinsfoundation.org/wp-content/uploads/2017/09/Cool-avatars-anonymous-avatar-300x300.jpg";

export const PRIORITY_ITEMS = ["Low", "Normal", "High"];
export const STATUS_ITEMS = ["Open", "In Progress", "Deferred", "Completed"];

export const ANALYTICS_PERIODS = {
  Week: {
    period: "2020-01-24/2020-01-31",
    index: 0,
  },
  "2 Weeks": {
    period: "2020-01-14/2020-01-31",
    index: 1,
  },
  Month: {
    period: "2020-01-01/2020-02-01",
    index: 2,
  },
  Year: {
    period: "2020-01-01/2021-01-01",
    index: 3,
  },
  All: {
    period: "2018-01-01/2022-01-01",
    index: 4,
  },
};

export const DEFAULT_ANALYTICS_PERIOD_KEY = "All";

export const USER_STATUS_LIST = ["Salaried", "Commission", "Terminated"];

export const newTask: Task = {
  id: 0,
  text: "",
  description: "",
  company: "",
  priority: "Low",
  startDate: new Date(),
  dueDate: new Date(),
  owner: "",
  status: "Open",
  activities: [],
  notes: [],
  messages: [],
  parentId: 0,
  progress: 0,
};

export const newUser: User = {
  id: 0,
  name: "",
  address: "",
  firstName: "",
  lastName: "",
  status: "Salaried",
  position: "",
  manager: "",
  company: "",
  city: "",
  state: {
    stateShort: "",
  },
  zipCode: 0,
  phone: "",
  email: "",
  image: "",
  activities: [],
  opportunities: [],
  tasks: [],
};
