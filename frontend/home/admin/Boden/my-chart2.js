var chartObject = document.getElementById('chartSoilMoist');

var chartSoilMoist = new Chart(chartObject, {
    type: 'line',
    data: {
        labels: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
         "August", "September", "Oktober", "November", "Dezember"],
         datasets: [{
             label: "Bodenfeuchtigkeit",
             backgroundColor: 'rgba(255,215,0,0.4)',
             borderColor: 'rgba(255,215,0,1)',
             data: [88,82.3,73,68,72,75.5,79,82,82,88,93,95]
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

function addData(chart, data) {
    chart.data.datasets.forEach((dataset) => {
        for (let i = 0; i < 12; i++) {
            dataset.data.push(data[i]);
        }
    });

    chart.update();
}

function removeData(chart) {
    chart.data.datasets.forEach((dataset) => {
        for (let i = 0; i < 12; i++) {
            dataset.data.pop();
        }
    });

    chart.update();
}

axios.get("http://0.0.0.0:4000/api/sensordataHistory/getAverageSoilMoistMonthly").then(
    async (response) => {
        removeData(chartSoilMoist)
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')

        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "")
        replaced = replaced.replace(/.$/,"")
        let jsonResp = JSON.parse(replaced)

        let data = []
        for(let i = 0; i < 12; i++) {
            data.push(jsonResp.table[i].value)
        }
        addData(chartSoilMoist, data)
    }
);  
