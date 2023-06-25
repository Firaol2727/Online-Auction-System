import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { useState,useEffect } from 'react';
import axios from 'axios';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const baseapi=axios.create({baseURL:"http://localhost:5000/sel"})
const ChartDisplay = (props) => {
	let aid=props.aid
  const [options,setOptions] =useState( {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Bid price offered"
    },
    axisY: {
      title: "Bid offered in (ETB)"
    },
    data: [
      {
        type: "area",
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0.## Million",
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
				console.log("The graph is",res.data)
			})
			.catch(err=>{
				console.log("Error in graph ",err)
			})
	})

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default ChartDisplay;
