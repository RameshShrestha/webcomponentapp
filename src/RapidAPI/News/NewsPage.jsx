import { useEffect, useState } from "react";

const NewsPage = function(){
    const [NewsData,setNewsData] = useState({news:[]});
    const fetchNews = async()=>{
        const baseURL = process.env.REACT_APP_SERVER_URI;
        try{
        const response = await fetch(baseURL + '/news', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        setNewsData ({news: result.news});
    }   catch(error){
        console.log(error);
    }
    }
    useEffect(()=>{
       
      fetchNews();

    },[]);
    return <>
    <h1> NEWS from RAPID API YAHOO</h1>
    <a href="https://rapidapi.com/apidojo/api/yahoo-finance1/">https://rapidapi.com/apidojo/api/yahoo-finance1/</a>
   {NewsData.news?.length> 0 && NewsData.news.map((news)=>{
    return <div key={Math.random()}style={{background : "#b8e3d3", margin : "20px" , padding: "20px", borderRadius:"20px"}}>
        <div style={{fontWeight:"bold"}}> {news.title}  </div>
        <div> {news.provider.displayName}  </div>
        <div> {new Date(news.pubDate).toLocaleString()}  </div>
        <div> {news.contentType } </div>
        {news.clickThroughUrl?.url && (<div> <a href={news.clickThroughUrl?.url}>News Link </a>  </div>)}
    </div>
   })}
    </>
}
export default NewsPage;
