import { Activities } from "./card-activities";
import { Task } from "./task";
import { Opportunities } from "./card-opportunities";
import { USER_STATUS_LIST } from "../config/constants";

export type UserStatus = (typeof USER_STATUS_LIST)[number];

interface State {
  stateShort: string;
}

export interface User {
  id: number;
  name: string;
  status: UserStatus;
  city: string;
  state: State;
  zipCode: number;
  activities: Activities;
  opportunities: Opportunities;
  tasks: Task[];
  address: string;
  firstName: string;
  lastName: string;
  position: string;
  manager: string;
  company: string;
  phone: string;
  email: string;
  image: string;
}
