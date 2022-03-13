var myChartObject = document.getElementById('myChart2');

var chart = new Chart(myChartObject, {
    type: 'line',
    data: {
        labels: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
         "August", "September", "Oktober", "November", "Dezember"],
         datasets: [{
             label: "Licht (w/m2)",
             backgroundColor: 'rgba(255,215,0,0.4)',
             borderColor: 'rgba(255,215,0,1)',
             data: [232,721,576,298,654,478,932,392,193,875,324,623]
         }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});