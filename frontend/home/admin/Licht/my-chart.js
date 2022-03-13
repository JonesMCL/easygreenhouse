var myChartObject = document.getElementById('myChart');

var chart = new Chart(myChartObject, {
    type: 'line',
    data: {
        labels: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
         "August", "September", "Oktober", "November", "Dezember"],
         datasets: [{
             label: "Licht (UV-index)",
             backgroundColor: 'rgba(65,105,225,0.4)',
             borderColor: 'rgba(65,105,225,1)',
             data: [2,7,5,2,6,4,9,3,1,8,3,6]
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