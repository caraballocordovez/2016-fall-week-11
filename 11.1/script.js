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
var data = [];

for(var i=0; i<50; i++){
    data.push({
       x:w*Math.random(),
       y:h*Math.random(),
       r:5+15*Math.random(),
       color:Math.random() >.5?'red':'blue'
    });
}

//Represent these nodes
//TODO: complete this
/* Suggested DOM hierarchy
<g class="node">
    <circle class='outer'></circle>
    <circle class='inner></circle>
    <line class='velocity'></line>
</g>
 */



//Set up a force simulation
//TODO: complete this
var simulation = d3.forceSimulation(data);





//Examples of different forces
//CENTER (compare this to positioning)
var forceCenter = d3.forceCenter(w/2,h/2);

//MANYBODY
var forceManyBody = d3.forceManyBody()
    .strength(0);

//COLLISION
var forceCollision = d3.forceCollide()
    .radius(function(d,i){
        return d.r;
    });

//POSITION
var forceX = d3.forceX()
    .x(function(d){return d.x});

var forceY = d3.forceY()
    .y(h/2);

//CUSTOM FORCE
var forceCustom = function(){

    var nodes;

    function force(alpha){
        //a custom force function that tries to separate nodes by their color
        var node, center;
        for(var i = 0, k = alpha*.1; i < nodes.length; i++){
            node = nodes[i];
            center = node.color=='red'?[w/3,h/2]:[w*2/3,h/2];
            node.vx += (center[0] - node.x)*k;
            node.vy += (center[1] - node.y)*k;
        }
        console.log('force custom');
    }

    force.initialize = function(_){
        nodes = _;
    }

    return force;
};

