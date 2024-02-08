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
        link: "https://picsum.photos/v2/list",
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
        <h1> My Useful Links</h1>
        <div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>

                <span>Description</span>
                <span>Link</span>
                <span>Preview</span>


            </div>
            {data.map((item) => {
                return <div style={{ display: "flex", justifyContent: "space-around" }}>

                    <span>{item.description}</span>
                    <a href={item.link}>{item.link}</a>
                    <div style={{ width: "400px" }}>
                        {item.type === "Video" ?
                            <video width="400" controls>
                                <source src={item.link} type="video/mp4" />
                                <source src={item.link} type="video/ogg" />
                                Your browser does not support HTML video.
                            </video> : <></>}
                    </div>

                </div>
            }

            )}
        </div>
    </>
}
export default UsefulLinkMainPage
