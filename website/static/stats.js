var poolHashrateData;
var poolHashrateChart;

var statData;
var poolKeys;

function buildChartData(){

    var pools = {};

    poolKeys = [];
    for (var i = 0; i < statData.length; i++){
        for (var pool in statData[i].pools){
            if (poolKeys.indexOf(pool) === -1)
                poolKeys.push(pool);
        }
    }


    for (var i = 0; i < statData.length; i++){

        var time = statData[i].time * 1000;

        for (var f = 0; f < poolKeys.length; f++){
            var pName = poolKeys[f];
            var a = pools[pName] = (pools[pName] || {
                hashrate: [],
            });
            if (pName in statData[i].pools){
                a.hashrate.push([time, statData[i].pools[pName].hashrate]);
            }
            else{
                a.hashrate.push([time, 0]);
            }

        }

    }

    poolHashrateData = [];

    for (var pool in pools){
        poolHashrateData.push({
            key: pool,
            values: pools[pool].hashrate
        });
    }
}

function getReadableHashRateString(hashrate){
    var i = -1;
    var byteUnits = [ ' KH', ' MH', ' GH', ' TH', ' PH' ];
    do {
        hashrate = hashrate / 1024;
        i++;
    } while (hashrate > 1024);
    return Math.round(hashrate) + byteUnits[i];
}

function timeOfDayFormat(timestamp){
    var dStr = d3.time.format('%H:%M')(new Date(timestamp));
    if (dStr.indexOf('0') === 0) dStr = dStr.slice(1);
    return dStr;
}

function displayCharts(){
    nv.addGraph(function() {
        poolHashrateChart = nv.models.lineChart()
            .margin({left: 60, right: 40})
            .x(function(d){ return d[0] })
            .y(function(d){ return d[1] })
            .useInteractiveGuideline(true);

        poolHashrateChart.xAxis.tickFormat(timeOfDayFormat);

        poolHashrateChart.yAxis.tickFormat(function(d){
            return getReadableHashRateString(d);
        });

        d3.select('#poolHashrate').datum(poolHashrateData).call(poolHashrateChart);

        return poolHashrateChart;
    });
}

function TriggerChartUpdates(){
    poolHashrateChart.update();
}

nv.utils.windowResize(TriggerChartUpdates);

$.getJSON('/api/pool_stats', function(data){
    statData = data;
    buildChartData();
    displayCharts();
});

statsSource.addEventListener('message', function(e){
    var stats = JSON.parse(e.data);
    statData.push(stats);


    var newPoolAdded = (function(){
        for (var p in stats.pools){
            if (poolKeys.indexOf(p) === -1)
                return true;
        }
        return false;
    })();

    if (newPoolAdded || Object.keys(stats.pools).length > poolKeys.length){
        buildChartData();
        displayCharts();
    }
    else {
        var time = stats.time * 1000;
        for (var f = 0; f < poolKeys.length; f++) {
            var pool =  poolKeys[f];
            for (var i = 0; i < poolHashrateData.length; i++) {
                if (poolHashrateData[i].key === pool) {
                    poolHashrateData[i].values.shift();
                    poolHashrateData[i].values.push([time, pool in stats.pools ? stats.pools[pool].hashrate : 0]);
                    break;
                }
            }
        }
        TriggerChartUpdates();
    }
});