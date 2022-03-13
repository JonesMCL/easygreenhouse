var myChartObject = document.getElementById('myChart');

var chart = new Chart(myChartObject, {
    type: 'line',
    data: {
        labels: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
         "August", "September", "Oktober", "November", "Dezember"],
         datasets: [{
             label: "Liter",
             backgroundColor: 'rgba(65,105,225,0.4)',
             borderColor: 'rgba(65,105,225,1)',
             data: [100,97,56,20,2,67,99,54,90,32,5,12]
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