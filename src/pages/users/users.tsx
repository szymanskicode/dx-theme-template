import React, { useState, useEffect, useCallback, useRef } from "react";
import { jsPDF as JsPdf } from "jspdf";
import { saveAs } from "file-saver-es";
import { Workbook } from "exceljs";

import "./users.scss";

import DataGrid, {
  Sorting,
  Selection,
  HeaderFilter,
  Scrolling,
  SearchPanel,
  ColumnChooser,
  Export,
  Column,
  Toolbar,
  Item,
  LoadPanel,
  DataGridTypes,
} from "devextreme-react/data-grid";

import SelectBox from "devextreme-react/select-box";
import TextBox from "devextreme-react/text-box";
import Button from "devextreme-react/button";
import DropDownButton, { DropDownButtonTypes } from "devextreme-react/drop-down-button";

import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import { exportDataGrid as exportDataGridToXLSX } from "devextreme/excel_exporter";

import { UserStatus as UserStatusType, User } from "../../types/users";

import { FormPopup, UserNewForm, UserPanel } from "../../components";
import { UserStatus } from "../../components";

import { USER_STATUS_LIST, newUser } from "../../config/constants";
import DataSource from "devextreme/data/data_source";
import notify from "devextreme/ui/notify";

const getUsers = () =>
  new Promise<any[]>((resolve, reject) => {
    resolve([
      {
        id: 3,
        name: "Arthur Miller",
        position: "CTO",
        status: "Salaried",
        company: "Super Mart of the West",
        phone: "3105558583",
        email: "arthurm@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 4,
        name: "Robert Reagan",
        position: "CMO",
        status: "Salaried",
        company: "Electronics Depot",
        phone: "8185552387",
        email: "robertr@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 5,
        name: "Greta Sims",
        position: "HR Manager",
        status: "Salaried",
        company: "K&S Music",
        phone: "8185556546",
        email: "gretas@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 6,
        name: "Brett Wade",
        position: "IT Manager",
        status: "Salaried",
        company: "Tom's Club",
        phone: "6265550358",
        email: "brettw@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 7,
        name: "Sandra Johnson",
        position: "Controller",
        status: "Salaried",
        company: "E-Mart",
        phone: "5625552082",
        email: "sandraj@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 8,
        name: "Ed Holmes",
        position: "Sales Manager",
        status: "Salaried",
        company: "Walters",
        phone: "3105551288",
        email: "edwardh@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 9,
        name: "Barb Banks",
        position: "Support Manager",
        status: "Salaried",
        company: "StereoShack",
        phone: "3105553355",
        email: "barbarab@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 10,
        name: "Kevin Carter",
        position: "Shipping Manager",
        status: "Salaried",
        company: "Circuit Town",
        phone: "2135552840",
        email: "kevinc@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 11,
        name: "Cindy Stanwick",
        position: "HR Assistant",
        status: "Salaried",
        company: "Premier Buy",
        phone: "8185556655",
        email: "cindys@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 12,
        name: "Sammy Hill",
        position: "Sales Assistant",
        status: "Salaried",
        company: "ElectrixMax",
        phone: "6265557292",
        email: "sammyh@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 13,
        name: "Davey Jones",
        position: "Shipping Assistant",
        status: "Salaried",
        company: "Video Emporium",
        phone: "6265550281",
        email: "davidj@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 14,
        name: "Victor Norris",
        position: "Shipping Assistant",
        status: "Salaried",
        company: "Screen Shop",
        phone: "2135559278",
        email: "victorn@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 15,
        name: "Mary Stern",
        position: "Shipping Assistant",
        status: "Salaried",
        company: "Braeburn",
        phone: "8185557857",
        email: "marys@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 16,
        name: "Robin Cosworth",
        position: "Shipping Assistant",
        status: "Salaried",
        company: "PriceCo",
        phone: "8185550942",
        email: "robinc@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 17,
        name: "Kelly Rodriguez",
        position: "Support Assistant",
        status: "Salaried",
        company: "Ultimate Gadget",
        phone: "8185559248",
        email: "kellyr@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 18,
        name: "James Anderson",
        position: "Support Assistant",
        status: "Salaried",
        company: "EZ Stop",
        phone: "3235554702",
        email: "jamesa@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 19,
        name: "Antony Remmen",
        position: "Support Assistant",
        status: "Salaried",
        company: "Clicker",
        phone: "3105556625",
        email: "anthonyr@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 20,
        name: "Olivia Peyton",
        position: "Sales Assistant",
        status: "Salaried",
        company: "Store of America",
        phone: "3105552728",
        email: "oliviap@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 21,
        name: "Taylor Riley",
        position: "Network Admin",
        status: "Salaried",
        company: "Zone Toys",
        phone: "3105557276",
        email: "taylorr@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 22,
        name: "Amelia Harper",
        position: "Network Admin",
        status: "Salaried",
        company: "ACME",
        phone: "2135554276",
        email: "ameliah@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 23,
        name: "Wally Hobbs",
        position: "Programmer",
        status: "Salaried",
        company: "Super Mart of the West",
        phone: "8185558872",
        email: "wallyh@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 24,
        name: "Brad Jameson",
        position: "Programmer",
        status: "Salaried",
        company: "Electronics Depot",
        phone: "8185554646",
        email: "bradleyj@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 25,
        name: "Karen Goodson",
        position: "Programmer",
        status: "Salaried",
        company: "K&S Music",
        phone: "6265550908",
        email: "kareng@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 26,
        name: "Marcus Orbison",
        position: "Travel Coordinator",
        status: "Salaried",
        company: "Tom's Club",
        phone: "2135557098",
        email: "marcuso@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 27,
        name: "Sandy Bright",
        position: "Benefits Coordinator",
        status: "Salaried",
        company: "E-Mart",
        phone: "8185550524",
        email: "sandrab@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 28,
        name: "Morgan Kennedy",
        position: "Graphic Designer",
        status: "Salaried",
        company: "Walters",
        phone: "8185558238",
        email: "morgank@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 29,
        name: "Violet Bailey",
        position: "Jr Graphic Designer",
        status: "Salaried",
        company: "StereoShack",
        phone: "8185552478",
        email: "violetb@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 30,
        name: "Ken Samuelson",
        position: "Ombudsman",
        status: "Salaried",
        company: "Circuit Town",
        phone: "5625559282",
        email: "kents@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 31,
        name: "Nat Maguiree",
        position: "Trainer",
        status: "Salaried",
        company: "Premier Buy",
        phone: "5625558377",
        email: "nataliem@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 32,
        name: "Bart Arnaz",
        position: "Director of Engineering",
        status: "Salaried",
        company: "ElectrixMax",
        phone: "7145552000",
        email: "barta@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 33,
        name: "Leah Simpson",
        position: "Test Coordinator",
        status: "Salaried",
        company: "Video Emporium",
        phone: "5625595830",
        email: "leahs@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 34,
        name: "Arnie Schwartz",
        position: "Engineer",
        status: "Salaried",
        company: "Screen Shop",
        phone: "7145558882",
        email: "arnolds@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 35,
        name: "Billy Zimmer",
        position: "Engineer",
        status: "Salaried",
        company: "Braeburn",
        phone: "9095556939",
        email: "williamz@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 36,
        name: "Samantha Piper",
        position: "Engineer",
        status: "Salaried",
        company: "PriceCo",
        phone: "3235554512",
        email: "samanthap@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 37,
        name: "Maggie Boxter",
        position: "Engineer",
        status: "Salaried",
        company: "Ultimate Gadget",
        phone: "7145557239",
        email: "margaretb@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 38,
        name: "Terry Bradley",
        position: "QA Engineer",
        status: "Salaried",
        company: "EZ Stop",
        phone: "8055552788",
        email: "terryb@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 39,
        name: "Gabe Jones",
        position: "Retail Coordinator",
        status: "Salaried",
        company: "Clicker",
        phone: "3105555395",
        email: "gabrielj@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 40,
        name: "Lucy Ball",
        position: "Sales Assistant",
        status: "Salaried",
        company: "Store of America",
        phone: "3105553357",
        email: "lucyb@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 41,
        name: "Jim Packard",
        position: "Retail Sales Manager",
        status: "Commission",
        company: "Zone Toys",
        phone: "6615558224",
        email: "jamesp@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 42,
        name: "Hannah Brookly",
        position: "Online Sales Manager",
        status: "Commission",
        company: "ACME",
        phone: "8055553627",
        email: "hannahb@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 43,
        name: "Harv Mudd",
        position: "Retail Sales Manager",
        status: "Commission",
        company: "Super Mart of the West",
        phone: "8315553895",
        email: "harveym@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 44,
        name: "Clark Morgan",
        position: "Retail Sales Manager",
        status: "Commission",
        company: "Electronics Depot",
        phone: "9255552525",
        email: "clarkm@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 45,
        name: "Todd Hoffman",
        position: "Retail Sales Manager",
        status: "Commission",
        company: "K&S Music",
        phone: "9255553579",
        email: "toddh@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 46,
        name: "Jackie Garmin",
        position: "Support Assistant",
        status: "Salaried",
        company: "Tom's Club",
        phone: "2135551824",
        email: "jackg@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 47,
        name: "Lincoln Bartlett",
        position: "Sales Assistant",
        status: "Salaried",
        company: "E-Mart",
        phone: "2135558272",
        email: "lincolnb@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 48,
        name: "Brad Farkus",
        position: "Engineer",
        status: "Terminated",
        company: "Walters",
        phone: "2135553626",
        email: "bradf@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 49,
        name: "Jenny Hobbs",
        position: "Shipping Assistant",
        status: "Terminated",
        company: "StereoShack",
        phone: "3105552668",
        email: "jennyh@dx-email.com",
        assignedTo: "Samantha Bright",
      },
      {
        id: 50,
        name: "Dallas Lou",
        position: "Shipping Assistant",
        status: "Terminated",
        company: "Circuit Town",
        phone: "2135558357",
        email: "dallas@dx-email.com",
        assignedTo: "John Heart",
      },
      {
        id: 51,
        name: "Stu Pizaro",
        position: "Engineer",
        status: "Terminated",
        company: "Premier Buy",
        phone: "2135552552",
        email: "stu@dx-email.com",
        assignedTo: "Samantha Bright",
      },
    ]);
  });

type FilterUserStatus = UserStatusType | "All";

const filterStatusList = ["All", ...USER_STATUS_LIST];

const cellNameRender = (cell: DataGridTypes.ColumnCellTemplateData) => (
  <div className="name-template">
    <div>{cell.data.name}</div>
    <div className="position">{cell.data.position}</div>
  </div>
);

const editCellStatusRender = () => <SelectBox className="cell-info" dataSource={USER_STATUS_LIST} itemRender={UserStatus} fieldRender={fieldRender} />;

const cellPhoneRender = (cell: DataGridTypes.ColumnCellTemplateData) => String(cell.data.phone).replace(/(\d{3})(\d{3})(\d{4})/, "+1($1)$2-$3");

const fieldRender = (text: string) => (
  <>
    <UserStatus text={text} />
    <TextBox readOnly />
  </>
);

const onExporting = (e: DataGridTypes.ExportingEvent) => {
  if (e.format === "pdf") {
    const doc = new JsPdf();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save("Users.pdf");
    });
  } else {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Users");

    exportDataGridToXLSX({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Users.xlsx");
      });
    });
    e.cancel = true;
  }
};

const dropDownOptions = { width: "auto" };
const exportFormats = ["xlsx", "pdf"];

export const Users = () => {
  const [gridDataSource, setGridDataSource] = useState<DataSource<User[], string>>();
  const [isPanelOpened, setPanelOpened] = useState(false);
  const [userId, setUserId] = useState<number>(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [formDataDefaults, setFormDataDefaults] = useState({ ...newUser });
  const gridRef = useRef<DataGrid>(null);

  let newUserData: User;

  useEffect(() => {
    setGridDataSource(
      new DataSource({
        key: "id",
        load: () => getUsers(),
      })
    );
  }, []);

  const changePopupVisibility = useCallback((isVisble: boolean) => {
    setPopupVisible(isVisble);
  }, []);

  const changePanelOpened = useCallback(() => {
    setPanelOpened(!isPanelOpened);
    gridRef.current?.instance.option("focusedRowIndex", -1);
  }, [isPanelOpened]);

  const changePanelPinned = useCallback(() => {
    gridRef.current?.instance.updateDimensions();
  }, []);

  const onAddUserClick = useCallback(() => {
    setPopupVisible(true);
  }, []);

  const onRowClick = useCallback(({ data }: DataGridTypes.RowClickEvent) => {
    setUserId(data.id);
    setPanelOpened(true);
  }, []);

  const [status, setStatus] = useState(filterStatusList[0]);

  const filterByStatus = useCallback((e: DropDownButtonTypes.SelectionChangedEvent) => {
    const { item: status }: { item: FilterUserStatus } = e;
    if (status === "All") {
      gridRef.current?.instance.clearFilter();
    } else {
      gridRef.current?.instance.filter(["status", "=", status]);
    }

    setStatus(status);
  }, []);

  const refresh = useCallback(() => {
    gridRef.current?.instance.refresh();
  }, []);

  const onDataChanged = useCallback((data: any) => {
    newUserData = data;
  }, []);

  const onSaveClick = useCallback(() => {
    notify(
      {
        message: `New user "${newUserData.firstName} ${newUserData.lastName}" saved`,
        position: { at: "bottom center", my: "bottom center" },
      },
      "success"
    );

    setFormDataDefaults({ ...formDataDefaults });
    setPopupVisible(false);
  }, []);

  return (
    <div className="view users-list">
      <div className="view-wrapper view-wrapper-user-list list-page">
        <DataGrid
          className="grid theme-dependent"
          noDataText=""
          focusedRowEnabled
          height="100%"
          dataSource={gridDataSource}
          onRowClick={onRowClick}
          onExporting={onExporting}
          allowColumnReordering
          showBorders
          ref={gridRef}
        >
          <LoadPanel showPane={false} />
          <SearchPanel visible placeholder="User Search" />
          <ColumnChooser enabled />
          <Export enabled allowExportSelectedData formats={exportFormats} />
          <Selection selectAllMode="allPages" showCheckBoxesMode="always" mode="multiple" />
          <HeaderFilter visible />
          <Sorting mode="multiple" />
          <Scrolling mode="virtual" />
          <Toolbar>
            <Item location="before">
              <div className="grid-header">Users</div>
            </Item>
            <Item location="before" locateInMenu="auto">
              <DropDownButton items={filterStatusList} stylingMode="text" text={status} dropDownOptions={dropDownOptions} useSelectMode onSelectionChanged={filterByStatus} />
            </Item>
            <Item location="after" locateInMenu="auto">
              <Button icon="plus" text="Add User" type="default" stylingMode="contained" onClick={onAddUserClick} />
            </Item>
            <Item location="after" locateInMenu="auto" showText="inMenu" widget="dxButton">
              <Button icon="refresh" text="Refresh" stylingMode="text" onClick={refresh} />
            </Item>
            <Item location="after" locateInMenu="auto">
              <div className="separator" />
            </Item>
            <Item name="exportButton" />
            <Item location="after" locateInMenu="auto">
              <div className="separator" />
            </Item>
            <Item name="columnChooserButton" locateInMenu="auto" />
            <Item name="searchPanel" locateInMenu="auto" />
          </Toolbar>
          <Column dataField="name" caption="Name" sortOrder="asc" hidingPriority={5} minWidth={150} cellRender={cellNameRender} />
          <Column dataField="company" caption="Company" hidingPriority={5} minWidth={150} />
          <Column dataField="status" caption="Status" dataType="string" hidingPriority={3} minWidth={100} cellRender={UserStatus} editCellRender={editCellStatusRender} />
          <Column dataField="assignedTo" caption="Assigned to" hidingPriority={4} />
          <Column dataField="phone" caption="Phone" hidingPriority={2} cellRender={cellPhoneRender} />
          <Column dataField="email" caption="Email" hidingPriority={1} />
        </DataGrid>
        <UserPanel userId={userId} isOpened={isPanelOpened} changePanelOpened={changePanelOpened} changePanelPinned={changePanelPinned} />
        <FormPopup title="New User" visible={popupVisible} setVisible={changePopupVisibility} onSave={onSaveClick}>
          <UserNewForm initData={formDataDefaults} onDataChanged={onDataChanged} />
        </FormPopup>
      </div>
    </div>
  );
};
