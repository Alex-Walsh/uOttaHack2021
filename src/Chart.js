import { React, useEffect } from "react";
import Chart from 'chart.js';

var coughs, facetouches, last1, last2;

function updateGraph() {
    console.log(coughs, facetouches);
    var d = new Date();
    var n = d.toLocaleTimeString();
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: [new Date(d-6000).toLocaleTimeString(), new Date(d-5000).toLocaleTimeString(), new Date(d-4000).toLocaleTimeString(), new Date(d-3000).toLocaleTimeString(), new Date(d-2000).toLocaleTimeString(), new Date(d-1000).toLocaleTimeString(), n],
            datasets: [{
                label: 'Coughs',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: coughs
            },
            {
                label: 'Face Touches',
                backgroundColor: 'rgb(255, 255, 132)',
                borderColor: 'rgb(255, 255, 132)',
                data: facetouches
            }]
        },
    
        // Configuration options go here
        options: {}
    });
    setInterval(() => {
        console.log("moving");
        chart.data.labels.push(new Date().toLocaleTimeString())
        chart.data.labels.shift();
        chart.data.datasets[0].data.push(parseInt(document.getElementById("snipe1").innerHTML)-last1);
        chart.data.datasets[1].data.push(parseInt(document.getElementById("snipe2").innerHTML)-last2);
        chart.data.datasets[0].data.shift();
        chart.data.datasets[1].data.shift();
        last1 = document.getElementById("snipe1").innerHTML;
        last2 = document.getElementById("snipe2").innerHTML;
        chart.update();
    }, 1000);
    
}

function Charttop () {
    useEffect(() => {
        coughs = [2, 1, 0, 2, 0, 2, 1];
        facetouches = [0, 2, 1, 2, 0, 1, 0];
        last1 = 0;
        last2 = 0;
        updateGraph();
        
        // setInterval(() => {
        //     coughs.push(parseInt(document.getElementById("snipe1").innerHTML.split("Coughs : ")[1])-last1);
        //     facetouches.push(parseInt(document.getElementById("snipe2").innerHTML.split("Face Touches : ")[1])-last2);
        //     coughs.shift();
        //     facetouches.shift();
        //     last1 = document.getElementById("snipe1").innerHTML.split("Coughs : ")[1];
        //     last2 = document.getElementById("snipe2").innerHTML.split("Face Touches : ")[1];
        //     updateGraph();
        // }, 1000)
    }, []);
    

    return (
    <div>
        <canvas id="myChart"></canvas>
    </div>
    );
}

export default Charttop;