import { Button, Icon, Input, Label, Link, MessageBox, Option, Select, Tab, TabContainer, Table, TableCell, TableColumn, TableRow, Text, TextArea, Title, Toolbar, ToolbarSpacer } from "@ui5/webcomponents-react";
import { useEffect, useState } from "react";

import { LocalStorage } from "../Data/LocalStorage";
import AddLinkDialog from "./AddLinkDialog";
import MyMessageBox from "./MyMessageBox";
import { useUsefulLinkContext } from "../Data/ContextHandler/UsefulLinksContext";
const _myLocalStorageUtility = LocalStorage();
const baseURL = process.env.REACT_APP_SERVER_URI;
function MyLinksContent({ setOpenState ,setOpenMessageBox,setSelectedData}) {
    const {Links,fetchIntialUserLinks } =useUsefulLinkContext();

    let linkData = Links.userLinks;
    
   // const [linkData, setLinkData] = useState(Links.userLinks || []);
    const [filterText, setFilterText] = useState("");

    let filteredLinks = linkData?.filter((item) => {
        if (filterText) {
            if (item.description.toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
                return item;
            }
        }
        else {
            return item;
        }
    });
    useEffect(() => {
      //  fetchInitialData();
        fetchIntialUserLinks();
    }, []);
    // const fetchInitialData = async () => {
    //     const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    //     const _token = loggedInUser?.token || "";
    //     if (_token) {
    //         try {
    //             const response = await fetch(baseURL + '/usefullinks/common', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${_token}`
    //                 }
    //             });
    //             const result = await response.json();
    //             setLinkData(result.links);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    // }
    return <>
        <div >


            <Toolbar
                design="Auto"
                onClick={function _a() { }}
                onOverflowChange={function _a() { }}
                toolbarStyle="Standard"
            >

                <ToolbarSpacer />
                <Input placeholder="Search" value={filterText} icon={<Icon name="search" />}
                    onInput={(e) => {
                        setFilterText(e.target.value);
                    }} />
                <Button design="Transparent" icon="add"
                    onClick={(e) => {
                        setOpenState(true);
                    }}>Add</Button>
                <Button design="Transparent" icon="refresh" onClick={fetchIntialUserLinks}>Refresh</Button>


            </Toolbar>
            <div className="sapScrollBar" style={{ height: '72vh', overflow: 'auto' }}>

                <Table
                    stickyColumnHeader
                    mode="SingleSelect"
                    growing="Scroll"
                    columns={
                        <>
                            <TableColumn style={{ width: '3rem' }}><Label>No.</Label></TableColumn>
                            <TableColumn popinDisplay="Inline" demandPopin minWidth={600} popinText="Description" style={{ width: '20rem' }}><Label>Description</Label></TableColumn>
                            <TableColumn popinDisplay="Inline" demandPopin minWidth={700} popinText="URL Link"><Label>URL Link</Label></TableColumn>
                            <TableColumn popinDisplay="Inline" demandPopin minWidth={800} popinText="Created At" style={{ width: '20rem' }}><Label>Created At</Label></TableColumn>
                            <TableColumn demandPopin minWidth={900} popinText="Preview"><Label>Preview</Label></TableColumn>
                            <TableColumn style={{ width: '3rem' }}></TableColumn>
                        </>}
                    onLoadMore={function _a() { }}
                    onPopinChange={function _a() { }}
                    onRowClick={function _a() { }}
                    onSelectionChange={function _a() { }}
                >
                    {filteredLinks?.map((item, index) => {

                        return (<TableRow key={item._id}>
                            <TableCell>
                                <Label> {index + 1} </Label>
                            </TableCell>
                            <TableCell>
                                <Label style={{ width: "20rem", textWrap: "wrap" }}> {item.description} </Label>
                            </TableCell>
                            <TableCell>
                                <Link style={{ width: "20rem", textWrap: "wrap" }} onClick={(e) => {
                                    window.open(item.url, '_blank');
                                }}>  {item.url}  </Link>
                            </TableCell>

                            <TableCell>
                                <Label> {new Date(item.createdAt).toLocaleDateString()} </Label>
                            </TableCell>
                            <TableCell>
                                <div style={{ minWidth: "300px" }}>
                                    {item.type === "Video" ?
                                        <video width="200" height="100px" controls>
                                            <source src={item.url} type="video/mp4" />
                                            <source src={item.url} type="video/ogg" />
                                            Your browser does not support HTML video.
                                        </video> : <><Text></Text></>}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button design="Transparent" icon="delete" onClick={(e)=>{
                                    console.log("Delete Item triggered");
                                    setSelectedData(item);
                                    setOpenMessageBox(true);
                                 
                                }}/>
                            </TableCell>
                        </TableRow>);
                    })}
                </Table>
            </div>
      
        </div>

    </>
}
export default MyLinksContent;