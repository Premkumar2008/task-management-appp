import React, { Component } from "react";
import Chart from "react-apexcharts";
import {useEffect} from "react";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


export default function TreeMap() {


    const [FeatureData, setFeatureData] = React.useState([]);
    const [FeatureValues, setFeatureValues] = React.useState([])
    const [DialougeData, setDialougeData] = React.useState([])
    const [TabActiveID, setTabActiveID] = React.useState(0)

    useEffect(() => {



      fetch("http://10.23.113.39:5000/api/v1/friday/datasuitability/?project_name=usecase17")
        .catch(function (response) {
          if (!response.ok) {
            alert("Something Went Wrong!");
            setshowloader("none");
          }
        })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          console.log("222222222222", response.data);
          const fields = response.data;
          const responseKey = Object.keys(response.data[0])
          setFeatureData(responseKey);
          setFeatureValues(response.data)
          setshowloader("none");
  
  
 }) } , []);
  

    var options = {
      
        legend: {
        show: false
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      title: {
        text: "",
        align: 'center'
      },
      colors: [
        '#3B93A5',
        '#F7B844',
        '#ADD8C7',
        '#EC3C65',
        '#CDD7B6',
        '#C1F666',
        '#D43F97',
        '#1E5D8C',
        '#421243',
        '#7F94B0',
        '#EF6537',
        '#C0ADDB'
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      },
      tooltip: {
        enabled : true,
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="arrow_box">' +
            "<span> <img src='/images/src/assets/images/graphimages/"+series[seriesIndex].indexOf(series[seriesIndex][dataPointIndex])+".png' width='60px' height='50px'> : " +
          series[seriesIndex][dataPointIndex] 
        
           +
            " </span>" +
            "</div>" 
          );
        }
      },
      };
      const ClickRightTabs = () => {
        var elmnt = document.getElementById("multivariateIDscroll");
        elmnt.scrollLeft += 150;
      }
    
      const ClickLeftTabs = () => {
        var elmnt = document.getElementById("multivariateIDscroll");
        elmnt.scrollLeft -= 150;
      }
    
      const handleClickOpenArea = (FeatureName,seriesData,i,e) => {
        setDialougeData(seriesData)
        //let total_width1 = 0
       // var elmnt = document.getElementById("multivariateIDscroll");
       // for(let j=0 ; j<=i ;j++){
       //   let total_width = document.getElementById(j).offsetWidth
    
        //  total_width1 = total_width1 + total_width;
       // }
        
       // var halfWidth = (elmnt.offsetWidth) - 150;
      //  if(halfWidth <= total_width1){
       //   let movable = document.getElementById(i).offsetWidth + 80
       //   elmnt.scrollLeft += movable;
       // }
       // else{
       //   let movable = document.getElementById(i).offsetWidth + 80
       //   elmnt.scrollLeft -= movable;
      //  }
       
        setTabActiveID(i)
       
       
      }

      return(
      
            <div id="Multivariate_Container" className="" style={{position :'relative'}}>
         <div className="LeftIcon_tabs" onClick={ClickLeftTabs}><ChevronLeftIcon /></div> 
         <div className="RightIcon_tabs" onClick={ClickRightTabs}><ChevronRightIcon /></div>

        <div className="Multivariate_tabs_active" id="multivariateIDscroll">
          {FeatureData.map((FeatureName, i) => 
    
    
      <div id={i}  onClick={(e) => {
          const dataObj = {}
          FeatureValues.forEach((eachValue) => {
              if(typeof eachValue[FeatureName] === 'number'){
                  dataObj.x = FeatureName;
                  dataObj.y = eachValue[FeatureName]
              }
              handleClickOpenArea(FeatureName,dataObj,i,e)
          })
      }
       
    } className={TabActiveID == i ? "activeTabs" : ""} >
         {FeatureName  }
       
        
    </div>
   
  

          )} 
          
          </div> <select >
          {FeatureData.map((FeatureName, i) => 
         
         
    
    
    <option id={i} className={TabActiveID == i ? "activeTabs" : ""} onClick={(e) => 
     
        handleClickOpenArea(FeatureName,FeatureValues.map(eachData =>  {
         {console.log("zxcvbnm",typeof eachData[FeatureName])}
         return{
          
          x : FeatureName,
          y : eachData[FeatureName]
       }}),i,e)}>
       {FeatureName  }
     
      
  </option>
 


        )} 
          </select>
          
         <Chart
               options={options}
               series = {[
                {
                  data:DialougeData
                }]}
               type="treemap"
               width="100%"
               height="240"
               
             />

        </div>
      )


}