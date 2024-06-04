import { useEffect, useState, useCallback } from "react";

import { getUser } from "../../../api/user";
import { handleError } from "../../../utils/handle-error";

import "./UserPanel.scss";

import { User } from "../../../types/users";
import { withLoadPanel } from "../../../utils/withLoadPanel";

import { UserPanelDetails } from "./UserPanelDetails";

const UserPanelWithLoadPanel = withLoadPanel(UserPanelDetails);

export const UserPanel = ({
  userId,
  isOpened,
  changePanelOpened,
  changePanelPinned,
}: {
  userId: number | null;
  isOpened: boolean;
  changePanelOpened: (value: boolean) => void;
  changePanelPinned: () => void;
}) => {
  const [data, setData] = useState<User>();

  const loadData = useCallback(() => {
    if (!userId) return;

    getUser()
      .then((data) => {
        const mockData = {
          id: 22,
          name: "John",
          status: "UserStatus",
          city: "Wrocław",
          state: "dolnośląski",
          zipCode: "00-000",
          activities: [],
          opportunities: [],
          tasks: [],
          address: "Example street",
          firstName: "John",
          lastName: "Doe",
          position: "CEO",
          manager: "Teresa Williams",
          company: "QSense",
          phone: "(+48) 123-123-123",
          email: "jd@example.com",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
        };

        setData(mockData as unknown as User);
      })
      .catch((error) =>
        handleError({
          comment: "Failed to getUser in UserPanel", //
          error,
          showToast: false,
          isTrackable: false,
        })
      );
  }, [userId]);

  const onDataChanged = useCallback((data: any) => {
    setData(data);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <UserPanelWithLoadPanel
      user={data}
      hasData={!!data}
      isOpened={isOpened}
      onDataChanged={onDataChanged}
      changePanelOpened={changePanelOpened}
      changePanelPinned={changePanelPinned}
      panelProps={{
        position: { of: ".panel" },
        container: ".panel",
      }}
    />
  );
};
