import { Form, FormGroup, FormItem, Input, Label, Select, Option, TextArea, Button } from "@ui5/webcomponents-react";

function ContactPage() {
    return <div className="contactContainer">
        <h1>Contact Details</h1>
        <div style={{ display: "flex" ,background:"#ccc9c4"}}>
            <div>
                <div className="contactRow">
                    <label>Name </label>
                    <span>:</span>
                    <text><b>Ramesh Shrestha</b></text>
                </div>
                <div className="contactRow">
                    <label>Address</label>
                    <span>:</span>
                    <address style={{ maxWidth: "450px" }}>Ashraya Layout, Phase 1, 6th cross ,Garudacharpalya, Bangalore ,
                        560048, Karnataka, Bangalore</address>
                </div>
                <div className="contactRow">
                    <label>Mobile No </label>
                    <span>:</span>
                    <div>+91 9986434052</div>
                </div>
                <div className="contactRow"><label>Email Id  </label> <span>:</span>
                    <a href="mailto:fx_ra@hotmail.com">fx_ra@hotmail.com</a>
                </div>
                <div className="contactRow"><label>LinkedIn </label><span>:</span> <a href="linkedin.com/in/shrestharamesh">linkedin.com/in/shrestharamesh</a></div>
                <div className="contactRow"><label>Facebook </label><span>:</span> <a href="facebook.com/RameshShrestha1987">facebook.com/RameshShrestha1987</a></div>
                <div className="contactRow"><label>Company </label><span>:</span> <div>Tata Consultancy Services</div></div>
                <div className="contactRow"><label>Designation </label><span>:</span> <div>Associate Consultant</div></div>
            </div>
            <div style={{ marginLeft: "auto", marginRight: "20px" }}>
                <img src="/penguin.jpg"
                    height="200px" width="200px" style={{ borderRadius: "120px" }} />
            </div>

        </div>
        <div style={{ background: "#513111", height: "5px" }} />
        <div style={{display:"flex",background:"#5f655f"}}>
            <div style={{minWidth : "400px", width:"500px"}}>
            <Form
                backgroundDesign="Transparent"
                columnsL={2}
                columnsM={1}
                columnsS={1}
                columnsXL={2}
                labelSpanL={4}
                labelSpanM={2}
                labelSpanS={4}
                labelSpanXL={4}
                style={{
                    alignItems: 'center',
                    margin : "5px"
                }}
                titleText="Message Directly"
            >

                <FormGroup>
                <FormItem label="Name">
                    <Input placeholder="Your Name" />
                </FormItem>
                <FormItem label={<Label>Address</Label>}>
                    <Input placeholder="Your Address" />
                </FormItem>
                <FormItem label={<Label>Mail Id</Label>}>
                    <Input placeholder="Mail Id" />
                </FormItem>
                </FormGroup>
                {/* <FormGroup>
                <FormItem label={<Label style={{ alignSelf: 'start', paddingTop: '0.25rem' }}>Additional Comment</Label>}>
                    <TextArea
                        placeholder="Type your message here"
                        rows={5}
                    />
                </FormItem>
                </FormGroup> */}
            </Form>
            </div>
          
            <div style={{ width:"40%" ,padding:"20px",minWidth:"400px" ,margin : "10px" }}>
            <h5 style={{margin:"0px"}}> Your Message :</h5>
            <TextArea
                        placeholder="Type your message here"
                        rows={6}
                    />
                    <Button>Send</Button>
                    </div>
        </div>
    </div>
}
export default ContactPage;