var myChartObject = document.getElementById('myChart');

var chart = new Chart(myChartObject, {
    type: 'line',
    data: {
        labels: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
         "August", "September", "Oktober", "November", "Dezember"],
         datasets: [{
             label: "Lufttemperatur",
             backgroundColor: 'rgba(65,105,225,0.4)',
             borderColor: 'rgba(65,105,225,1)',
             data: [0.7,1,4.4,6.4,10.5,19.6,18.7,16.8,15.4,8.4,4.1,2.6]
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