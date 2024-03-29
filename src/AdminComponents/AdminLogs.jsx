import { Table, TableRow, TableCell, Label, TableColumn, Button, TableGrowingMode, Panel, Toolbar, Title, ToolbarSpacer, Icon, Toast, FilterBar, FilterItem, FilterGroupItem, Input, DateRangePicker } from '@ui5/webcomponents-react';
import { useEffect, useRef, useState } from 'react';
import navigationRightArrow from "@ui5/webcomponents-icons/dist/navigation-right-arrow";
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from "../Data/LocalStorage";
const _myLocalStorageUtility = LocalStorage();
const baseURL = process.env.REACT_APP_SERVER_URI;







function AdminLogs() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [logs, setLogs] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(1000);

    const [maxRecord, setMaxRecord] = useState(10000);
    const [filterQuery, setFilterQuery] = useState("");
    //  var maxRecord = 100;
    const navigate = useNavigate();
    const toast = useRef(null);
    const showToast = (message) => {
        toast.current.innerHTML = message;
        toast.current.show();
    };
    const fetchData = async (filterString, goClicked) => {
        const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
        const _token = loggedInUser?.token || "";
        let url = `${baseURL}/logs/iplogs?skip=${skip}&limit=${limit}`;
        if (goClicked) {
            url = `${baseURL}/logs/iplogs?skip=${0}&limit=${1000}`;
        }
        if (filterString) {
            url = url + filterString;
        }
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'credentials': 'include',
                'Authorization': `Bearer ${_token}`
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data.total) {
                setMaxRecord(data.total || 1000);
            }
            setLogs(data.logs);
            setSkip(limit)
            setLimit(limit + 1000);
        });
    };
    useEffect(() => {
        fetchData("", false);//Will be true when clicked Go
    }, []);
    const onLoadMore = async () => {
        const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
        const _token = loggedInUser?.token || "";
        let url = `${baseURL}/logs/iplogs?skip=${skip}&limit=${limit}`;
        if (filterQuery) {
            //console.log("Filter will be found here", filterQuery);
            url = url + filterQuery;
        }


        if (skip >= maxRecord) {
           // console.log("No more records");
            return;
        }
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'credentials': 'include',
                'Authorization': `Bearer ${_token}`
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
          //  console.log(data);
            setLogs([...logs, ...data.logs]);
            setSkip(limit)
            setLimit(limit + 1000);
        });
    }
    return (<div>
        <FilterBar
            id="FilterbarLogs"
            showGoOnFB="true"
            filterContainerWidth="12.125rem"
            onAfterFiltersDialogOpen={function _a() { }}
            onClear={function _a() { }}
            onFiltersDialogCancel={function _a() { }}
            onFiltersDialogClose={function _a() { }}
            onFiltersDialogOpen={function _a() { }}
            onFiltersDialogSave={function _a() { }}
            onFiltersDialogSearch={function _a() { }}
            onFiltersDialogSelectionChange={function _a() { }}
            onGo={function _a(e) {
                //   const signal = controller.signal;
                //   document.getElementById("scrollableDiv").scrollTop = 0;

                //   console.log(e);
                let filterString = "";
                e.detail.filters.map((filter) => {
                    let filterName = filter.name.replace("Filter", "");

                    if (filter.value) {
                        filterString += "&" + filterName + "=" + filter.value;
                    }
                });
                console.log(filterString);
                setFilterQuery(filterString);
                setSkip(0)
                setLimit(10);
                fetchData(filterString, true);

                //   filterQuery = filterString;
                //   loadInitialData(signal, true, filterString);
            }}
            onRestore={function _a() { }}
            onToggleFilters={function _a() { }}

        >
            <FilterGroupItem label="IP address" >
                <Input name="ipFilter" placeholder="IP address" />
            </FilterGroupItem>
            <FilterGroupItem label="Path">

                <Input name="pathFilter" placeholder="Path" />
            </FilterGroupItem>
            <FilterGroupItem label="Created On" >
                {/* <Input name="createdAtFilter" placeholder="Created On" /> */}
                <DateRangePicker name="createdAtFilter"
                    onChange={function _a() { }}
                    onInput={function _a() { }}
                    onValueStateChange={function _a() { }}
                    primaryCalendarType="Gregorian"
                    valueState="None"
                />
            </FilterGroupItem>

        </FilterBar>

        <Panel
            style={{ maxWidth: "100%" }}

            header={<Toolbar><Title>Logs ({logs.length} / {maxRecord} )</Title><ToolbarSpacer />



                <Toast ref={toast} duration={3000} style={{ color: "#ebeb84" }}></Toast></Toolbar>}
            headerText="Panel"
            onToggle={function _a() { }}
        >
            <div className="sapScrollBar VerticalScrollbar-scrollbar-0-2-55" style={{ overflow: "scroll", height: "55dvh", overflowX: "hidden" }} >
                <Table
                    id="ipLogsTable"
                    mode="None"
                    stickyColumnHeader="true"
                    onLoadMore={onLoadMore}
                    growing={TableGrowingMode.Scroll}
                    //  growing={TableGrowingMode.Button}
                    growingButtonText='More'
                    no-data-text="No Data"
                    columns={
                        <>
                            <TableColumn style={{ width: '2rem' }}><Label>IP Address</Label></TableColumn>
                            <TableColumn style={{ width: '5rem' }} demandPopin minWidth={500} popinText="Path"><Label>Path</Label></TableColumn>
                            <TableColumn style={{ width: '5rem' }} demandPopin minWidth={600} popinText="Created At"><Label>Created At</Label></TableColumn>
                        </>
                    }
                    onPopinChange={function _a() { }}
                    onRowClick={function _a() { }}
                >
                    {logs.length > 0 && logs.map((log) => {
                        return (
                            <TableRow key={log.id} id={log.id} >
                                <TableCell>
                                    <Label style={{ width: '2rem' }}>
                                        {log.ip}
                                    </Label>
                                </TableCell>
                                <TableCell>
                                    <Label style={{ width: '8rem' }}>
                                        {log.path}
                                    </Label>
                                </TableCell>
                                <TableCell>
                                    <Label style={{ width: '15rem' }}>
                                        {new Date(log.createdAt).toLocaleString()}
                                    </Label>
                                </TableCell>
                            </TableRow>
                        )
                    })}

                </Table>

            </div>
        </Panel>
    </div>
    )
}
export default AdminLogs