import React, { useContext, useEffect, useState } from "react";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import {
  AnalyticalTable,
  Button,
  Card,
  CardHeader,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Icon,
  List,
  StandardListItem,
  Text,
  ValueState,
} from "@ui5/webcomponents-react";
import { spacing, ThemingParameters } from "@ui5/webcomponents-react-base";
import { BarChart, DonutChart, LineChart } from "@ui5/webcomponents-react-charts";
import lineChartIcon from "@ui5/webcomponents-icons/dist/line-chart.js";
import barChartIcon from "@ui5/webcomponents-icons/dist/horizontal-bar-chart.js";
import listIcon from "@ui5/webcomponents-icons/dist/list.js";
import tableViewIcon from "@ui5/webcomponents-icons/dist/table-view.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Data/ContextHandler/AuthContext";
import WeatherMainPage from "./WeatherPage/WeatherMainPage";
import Usercard from "./Usercard";
import AdminNotificationSender from "./AdminComponents/AdminNotificationSender";
import { LocalStorage } from "./Data/LocalStorage";
import WeatherCard from "./WeatherPage/WeatherCard";
import UserLocationContextProvider from "./Data/ContextHandler/UserLocationContext";
import { UserLocationContext } from "./Data/ContextHandler/UserLocationContext";
const _myLocalStorageUtility = LocalStorage();
const dataset = [
  {
    month: "January",
    data: 65,
  },
  {
    month: "February",
    data: 59,
  },
  {
    month: "March",
    data: 80,
  },
  {
    month: "April",
    data: 81,
  },
  {
    month: "May",
    data: 56,
  },
  {
    month: "June",
    data: 55,
  },
  {
    month: "July",
    data: 40,
  },
];

// const tableData = new Array(500).fill(null).map((_, index) => {
//   return {
//     name: `name${index}`,
//     age: Math.floor(Math.random() * 100),
//     friend: {
//       name: `friend.Name${index}`,
//       age: Math.floor(Math.random() * 100),
//     },
//   };
// });

// const tableColumns = [
//   {
//     Header: "Name",
//     accessor: "name", // String-based value accessors!
//   },
//   {
//     Header: "Age",
//     accessor: "age",
//   },
//   {
//     Header: "Friend Name",
//     accessor: "friend.name",
//   },
//   {
//     Header: "Friend Age",
//     accessor: "friend.age",
//   },
// ];

const productTableColumns = [
  {
    Header: "Id",
    accessor: "id", // String-based value accessors!
    width: "20"
  },
  {
    Header: "Title",
    accessor: "title",
    width: "120"
  },
  {
    Header: "Description",
    accessor: "description",
    width: "240",
    Cell: (instance) => {

      const { cell, row, data, webComponentsReactProperties } = instance;
      // console.log("row", row);
      //  console.log(data[row.index]);
      //console.log(data[row]);
      // disable buttons if overlay is active to prevent focus
      // const isOverlay = webComponentsReactProperties.showOverlay;
      // console.log('This is your row data', row.original);
      return (
        <FlexBox>
          <Text className="wrappText">{instance.data[row.index]?.description}</Text>

        </FlexBox>
      );
    },
  },
  // { //Removing Image column temporary
  //   Cell: (instance) => {
  //     const { cell, row, data, webComponentsReactProperties } = instance;
  //     const isOverlay = webComponentsReactProperties.showOverlay;
  //     return (
  //       <FlexBox>
  //         <img src={instance.data[row.index]?.thumbnail} width="50px" height="50px" />
  //       </FlexBox>
  //     );
  //   },
  //   Header: "Image",
  //   accessor: "thumbnail",
  //   width: "60"
  // },
];

export default function Home() {
  const [toggleCharts, setToggleCharts] = useState("lineChart");
  const [toggleUserCard, setToggleUserCard] = useState("chart");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [toDoList, setToDoList] = useState([]);
  const [usersStatus, setUsersStatus] = useState([]);
  const { contextData } = useAuth();
  const { token, user, role, settingConfig, userDetail } = contextData;
console.log("userDetail",userDetail);
// const { location,locationPermission } = useContext(UserLocationContext);
// console.log("location : ",location, "locationPermission : ",locationPermission);
  const fetchIntialToDolist = async () => {
    const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    const _token = loggedInUser?.token || "";
    const baseURL = process.env.REACT_APP_SERVER_URI;
    try {
      const response = await fetch(baseURL + '/todolist/getList', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${_token}`
        }
      });
      const result = await response.json();
      //initialToDoList(result.todoList);
      setToDoList(result.todoList);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchIntialProducts = async () => {
    const baseURL = process.env.REACT_APP_SERVER_URI;
    try {
      const response = await fetch(baseURL + '/products?skip=0&limit=10', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      //initialToDoList(result.todoList);
      setProducts(result.products);
    } catch (error) {
      console.log('An error occurred while fetching products', error);
    }
  }

  const getUsersStatus = async () => {
    const baseURL = process.env.REACT_APP_SERVER_URI;
    const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    const _token = loggedInUser?.token || "";
    try {
      const response = await fetch(baseURL + '/serverstatus', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${_token}`
        }
      });

      const result = await response.json();

      console.log(result);
      setUsersStatus(result.users);
    } catch (error) {
      console.log(error);
    }
  }
  const getUsersChartData = function () {
    let onlineUsers = 0;
    let offlineUsers = 0;
    if (usersStatus.length > 0) {
      onlineUsers = usersStatus.filter(item => item.status.toLowerCase() === 'online').length;
      offlineUsers = usersStatus.filter(item => item.status.toLowerCase() === 'offline').length;
    }
    let returnValue = [{ status: 'Online', users: onlineUsers },
    { status: 'Offline', users: offlineUsers }
    ]
    return returnValue
  }

  useEffect(() => {
    //Commented the products
    // //  const url = "products.json";
    // const url = `http://localhost:3001/products?skip=0&limit=10`;
    // //   const url = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
    // fetch(url, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     }
    // }).then((res) => {
    //     return res.json();
    // }).then((data) => {

    //     setProducts(data.products);

    // }).catch((error) => {
    //   console.log('An error occurred while fetching products');
    // });
    fetchIntialToDolist();
    fetchIntialProducts();
    getUsersStatus();
  }, []);
  const handleHeaderClick = () => {
    if (toggleCharts === "lineChart") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setToggleCharts("barChart");
      }, 2000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setToggleCharts("lineChart");
      }, 2000);
    }
  };

  const navigate = useNavigate();
  const handleProgressHeaderClick = () => {
    console.log("clicked Progress header");
    navigate("/todolist");
  };
  const handleWeatherClick = () => {
    console.log("clicked Weather header");
    navigate("/weather1");
  };
  const handleProductHeaderClick = () => {
    console.log("clicked Product header");
    navigate("/products");
  }
  const handleUserHeaderClick = () => {
    console.log("clicked Users header");
    navigate("/users");

  }
  const getStatus = (item) => {
    if (item.status === "Done") {
      return ValueState.Success;
    } else if (item.status === "New") {

      return ValueState.Error;
    } else {
      if (new Date(item.targetCompletionDate) < new Date()) {
        return ValueState.Warning;
      }
      return ValueState.Information;
    }

  }
  const contentTitle =
    toggleCharts === "lineChart" ? "Line Chart" : "Bar Chart";
  const switchToChart =
    toggleCharts === "lineChart" ? "Bar Chart" : "Line Chart";
  return (
    <>
      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        wrap={FlexBoxWrap.Wrap}
        style={spacing.sapUiContentPadding}
      >

          <Card
           header={
            <CardHeader
              titleText="My Profile"
              avatar={<Icon name="employee" />}
            />
          }
           style={{ maxWidth: "340px", ...spacing.sapUiContentPadding }}>
          <div >
            <Usercard user={userDetail} />
          </div>
          </Card>
          {settingConfig?.showWeatherCard &&
          <Card
            header={
              <CardHeader
                titleText="Weather Today"
                interactive
                onClick={handleWeatherClick}
                avatar={<Icon name={tableViewIcon} />}
              />
            }
           
            style={{ maxWidth: "300px", ...spacing.sapUiContentPadding }}
          >
            {/* <WeatherMainPage /> */}
            <UserLocationContextProvider><WeatherCard/></UserLocationContextProvider>
          </Card>
        }
        {role === "ADMIN" &&
  
            <Card
              header={
                <CardHeader
                  titleText="Send Notifications to Users"
                  avatar={<Icon name="bell-2" />}

                />
              }
              style={{ maxWidth: "500px", ...spacing.sapUiContentPadding }}

            >

             <AdminNotificationSender/>
            </Card>
       
        }


        {settingConfig?.showStockPriceCard &&
          <Card
            header={
              <CardHeader
                titleText="Stock Prices"
                subtitleText={`Click here to switch to ${switchToChart}`}
                interactive
                onClick={handleHeaderClick}
                avatar={
                  <Icon
                    name={
                      toggleCharts === "lineChart" ? lineChartIcon : barChartIcon
                    }
                  />
                }
              />
            }
            style={{ width: "300px", ...spacing.sapUiContentPadding }}
          >
            <Text style={spacing.sapUiContentPadding}>{contentTitle}</Text>
            <div style={{ display: "flex" }}>
              {toggleCharts === "lineChart" ? (
                <LineChart
                  dimensions={[{ accessor: "month" }]}
                  measures={[{ accessor: "data", label: "Stock Price" }]}
                  dataset={dataset}
                  loading={loading}
                />
              ) : (
                <BarChart
                  dimensions={[{ accessor: "month" }]}
                  measures={[{ accessor: "data", label: "Stock Price" }]}
                  dataset={dataset}
                  loading={loading}
                />
              )}
            </div>
          </Card>
        }
        {settingConfig?.showMyActivityCard &&
          <Card
            header={
              <CardHeader
                titleText="My Activity"
                subtitleText="List"
                avatar={<Icon name={listIcon}
                />}
                interactive
                onClick={handleProgressHeaderClick}
              />
            }
            style={{ width: "300px", ...spacing.sapUiContentPadding }}
          >
            <List>
              {toDoList?.length > 0 && toDoList.map((item) => {
                return <StandardListItem
                  key={Math.random()}
                  additionalText={item.status}
                  additionalTextState={getStatus(item)}
                >
                  {item.title}
                </StandardListItem>
              })}
              {/* <StandardListItem
              additionalText="finished"
              additionalTextState={ValueState.Success}
            >
              Activity 1
            </StandardListItem>
            <StandardListItem
              additionalText="failed"
              additionalTextState={ValueState.Error}
            >
              Activity 2
            </StandardListItem>
            <CustomListItem>
              <FlexBox
                direction={FlexBoxDirection.Column}
                style={{ width: "100%", ...spacing.sapUiContentPadding }}
              >
                <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                  <Text
                    style={{ fontSize: ThemingParameters.sapFontLargeSize }}
                  >
                    Activity 3
                  </Text>
                  <Text
                    style={{ color: ThemingParameters.sapCriticalTextColor }}
                  >
                    in progress
                  </Text>
                </FlexBox>
                <ProgressIndicator
                  value={89}
                  valueState={ValueState.Success}
                  style={{ ...spacing.sapUiTinyMarginTop }}
                />
              </FlexBox>
            </CustomListItem>
            <CustomListItem>
              <FlexBox
                direction={FlexBoxDirection.Column}
                style={{ width: "100%", ...spacing.sapUiContentPadding }}
              >
                <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                  <Text
                    style={{ fontSize: ThemingParameters.sapFontLargeSize }}
                  >
                    Activity 4
                  </Text>
                  <Text
                    style={{ color: ThemingParameters.sapCriticalTextColor }}
                  >
                    in progress
                  </Text>
                </FlexBox>
                <ProgressIndicator
                  value={5}
                  valueState={ValueState.Error}
                  style={{ ...spacing.sapUiTinyMarginTop }}
                />
              </FlexBox>
            </CustomListItem> */}
            </List>
          </Card>
        }
        {role === "ADMIN" && settingConfig?.showProductCard &&
          <Card
            header={
              <CardHeader
                titleText="Products"
                avatar={<Icon name={tableViewIcon} />}
                interactive
                onClick={handleProductHeaderClick}
              />
            }
            style={{ maxWidth: "500px", ...spacing.sapUiContentPadding }}

          >

            <AnalyticalTable
              data={products}
              columns={productTableColumns}
              visibleRows={6}
              rowHeight={60}
            />
          </Card>}
        {/* <Card
          header={
            <CardHeader
              titleText="AnalyticalTable"
              avatar={<Icon name={tableViewIcon} />}
            />
          }
          style={{ maxWidth: "600px", ...spacing.sapUiContentPadding }}
        >
          <AnalyticalTable
            data={tableData}
            columns={tableColumns}
            visibleRows={8}
          />
        </Card> */}
     
        {role === "ADMIN" &&

          <Card
            header={
              <CardHeader
                titleText="Users"
                avatar={<Icon name="employee" />}
                interactive
                onClick={handleUserHeaderClick}
              />
            }
            style={{ maxWidth: "600px", ...spacing.sapUiContentPadding }}
          >
            <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ margin: "5px", fontSize: "20px", color: "#6f71b0" }}>Total Users : {usersStatus.length}</Text>

                <Icon name="synchronize"
                  style={{ height: "30px", width: "30px", color: "limegreen" }} showTooltip={true} accessible-name="Flip Content" interactive onClick={(e) => {
                    if (toggleUserCard === "chart") {
                      setToggleUserCard("table");
                    } else {
                      setToggleUserCard("chart");
                    }
                  }} />
              </div>
              {toggleUserCard === "chart" ? (<DonutChart className="removeStroke"
                style={{ height: "300px", width: "300px" }}
                dataset={getUsersChartData()}
                dimension={{
                  accessor: 'status'
                }}
                measure={{
                  accessor: 'users',
                  colors: ["green", "grey"]
                }}
              />) : (
                <AnalyticalTable
                  style={{ height: "300px" }}
                  rowHeight={50}
                  data={usersStatus}
                  columns={[{
                    Header: "Name",
                    accessor: "fullName", // String-based value accessors!
                    width: "160"
                  },
                  {
                    Header: "Status",
                    accessor: "status",
                    width: "100"
                  },
                  {
                    Header: "LoginTime",
                    accessor: "loginTime",
                    width: "150"
                  },
                  {
                    Header: "Image",
                    accessor: "image",
                    width: "100",
                    Cell: (instance) => {
                      //   console.log(instance);
                      const { cell, row, data, webComponentsReactProperties } = instance;
                      // console.log("row", row);
                      // console.log(data[row.index]);
                      //console.log(data[row]);
                      // disable buttons if overlay is active to prevent focus
                      const isOverlay = webComponentsReactProperties.showOverlay;
                      // console.log('This is your row data', row.original);
                      return (
                        <FlexBox style={{ borderRadius: "35px", overflow: "hidden" }}>
                          <img src={instance.data[row.index]?.image} width="40px" height="40px" />

                        </FlexBox>
                      );
                    },
                  },
                  ]}
                  visibleRows={5}
                />)}
            </div>
          </Card>
        }

      </FlexBox>
    </>
  );
}
