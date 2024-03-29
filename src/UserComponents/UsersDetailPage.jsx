import {
    Link, DynamicPageTitle, Breadcrumbs, BreadcrumbsItem, 
    ObjectStatus, FormGroup, DynamicPageHeader, ObjectPage, Bar, Button, FlexBox,
    ObjectPageSection,  Form, FormItem, Toast,
    Text, Label,
} from "@ui5/webcomponents-react";
import { render, createPortal } from 'react-dom';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import StandardField from "./StandardField";
import { useAuth } from "../Data/ContextHandler/AuthContext";
import { LocalStorage } from "../Data/LocalStorage";
const _myLocalStorageUtility = LocalStorage();
const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
function UsersDetailPage({ navigation, route }) {
    const baseURL = process.env.REACT_APP_SERVER_URI;
    const [userData, setUserData] = useState({});
    let UserDataChanged = Object.assign({}, userData);
    const [editMode, setEditMode] = useState(false);
    const { pathname, state } = useLocation();
    const navigate = useNavigate();
    const { contextData} = useAuth();
    const {  user, role } = contextData;
    const toast = useRef(null);
    const showToast = (message) => {
        const modalRoot = document.getElementById('modal-root');
        render(createPortal(<Toast ref={toast} duration={3000} style={{ color: "#ebeb84" }}>{message}</Toast>, modalRoot), document.createElement("div"));
        toast.current.show();
    };
    useEffect(() => {
        let id = "";
       // console.log(state);
        //   id = pathname.replace("/users/", "");
        if (pathname.indexOf("myprofile") > -1) {
            id = user;
        }
        else if (role === "ADMIN") {
            id = pathname.replace("/users/", "");
        } else {
            id = user;
        }
       // console.log("Id :", id);
        if (id === 'new') {
            setUserData({
                "id": "", "firstName": "", "lastName": "", "maidenName": "",  "age": 0, "gender": "", "email": "",
                "phone": "", "username": "",  "password": "", "birthDate": "", "image": "",  "bloodGroup": "",
                "height": 0,  "weight": 0, "eyeColor": "",
                "hair": { "color": "",  "type": ""  },
                "domain": "",
                "ip": "",
                "address": {
                    "address": "",  "city": "L",  "coordinates": { "lat": 0,  "lng": 0 },
                    "postalCode": "",
                    "state": ""
                },
                "macAddress": "",
                "university": "",
                "bank": {  "cardExpire": "",  "cardNumber": "",  "cardType": "", "currency": "", "iban": ""
                },
                "company": {
                    "address": {
                        "address": "",
                        "city": "",
                        "coordinates": { "lat": 0,  "lng": 0
                        },
                        "postalCode": "",
                        "state": ""
                    },
                    "department": "",
                    "name": "",
                    "title": ""
                },
                "ein": "",
                "ssn": "",
                "userAgent": ""
            });
            setEditMode(true);
        }
        if (id !== "new" && id) {
            const _token = loggedInUser?.token || "";
            const url = `${baseURL}/realusers/${id}`;
            // const url = `https://dummyjson.com/users/${id}`;
            fetch(url, {
                
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${_token}`
                },
                 credentials: 'include'
            }).then((res) => {
                return res.json();
            }).then((data) => {

                setUserData(data);
              //  console.log(data);
            })
        }
    }, []);
    const handleInput = (e) => {
        // dispatch({ field: Object.keys(e.target.dataset)[0], value: e.target.value });
       // console.log(e.target.name);
        let pathArray = e.target.name.split(".");
        if (pathArray.length === 1) {
            UserDataChanged[e.target.name] = e.target.value;
        } else if (pathArray.length === 2) {
            UserDataChanged[pathArray[0]][pathArray[1]] = e.target.value;
        } else if (pathArray.length === 3) {
            UserDataChanged[pathArray[0]][pathArray[1]][pathArray[2]] = e.target.value;
        } else if (pathArray.length === 4) {
            UserDataChanged[pathArray[0]][pathArray[1]][pathArray[2]][pathArray[3]] = e.target.value;
        }

      //  console.log(e.target.value)
    };
    if (Object.keys(userData).length < 1) {
        return <>Loading...</>
    }

    return <>
        <ObjectPage

            footer={editMode &&
                <Bar design="FloatingFooter" endContent={<>
                    <Button design="Positive" onClick={async (e) => {
                      //  console.log(UserDataChanged);
                        const _token = loggedInUser?.token || "";
                        if (userData._id) {
                            const response = await fetch(`${baseURL}/realusers/${userData.username}`, {
                                method: 'PUT',
                                 credentials: 'include',
                                body: JSON.stringify(UserDataChanged),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${_token}`
                                }
                            });
                            const result = await response.json();
                            if (result.message === 'Updated Successfully') {
                                showToast(result.message);
                                setUserData(result.data);
                               // navigate("/users");
                                setEditMode(false);
                            }

                        } else {
                            const response = await fetch(`${baseURL}/users`, {
                                method: 'POST',
                                 credentials: 'include',
                                body: JSON.stringify(UserDataChanged),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${_token}`
                                }
                            });
                            const result = await response.json();
                            if (result.message === 'Added Successfully') {
                                showToast(result.message);
                                navigate("/users");
                                setEditMode(false);
                            }
                        }




                    }}>Save</Button>
                    <Button design="Emphasized" onClick={(e) => { setEditMode(false) }}>Cancel</Button></>} />
            }
            headerContent={
                <DynamicPageHeader>
                    <FlexBox alignItems="Center" wrap="Wrap">
                        <FlexBox direction="Column">
                            <Link>{userData.phone}</Link>
                            <Link href="mailto:ui5-webcomponents-react@sap.com">{userData.email}</Link>

                        </FlexBox>
                        <FlexBox direction="Column" style={{ padding: '10px' }}>
                            <Label>{userData.address.city}</Label><Label>{userData.address.address}</Label></FlexBox>
                    </FlexBox></DynamicPageHeader>}
            headerContentPinnable
            headerTitle={<DynamicPageTitle actions={!editMode && <>
                <Button design="Emphasized" onClick={(e) => { setEditMode(true) }}>Edit</Button>
            </>}
                breadcrumbs={
                    <Breadcrumbs>
                        <BreadcrumbsItem>Dashboard</BreadcrumbsItem>
                        <BreadcrumbsItem>Users</BreadcrumbsItem>
                        <BreadcrumbsItem>{userData.username}</BreadcrumbsItem>
                    </Breadcrumbs>}

                header={`${userData.firstName} ${userData.lastName}`}
                showSubHeaderRight

                subHeader={userData.company.title}>
                <ObjectStatus state="Success">employed</ObjectStatus></DynamicPageTitle>}
            image={userData.image}
            imageShapeCircle
            onPinnedStateChange={function _a() { }}
            onSelectedSectionChange={function _a() { }}
            onToggleHeaderContent={function _a() { }}
            selectedSectionId="personalDetails"
            showHideHeaderButton
            style={{
                height: '91vh'
            }}
        >
            <ObjectPageSection
                aria-label="Personal Details"
                id="personalDetails"
                titleText="Personal Details"
            >
                <Form
                    columnsL={3}
                    columnsM={2}
                    columnsXL={3}
                    labelSpanL={4}
                    labelSpanM={6}
                    labelSpanXL={4}
                    style={{
                        alignItems: 'baseline'
                    }}
                >
                    <FormItem label="id">


                        <Text>
                            {userData._id}
                        </Text>
                    </FormItem>
                    <FormItem label="First Name">
                        <StandardField editMode={editMode} value={userData.firstName} onChange={handleInput} name="firstName" maxLength = {15}/>
                    </FormItem>
                    <FormItem label="Last Name">
                        <StandardField editMode={editMode} value={userData.lastName} onChange={handleInput} name="lastName" maxLength = {15}/>
                    </FormItem>
                    <FormItem label="Maiden Name">
                        <StandardField editMode={editMode} value={userData.maidenName} onChange={handleInput} name="maidenName"  maxLength = {15}/>
                    </FormItem>
                    <FormItem label="Age">
                        <StandardField editMode={editMode} value={userData.age} onChange={handleInput} name="age"  type="Number"/>
                    </FormItem>
                    <FormItem label="Gender">
                        <StandardField editMode={editMode} value={userData.gender} onChange={handleInput} name="gender" />
                    </FormItem>
                    <FormItem label="User Name">
                        <StandardField editMode={false} value={userData.username} onChange={handleInput} name="username"  maxLength = {10}/>
                    </FormItem>
                    <FormItem label="Password">
                        <StandardField editMode={editMode} value={userData.password} onChange={handleInput} name="password" />
                    </FormItem>

                    <FormItem label="Email">
                        <StandardField editMode={editMode} value={userData.email} onChange={handleInput} name="email" maxLength = {30} type="Email"/>
                    </FormItem>
                    <FormItem label="Phone">
                        <StandardField editMode={editMode} value={userData.phone} onChange={handleInput} name="phone" />
                    </FormItem>
                    <FormItem label="Birth Date">
                        <StandardField editMode={editMode} value={userData.birthDate} onChange={handleInput} name="birthDate" />
                    </FormItem>
                    <FormItem label="Image URL">

                        <StandardField editMode={editMode} value={userData.image} onChange={handleInput} name="image" inputType="TextArea" rows={2} />
                    </FormItem>
                    <FormItem label="Blood Group">
                        <StandardField editMode={editMode} value={userData.bloodGroup} onChange={handleInput} name="bloodGroup" maxLength = {3}/>
                    </FormItem>
                    <FormItem label="Height">
                        <StandardField editMode={editMode} value={userData.height} onChange={handleInput} name="height" type="Number"/>
                    </FormItem>
                    <FormItem label="weight">
                        <StandardField editMode={editMode} value={userData.weight} onChange={handleInput} name="weight" type="Number"/>
                    </FormItem>
                    <FormItem label="Eye Color">
                        <StandardField editMode={editMode} value={userData.eyeColor} onChange={handleInput} name="eyeColor" maxLength = {15}/>
                    </FormItem>
                    <FormItem label="University">
                        <StandardField editMode={editMode} value={userData.university} onChange={handleInput} name="university" maxLength = {30}/>
                    </FormItem>

                </Form>
            </ObjectPageSection>
            <ObjectPageSection
                aria-label="Address"
                id="Address"
                titleText="Address"
            >
                <Form
                    columnsL={2}
                    columnsXL={2}
                    style={{
                        alignItems: 'baseline'
                    }}
                >
                    <FormGroup >
                        <FormItem label="Address">
                            <StandardField editMode={editMode} value={userData.address.address} onChange={handleInput} name="address.address" maxLength = {50}/>
                        </FormItem>
                        <FormItem label="City">
                            <StandardField editMode={editMode} value={userData.address.city} onChange={handleInput} name="address.city" maxLength = {15}/>
                        </FormItem>
                        <FormItem label="Postal Code">
                            <StandardField editMode={editMode} value={userData.address.postalCode} onChange={handleInput} name="address.postalCode" type="Number"/>
                        </FormItem>
                        <FormItem label="State">
                            <StandardField editMode={editMode} value={userData.address.state} onChange={handleInput} name="address.state" maxLength = {15}/>
                        </FormItem>
                    </FormGroup>

                    <FormGroup >
                        <FormItem label="Lat">

                            <StandardField editMode={editMode} value={userData.address.coordinates.lat} onChange={handleInput} name="address.coordinates.lat" type="Number"/>
                        </FormItem>
                        <FormItem label="Lng">

                            <StandardField editMode={editMode} value={userData.address.coordinates.lng} onChange={handleInput} name="address.coordinates.lng" type="Number" />
                        </FormItem>
                    </FormGroup>

                </Form>
            </ObjectPageSection>
            <ObjectPageSection
                aria-label="Company"
                id="Company"
                titleText="Company"
            >
                <Form
                    columnsL={2}
                    columnsXL={2}
                    style={{
                        alignItems: 'baseline'
                    }}
                >
                    <FormGroup >
                        <FormItem label="Name">
                            <StandardField editMode={editMode} value={userData.company.name} onChange={handleInput} name="company.name" maxLength = {30}/>
                        </FormItem>
                        <FormItem label="Department">
                            <StandardField editMode={editMode} value={userData.company.department} onChange={handleInput} name="company.department" maxLength = {30}/>
                        </FormItem>
                        <FormItem label="Title">
                            <StandardField editMode={editMode} value={userData.company.title} onChange={handleInput} name="company.title" maxLength = {30}/>
                        </FormItem>
                        <FormItem label="Address">
                            <StandardField editMode={editMode} value={userData.company.address.address} onChange={handleInput} name="company.address.address" maxLength = {30}/>
                        </FormItem>
                        <FormItem label="City">
                            <StandardField editMode={editMode} value={userData.company.address.city} onChange={handleInput} name="company.address.city" maxLength = {15}/>
                        </FormItem>
                    </FormGroup>
                    <FormGroup >
                        <FormItem label="Postal Code">
                            <StandardField editMode={editMode} value={userData.company.address.postalCode} onChange={handleInput} name="company.address.postalCode" type="Number"/>
                        </FormItem>
                        <FormItem label="State">
                            <StandardField editMode={editMode} value={userData.company.address.state} onChange={handleInput} name="company.address.state" maxLength = {15}/>
                        </FormItem>
                        <FormItem label="Lat">
                            <StandardField editMode={editMode} value={userData.company.address.coordinates.lat} onChange={handleInput} name="company.address.coordinates.lat" type="Number"/>
                        </FormItem>
                        <FormItem label="Lng">
                            <StandardField editMode={editMode} value={userData.company.address.coordinates.lng} onChange={handleInput} name="company.address.coordinates.lng" type="Number"/>
                        </FormItem>
                    </FormGroup>
                </Form>
            </ObjectPageSection>
            <ObjectPageSection
                aria-label="Bank"
                id="Bank"
                titleText="Bank"
            >
                <Form
                    columnsL={2}
                    columnsXL={2}
                    style={{
                        alignItems: 'baseline'
                    }}
                >
                    <FormGroup >
                        <FormItem label="Card Number">
                            <StandardField editMode={editMode} value={userData.bank.cardNumber} onChange={handleInput} name="bank.cardNumber" />
                        </FormItem>
                        <FormItem label="Card Expire">
                            <StandardField editMode={editMode} value={userData.bank.cardExpire} onChange={handleInput} name="bank.cardExpire" maxLength = {6}/>
                        </FormItem>
                        <FormItem label="Card Type">
                            <StandardField editMode={editMode} value={userData.bank.cardType} onChange={handleInput} name="bank.cardType" maxLength = {15}/>
                        </FormItem>
                    </FormGroup>
                    <FormGroup >
                        <FormItem label="IBAN">
                            <StandardField editMode={editMode} value={userData.bank.iban} onChange={handleInput} name="bank.iban" maxLength = {30}/>
                        </FormItem>
                        <FormItem label="Currency">
                            <StandardField editMode={editMode} value={userData.bank.currency} onChange={handleInput} name="bank.currency" maxLength = {5}/>
                        </FormItem>
                    </FormGroup>
                </Form>
            </ObjectPageSection>
        </ObjectPage>
    </>
}
export default UsersDetailPage;