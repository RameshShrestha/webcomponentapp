import { Bar, Button, CheckBox, Form, FormGroup, FormItem, InputType, Label, Page, Toast } from "@ui5/webcomponents-react";
import StandardField from "./UserComponents/StandardField";
import { useState, useRef, useEffect } from "react";
import { useAuth } from './Data/ContextHandler/AuthContext';
import { render, createPortal } from 'react-dom';
function SettingPage() {
    const { contextData } = useAuth();
    const { settingConfig, setSettingConfig } = contextData;
    const toast = useRef(null);
    const showToast = (message) => {
        const modalRoot = document.getElementById('modal-root');
        render(createPortal(<Toast ref={toast} duration={3000} style={{ color: "#ebeb84" }}>{message}</Toast>, modalRoot), document.createElement("div"));
        toast.current.show();
    };
    const loadUserSettings = async()=>{
        const response = await fetch(baseURL + '/settings', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(response.status < 300){
        const result = await response.json();
          console.log(result);
          setSettingConfig(result[0]);
      }else{
       
      }
      }
      useEffect(()=>{
            if(!settingConfig){ // direct refresh of the page it does not have settings
                loadUserSettings();
            }
      },[]);
    const localSettingData = {
        defaultLanguage: "En",
        theme: "sap_fiori_3",
        showNotification: true,
        showWeatherCard: true,
        showProductCard: true,
        showMyActivityCard: true,
        showStockPriceCard: true

    }
    const [settingData, setSettingData] = useState(settingConfig);
    const [settingDataOriginal, setSettingDataOriginal] = useState(settingConfig);
    const [editMode, setEditMode] = useState(false);
    const baseURL = process.env.REACT_APP_SERVER_URI;
    const triggerSaveData = async () => {
        const response = await fetch(baseURL + '/settings', {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(settingData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status < 300) {
            const result = await response.json();
            console.log(result);
            setEditMode(false);
            showToast(result.message);
            setSettingConfig(result.data);

        } else {
            console.log(response);
        }
    }
    const onChangeValue = (e) => {

        if (e.target.tagName.toLowerCase().indexOf("checkbox") > -1) {
            console.log(e.target.name, e.target.checked)
            setSettingData({ ...settingData, [e.target.name]: e.target.checked });
        }
        else {
            console.log(e.target.name, e.target.value)
            setSettingData({ ...settingData, [e.target.name]: e.target.value });
        }
    };
    return <Page
        footer={editMode && (<Bar design="FloatingFooter" endContent={<><Button design="Positive"
            onClick={(e) => {

                triggerSaveData()

            }}>Save</Button>
            <Button design="Emphasized" onClick={(e) => {
                setSettingData({ ...settingDataOriginal });
            }}>Reset</Button>

            <Button design="Transparent" onClick={(e) => {
                setEditMode(false);
                setSettingData({ ...settingDataOriginal });
            }}>Cancel</Button></>}
        />)}
        header={!editMode && (<Bar endContent={<Button icon="edit" title="Edit" onClick={(e) => {
            setEditMode(true);
        }} />} ><Label>Settings</Label></Bar>)}
        style={{
            height: '90vh'
        }}
    >
        <div>
            {/* <h1>Setting Page </h1> */}
            <div>
                {/* <Button onClick={(e) => {
                    setEditMode(!editMode);
                }}>Toggle {editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button> */}
                <Form
                    backgroundDesign="Transparent"
                    columnsL={2}
                    columnsM={2}
                    columnsS={1}
                    columnsXL={2}
                    labelSpanL={4}
                    labelSpanM={2}
                    labelSpanS={12}
                    labelSpanXL={4}
                    style={{
                        alignItems: 'center'
                    }}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <FormGroup titleText="General">
                        <FormItem label="Default Language">
                            <StandardField editMode={editMode} value={settingData.defaultLanguage}
                                inputType="Select" selectOptions={["En", "De"]}
                                onChange={onChangeValue} name="defaultLanguage" />
                        </FormItem>
                        <FormItem label="Theme">
                            <StandardField editMode={editMode} value={settingData.theme}
                                inputType="Select" selectOptions={["" ,"sap_horizon","sap_horizon_dark", "sap_fiori_3", "sap_fiori_3_dark", "sap_belize"]}
                                onChange={onChangeValue} name="theme" />
                        </FormItem>

                        <FormItem label="Show Notifications">
                            <CheckBox
                                disabled={!editMode}
                                onChange={onChangeValue} name="showNotification"
                                checked={settingData.showNotification}
                            />
                        </FormItem>
                    </FormGroup>
                    <FormGroup titleText="Home Page">
                        <FormItem label="Show Weather Card">
                            <CheckBox
                                disabled={!editMode}
                                onChange={onChangeValue} name="showWeatherCard"
                                checked={settingData.showWeatherCard}
                            />
                        </FormItem>
                        <FormItem label="Show Product Card">

                            <CheckBox
                                disabled={!editMode}
                                onChange={onChangeValue}
                                name="showProductCard"
                                checked={settingData.showProductCard}
                            />
                        </FormItem>
                        <FormItem label="Show MyActivity Card">

                            <CheckBox
                                disabled={!editMode}
                                onChange={onChangeValue}
                                name="showMyActivityCard"
                                checked={settingData.showMyActivityCard}
                            />
                        </FormItem>
                        <FormItem label="Show Stock Price Card">
                            <CheckBox
                                disabled={!editMode}
                                onChange={onChangeValue}
                                name="showStockPriceCard"
                                checked={settingData.showStockPriceCard}
                            />
                        </FormItem>

                    </FormGroup>

                </Form>
            </div>
        </div>
    </Page>
            
}
export default SettingPage;