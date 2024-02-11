import { Link, Text, TextArea, Title } from "@ui5/webcomponents-react";

function UsefulLinkMainPage() {
    const data = [{
        id: "Id 1",
        type: "Video",
        link: "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "W3 Schools link ",
        username: "owner User name"

    },
    {
        id: "Id 2",
        type: "URL_Link",
        link: "https://picsum.photos",
        description: "Images Useful for development ",
        username: "owner User name"

    },
    {
        id: "Id 3",
        type: "URL_Link",
        link: "https://tableconvert.com/excel-to-json",
        description: "Utitity for file conversion ",
        username: "owner User name"
    }
    ]
    const link = "https://www.w3schools.com/html/mov_bbb.mp4";
    const description = " W3 Schools link";
    return <>
        <Title>My Useful Links</Title>
        <div style={{ minWidth: "400px", display: "flex", flexWrap: "wrap" }}>

            {/* <div style={{ display: "flex",  flexWrap:"wrap" }}>
                <div>
                <Text style={{minWidth:"300px"}}>Description</Text>
                <Text style={{minWidth:"300px"}}>Link</Text>
                </div>
                <Text style={{minWidth:"300px"}}>Preview</Text>


            </div> */}
            {data.map((item) => {
                return <div style={{
                    display: "flex", flexWrap: "wrap", padding: "15px", margin: "15px",
                    border: "1px solid #314499", justifyContent: "space-between", width: "100%",
                    borderRadius: "15px"
                }}>


                    <div style={{ minWidth: "300px", width: "500px", display: "flex", flexDirection: "column" }}>
                        <Text > Description :</Text>
                        <TextArea style={{ width: "90%" }} value={item.description} rows={3} disabled={true} ></TextArea>
                        <div ><Text>URL : </Text> <Link onClick={(e) => {
                            window.open(item.link, '_blank');
                        }}> {item.link}</Link>
                        </div>
                    </div>
                    {/* <a style={{minWidth:"300px"}} href={item.link}>Link: {item.link}</a> */}
                    <div style={{ minWidth: "300px", height: "150px" }}>
                        {item.type === "Video" ?
                            <video width="400" height="100%" controls>
                                <source src={item.link} type="video/mp4" />
                                <source src={item.link} type="video/ogg" />
                                Your browser does not support HTML video.
                            </video> : <><Text>No Preview</Text></>}
                    </div>

                </div>
            }

            )}
        </div>
    </>
}
export default UsefulLinkMainPage
