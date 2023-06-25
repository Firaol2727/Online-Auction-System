import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { useState,useEffect } from 'react';
import axios from 'axios';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const baseapi=axios.create({baseURL:"http://localhost:5000/sel"})
import { useNavigate, useParams } from "react-router-dom";

const ChartDisplay = (props) => {
	let itemid = useParams();
	let aid=itemid.id

  const [options,setOptions] =useState( {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Bid price offered"
    },
	axisX: {
		intervalType: "day",
		interval: 1,
		title:"Bidding date"
	  },
    axisY: {
      title: "Bid offered in (ETB)",
	  interval: 100000,
    },
    data: [
      {
        type: "area",
		xValueFormatString: "DD MMM YYYY",
        yValueFormatString: "#,##0.## Million",
        // xValueFormatString: "YYYY",
        dataPoints: [
          { x: new Date(2017, 0), y: 7.6},
          { x: new Date(2016, 0), y: 7.3},
          { x: new Date(2015, 0), y: 6.4},
          { x: new Date(2014, 0), y: 5.3},
          { x: new Date(2013, 0), y: 4.5},
          { x: new Date(2012, 0), y: 3.8},
          { x: new Date(2011, 0), y: 3.2}
        ]
      }
    ]
  });
  
	useEffect(()=>{
		baseapi.get(`/graphdetail/${aid}`)
		    .then(res=>{
				let temdataarrays=[];
				temdataarrays=res.data;
				if(res.status==200){
					const formattedDataPoints = temdataarrays.map(dataPoint => ({
					x: new Date(dataPoint.x).getDate(),
					y: dataPoint.y
				  }));
				  let temppricerange=temdataarrays[0].y*0.3;
                    
				console.log("Tempdatarrays",temdataarrays)
				setOptions(prevOptions => ({
					...prevOptions,
					axisY: {
					  ...prevOptions.axisY,
					  interval: temppricerange
					}
				  }));
				setOptions(prevOptions => ({
					...prevOptions,
					data: [
					  {
						...prevOptions.data[0],
						dataPoints: formattedDataPoints
					  }
					]
				  }));
				}
				
				
				console.log("The graph is",res.data)
			})
			.catch(err=>{
				console.log("Error in graph ",err)
			})
	},[props.bidupdate])

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default ChartDisplay;
