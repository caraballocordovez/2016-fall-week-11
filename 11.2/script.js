console.log('11.2');

var m = {t:50,r:50,b:50,l:50},
    w = document.getElementById('canvas').clientWidth - m.l - m.r,
    h = document.getElementById('canvas').clientHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width', w + m.l + m.r)
    .attr('height', h + m.t + m.b)
    .append('g').attr('class','plot')
    .attr('transform','translate('+ m.l+','+ m.t+')');

//Projection and geoPath
var projection = d3.geoAlbersUsa();
var path = d3.geoPath()
    .projection(projection);

//Size scale for circle nodes
var scaleSize = d3.scaleSqrt().domain([0,30000000]).range([2,70]);

d3.queue()
    .defer(d3.json,'../data/gz_2010_us_040_00_5m.json')
    .defer(d3.csv,'../data/NST-EST2015-alldata.csv',parse)
    .await(dataloaded);

function dataloaded(err, geo, data){
    //configure projection
    projection.fitExtent([[0,0],[w,h]],geo);

    //convert population data to a d3.map()
    var popMap = d3.map(data, function(d){return d.state; /*use "state" as map key*/ });

    //Compute a new array representing each state as a sized circle
    var states = geo.features.map(function(d){
        var xy = path.centroid(d);
        var pop = popMap.get(d.properties.STATE).pop,
            name = popMap.get(d.properties.STATE).name;

        return {
            state: d.properties.STATE,
            pop: pop,
            name: name,
            x0: xy[0],
            y0: xy[1],
            x: xy[0],
            y: xy[1],
            r: scaleSize(pop)
        }
    });
    console.table(states);

    //Represent
    var nodes = plot.selectAll('.state')
        .data(states,function(d){return d.state})
        .enter()
        .append('g').attr('class','state')
        .filter(function(d){ return d.state != '72'; });
    nodes.append('circle')
        .attr('r',function(d){return d.r})
        .attr('cx',function(d){return d.x})
        .attr('cy',function(d){return d.y})
        .on('click',function(d){console.log(d); });
    nodes.append('line')
        .attr('x1',function(d){return d.x0})
        .attr('y1',function(d){return d.y0})
        .attr('x2',function(d){return d.x})
        .attr('y2',function(d){return d.y});
    nodes.append('circle').attr('class','origin')
        .attr('r',3)
        .attr('cx',function(d){return d.x0})
        .attr('cy',function(d){return d.y0})
        .style('fill','red').style('fill-opacity',1);

    //Force simulation

}

function parse(d){
    return {
        state: d.STATE,
        pop:+d.POPESTIMATE2015,
        name: d.NAME
    }
}