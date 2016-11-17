console.log('11.3');

/**
 * Created by siqi on 11/14/16.
 */

var m = {t:50,r:50,b:50,l:50},
    w = document.getElementById('canvas').clientWidth - m.l - m.r,
    h = document.getElementById('canvas').clientHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width', w + m.l + m.r)
    .attr('height', h + m.t + m.b)
    .append('g').attr('class','plot')
    .attr('transform','translate('+ m.l+','+ m.t+')');

//Random scatter 100 particles across the screen
var data = [], connections;

for(var i=0; i<50; i++){
    data.push({
        x:w*Math.random(),
        y:h*Math.random(),
        r:5+15*Math.random(),
        color:Math.random() >.5?'red':'blue',
        index: i
    });
}

for (var i=0; i<50; i++){
    connections.push({
        source: Math.floor(Math.random()*50),
        target: Math.floor(Math.random()*50)
    });
}

//Represent these 50 particles
var nodes = plot.selectAll('.node')
    .data(data)
    .enter()
    .append('g').attr('class','node')
    .attr('transform',function(d){
        return 'translate('+ d.x+','+ d.y+')'
    });
nodes.append('circle').attr('class','outer')
    .attr('r',function(d){return d.r})
    .style('fill',function(d){return d.color});
nodes.append('circle').attr('class','inner')
    .attr('r',2)
    .style('fill',function(d){return d.color});
nodes.append('line').attr('class','velocity')
    .style('stroke',function(d){return d.color})
    .style('stroke-width','1px');
