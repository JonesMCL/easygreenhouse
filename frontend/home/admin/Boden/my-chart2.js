var myChartObject = document.getElementById('myChart2');

var chart = new Chart(myChartObject, {
    type: 'line',
    data: {
        labels: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
         "August", "September", "Oktober", "November", "Dezember"],
         datasets: [{
             label: "Bodenfeuchtigkeit",
             backgroundColor: 'rgba(255,215,0,0.4)',
             borderColor: 'rgba(255,215,0,1)',
             data: [88,82,73,68,72,75,79,82,82,88,93,95]
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