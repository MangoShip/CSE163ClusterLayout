/* --------------------------------------------------------------------------------------------------
File: ClusterLayout.js
Name: Mingun Cho 
CruzID: mcho23@ucsc.edu
StudentID: 1654724
Constructs Cluster layout using D3
-----------------------------------------------------------------------------------------------------*/ 

/*eslint-env es6*/
/*eslint-env browser*/
/*eslint no-console: 0*/
/*global d3 */    

// Default Cluster Layout (Basic(Default))
// Reference: "https://bl.ocks.org/d3indepth/ceb8d9e5ded610a9df1e0adb98efd748"

//Define SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", 400)
    .attr("height", 220)
    .append("g")
    .attr("transform", "translate(5,15)");

console.log(svg);

d3.json("basic_default_data.json").then(function(data){
    // Define a new cluster with size of 400 and 200
	var clusterLayout = d3.cluster().size([400, 200]); 
	console.log(clusterLayout);
	
    var root = d3.hierarchy(data); // Creates a array tree with chlidren and value

    clusterLayout(root); // Apply cluster layout to the root. Like x and y coordinates

	console.log(clusterLayout);
	console.log(root);
	
    // Nodes
    svg.append("g")
        .attr("class", "nodes")
        .selectAll("nodes")
        .data(root.descendants())
        .enter()
        .append('circle')
        .attr('cx', function(d) {return d.x;}) // Similar to xScale, cluster function assigns x coordinate to each node.
        .attr('cy', function(d) {return d.y;}) // Similar to yScale, cluster function assigns y coordinate to each node.
        .attr('r', 4); // radius 

	console.log(root.descendants()); // Descendants are the circles (objects)
	
    // Links
    svg.append("g")
        .attr("class","links")
        .selectAll("links")
        .data(root.links())
        .enter()
        .append("line")
        .classed('link', true) // Use style from CSS
        .attr('x1', function(d) {return d.source.x;}) // Initial x coordinate of the line
        .attr('y1', function(d) {return d.source.y;}) // Initial y coordinate of the line
        .attr('x2', function(d) {return d.target.x;}) // Ending x coordinate of the line
        .attr('y2', function(d) {return d.target.y;}); // Ending y coordinate of the line
	
	console.log(root.links()); // Links are the line between the descendants
	
	// Make each node's name visible. 
	svg.append("g")
            .selectAll("text")
            .data(root.descendants())
            .enter()
            .append("text")
            .attr("x", function(d) { return d.x + 5; })
            .attr("y", function(d) { return d.y; })
            .text(function(d) { return d.data.name;});
});

// Display Basic(Default)
// Reference: "https://bl.ocks.org/d3indepth/ceb8d9e5ded610a9df1e0adb98efd748"
function basic_default(){ // eslint-disable-line
	console.log("basic_default");
	
	// Remove old svg
	d3.select("svg").remove();
	
	var svg = d3.select("body")
        .append("svg")
        .attr("width", 400)
        .attr("height", 220)
        .append("g")
        .attr("transform", "translate(5,15)");
	
	d3.json("basic_default_data.json").then(function(data){
        // Define a new cluster with size of 400 and 200
        var clusterLayout = d3.cluster().size([400, 200]); 
        console.log(clusterLayout);
	
        var root = d3.hierarchy(data); // Creates an array tree with chlidren and value

        clusterLayout(root); // Apply cluster layout to the root. Like x and y coordinates

        console.log(clusterLayout);
        console.log(root);
	
        // Nodes
        svg.append("g")
            .attr("class", "nodes")
            .selectAll("nodes")
            .data(root.descendants())
            .enter()
            .append('circle')
            .attr('cx', function(d) {return d.x;}) // Similar to xScale, cluster function assigns x coordinate to each node.
            .attr('cy', function(d) {return d.y;}) // Similar to yScale, cluster function assigns y coordinate to each node.
            .attr('r', 4); // radius 

        console.log(root.descendants()); // Descendants are the circles (objects)
	
        // Links
        svg.append("g")
            .attr("class","links")
            .selectAll("links")
            .data(root.links())
            .enter()
            .append("line")
            .classed('link', true) // Use style from CSS
            .attr('x1', function(d) {return d.source.x;}) // Initial x coordinate of the line
            .attr('y1', function(d) {return d.source.y;}) // Initial y coordinate of the line
            .attr('x2', function(d) {return d.target.x;}) // Ending x coordinate of the line
            .attr('y2', function(d) {return d.target.y;}); // Ending y coordinate of the line
	
        console.log(root.links()); // Links are the line between the descendants
	
        // Make each node's name visible. 
        svg.append("g")
            .selectAll("text")
            .data(root.descendants())
            .enter()
            .append("text")
            .attr("x", function(d) { return d.x + 5; })
            .attr("y", function(d) { return d.y; })
            .text(function(d) { return d.data.name;});
    });
}

// Display Basic(More)
// Reference: "https://bl.ocks.org/d3indepth/ceb8d9e5ded610a9df1e0adb98efd748"
function basic_more(){ // eslint-disable-line
	console.log("basic_more");
	
	// Remove old svg
	d3.select("svg").remove();
	
	var svg = d3.select("body")
        .append("svg")
        .attr("width", 400)
        .attr("height", 400)
        .append("g")
        .attr("transform", "translate(5,15)");

    d3.json("basic_more_data.json").then(function(data){
        // Define a new cluster with size of 400 and 200
        var clusterLayout = d3.cluster().size([400, 300]); 
        console.log(clusterLayout);
	
        // Creates an array tree with chlidren and value
		// Sorting the tree. 1. Divide groups with maximum height. 2. Place the group with higher maximum height to the top. 3. Sort the elements inside each group by alphabetical/numerical.
		var root = d3.hierarchy(data).sort((a, b) => d3.descending(a.height, b.height) || d3.ascending(a.data.name, b.data.name)); 

        clusterLayout(root); // Apply cluster layout to the root. Like x and y coordinates

        console.log(clusterLayout);
        console.log(root);
	
        // Nodes
        svg.append("g")
            .attr("class", "nodes")
            .selectAll("nodes")
            .data(root.descendants())
            .enter()
            .append('circle')
            .attr('cx', function(d) {return d.x;}) // Similar to xScale, cluster function assigns x coordinate to each node.
            .attr('cy', function(d) {return d.y;}) // Similar to yScale, cluster function assigns y coordinate to each node.
            .attr('r', 4); // radius 

        console.log(root.descendants()); // Descendants are the circles (objects)
	
        // Links
        svg.append("g")
            .attr("class","links")
            .selectAll("links")
            .data(root.links())
            .enter()
            .append("line")
            .classed('link', true) // Use style from CSS
            .attr('x1', function(d) {return d.source.x;}) // Initial x coordinate of the line
            .attr('y1', function(d) {return d.source.y;}) // Initial y coordinate of the line
            .attr('x2', function(d) {return d.target.x;}) // Ending x coordinate of the line
            .attr('y2', function(d) {return d.target.y;}); // Ending y coordinate of the line
	
        console.log(root.links()); // Links are the line between the descendants
	
        // Make each node's name visible. 
        svg.append("g")
            .selectAll("text")
            .data(root.descendants())
            .enter()
            .append("text")
            .attr("x", function(d) { return d.x + 5; })
            .attr("y", function(d) { return d.y; })
            .text(function(d) { return d.data.name;});
    });
}

// Display Dendrogram(Default)
// Reference: "https://observablehq.com/@d3/cluster-dendrogram"
function dendrogram_default(){ // eslint-disable-line
	console.log("dendrogram_default");
	
	// Remove old svg
	d3.select("svg").remove();
	
	// Define width and height
	var width = 1300,
    height = 2600;

    //Define SVG
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(50, 1750)");

    d3.json("dendrogram_default_data.json").then(function(data){
        // Check if data is being parsed correctly.
        console.log(data);
	
        var root = tree(data);
    
        console.log(root);
        console.log(root.descendants());
	
        // Reference: https://www.d3-graph-gallery.com/graph/dendrogram_basic.html
        // Conversion from original ECMA script to the current Javascript version.
		// Draw lines between the nodes.
        svg.append("g")
            .selectAll(".link")
            .data(root.descendants().slice(1)) // # of Links are always (# of nodes - 1). Don't include "flare" since it is the head of the tree.
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", function(d) { // "M" = Move the pen to certain location. "C" = Draw a cubic curve.
                // Draw a curve line from a node to the node's parent. 
                return "M" + d.y + "," + d.x // Initial x and y coordinates of the line. (Set pen's new current location)
                    + "C" + ((d.y + d.parent.y) / 2) + "," + d.x // Control point at the beginning of the curve
                    + " " + ((d.y + d.parent.y) / 2) + "," + d.parent.x // Control point at the end of the curve
                    + " " + d.parent.y + "," + d.parent.x; // Draw curve to here. (Endpoint)
            });
		
		console.log(root.descendants()); // All the nodes
		console.log(root.descendants().slice(1)); // No "flare" 

		// Draw circles/nodes.
        svg.append("g")
            .selectAll("circle")
            .data(root.descendants())
            .join("circle")
            .attr("cx", function(d) { return d.y; })
            .attr("cy", function(d) { return d.x; })
            .attr("fill", function(d) { return d.children ? "#555" : "#999";}) // Have Children, darker. No children (farthest element), lighter
            .attr("r", 2.5);

		// Put text to each nodes. 
        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll("text")
            .data(root.descendants())
            .join("text")
            .attr("x", function(d) { return d.y; })
            .attr("y", function(d) { return d.x; })
            .attr("dy", "0.31em")
            .attr("dx", function(d) { return d.children ? -6 : 6;}) // Have children, left of the circle. No children (farthest element), right of the circle.
            .text(function(d) { return d.data.name; })
            .filter(function(d) { return d.children; })
            .attr("text-anchor", "end")
            .clone(true).lower() // White-out the line behind the text, making the text easier to read. 
            .attr("stroke", "white");
	
    })
	// Create the cluster layout using an array tree (hierarchy) with children and value, sorted in alphabetical order.
    function tree(data){
		// Sorting the tree. 1. Divide groups with maximum height. 2. Place the group with higher maximum height to the top. 3. Sort the elements inside each group by alphabetical/numerical. 
        var root = d3.hierarchy(data).sort((a, b) => d3.descending(a.height, b.height) || d3.ascending(a.data.name, b.data.name));
        root.dx = 10; // Space between the farthest elements to each other. 
        root.dy = width / (root.height + 1); // 
		console.log(root.height); // root.height is the maximum height of the tree
		console.log(root.dy);
		console.log(root);
        return d3.cluster().nodeSize([root.dx, root.dy])(root);
    }
}

// Display Dendrogram(UCSC)
// Reference: "https://observablehq.com/@d3/cluster-dendrogram"
// The code is exactly the same as the default dendrogram, except reading a different data file.
// All the comments and console logs are located in the default dendrogram function. 
function dendrogram_ucsc(){ // eslint-disable-line
	console.log("dendrogram_ucsc");
	
	// Remove old svg
	d3.select("svg").remove();
	
	var width = 1400,
    height = 3400;

    //Define SVG
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(150, 1600)");

    d3.json("dendrogram_ucsc_data.json").then(function(data){
        // Check if data is being parsed correctly.
        console.log(data);
	
        var root = tree(data);
    
        console.log(root);
        console.log(root.descendants());
	
        // Reference: https://www.d3-graph-gallery.com/graph/dendrogram_basic.html
        // Conversion from original ECMA script to the current Javascript version.
        svg.append("g")
            .selectAll(".link")
            .data(root.descendants().slice(1))
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", function(d) {
                return "M" + d.y + "," + d.x
                    + "C" + ((d.y + d.parent.y) / 2) + "," + d.x
                    + " " + ((d.y + d.parent.y) / 2) + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
            });

        svg.append("g")
            .selectAll("circle")
            .data(root.descendants())
            .join("circle")
            .attr("cx", function(d) { return d.y; })
            .attr("cy", function(d) { return d.x; })
            .attr("fill", function(d) { return d.children ? "#555" : "#999";})
            .attr("r", 2.5);

        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll("text")
            .data(root.descendants())
            .join("text")
            .attr("x", function(d) { return d.y; })
            .attr("y", function(d) { return d.x; })
            .attr("dy", "0.31em")
            .attr("dx", function(d) { return d.children ? -6 : 6;})
            .text(function(d) { return d.data.name; })
            .filter(function(d) { return d.children; })
            .attr("text-anchor", "end")
            .clone(true).lower()
            .attr("stroke", "white");
	
    })

    function tree(data){
        var root = d3.hierarchy(data).sort((a, b) => d3.descending(a.height, b.height) || d3.ascending(a.data.name, b.data.name));
        root.dx = 10;
        root.dy = width / (root.height + 1);
        return d3.cluster().nodeSize([root.dx, root.dy])(root);
    }
}

// Display Radial(Default)
// Reference: "https://bl.ocks.org/mbostock/4339607"
function radial_default(){ // eslint-disable-line
	console.log("radial_default");
	
	// Remove old svg
	d3.select("svg").remove();
	
	// Define width and height
	var width = 1060,
    height = 950;

    // Define SVG
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append("g")
        .attr("transform", "translate(" + (width / 2 + 50) + "," + (height / 2 + 25) + ")");

    // When reading data file, assign parent to each node. (Substring from index 0 to the last '.')
	var stratify = d3.stratify()
        .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });
	
	//console.log(stratify);

    var tree = d3.cluster()
        .size([360, 390]) // Size of the layout
        .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; }); // make the children from same parent to stay closer. If not, make a bigger space.
	
	//console.log(tree);

    d3.csv("radial_default_data.csv").then(function(data){
		//console.log(stratify(data)
            //.sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); }));
		// Sort the tree. 1. Less maximum height/depth, the lower the index. 2. Children are alphabetically sorted.
        var root = tree(stratify(data)
            .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); }));
	
        console.log(root);
        console.log(root.descendants().slice(1));

        var link = g.selectAll(".link") // eslint-disable-line
            .data(root.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function(d) { // "M" = Move the pen to certain location. "C" = Draw a cubic curve.
                return "M" + project(d.x, d.y) // Initial x and y coordinates of the line. (Set pen's new current location)
                    + "C" + project(d.x, (d.y + d.parent.y) / 2) // Control point at the beginning of the curve
                    + " " + project(d.parent.x, (d.y + d.parent.y) / 2) // Control point at the end of the curve
                    + " " + project(d.parent.x, d.parent.y); // Draw curve to here. (Endpoint)
            });

        var node = g.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); }) // Node is parent, "node--internal". Otherwise, "node--leaf" for css style.
            .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; }); // Place the nodes
		
		console.log(node);

        node.append("circle")
            .attr("r", 2.5); // Place circle for each node

        // Text for each node
		node.append("text")
            .attr("dy", ".31em")
            .attr("x", function(d) { return d.x < 180 === !d.children ? 6 : -6; }) // If parent, place on the right of the circle. Otherwise, place on the left of the circle.
            .style("text-anchor", function(d) { return d.x < 180 === !d.children ? "start" : "end"; }) // Same as above, but with text-anchor.
            .attr("transform", function(d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; }) // Rotate the texts 
            .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); }); // Get the text 
    });
	// Function that creates a radial shape for the layout.
    function project(x, y) { // Starting from the "display" (first in the array) move in clock-wise until the "vis" (last children of flare).
		// X coordinates of the nodes are 1-360. (Based on the cluster size) 
		// Nodes that have x values of 1-90 will be in the first quadrant.
		// Nodes that have x values of 91-180 will be in the fourth quadrant.
		// Nodes that have x values of 181-270 will be in the third quadrant.
		// Nodes that have x values of 271-360 will be in the second quadrant. 
        var angle = (x - 90) / 180 * Math.PI, radius = y;
        return [radius * Math.cos(angle), radius * Math.sin(angle)];
    }
}

// Display Radial(Food)
// Reference: "https://bl.ocks.org/mbostock/4339607"
// The code is exactly the same as the default radial, except reading a different data file.
// All the comments and console logs are located in the default radial function. 
function radial_food(){ // eslint-disable-line
	console.log("radial_food");
	
	// Remove old svg
	d3.select("svg").remove();
	
	var width = 1060,
    height = 950;

    //Define SVG
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append("g")
        .attr("transform", "translate(" + (width / 2 + 50) + "," + (height / 2 + 25) + ")");

    var stratify = d3.stratify()
        .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

    var tree = d3.cluster()
        .size([360, 390])
        .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

    d3.csv("radial_food_data.csv").then(function(data){
		//console.log(stratify(data)
            //.sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); }));	
        var root = tree(stratify(data)
            .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); }));
	
        console.log(root);
        console.log(root.descendants().slice(1));

        var link = g.selectAll(".link") // eslint-disable-line
            .data(root.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function(d) {
                return "M" + project(d.x, d.y)
                    + "C" + project(d.x, (d.y + d.parent.y) / 2)
                    + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
                    + " " + project(d.parent.x, d.parent.y);
            });

        var node = g.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
            .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; });

        node.append("circle")
            .attr("r", 2.5);

        node.append("text")
            .attr("dy", ".31em")
            .attr("x", function(d) { return d.x < 180 === !d.children ? 6 : -6; })
            .style("text-anchor", function(d) { return d.x < 180 === !d.children ? "start" : "end"; })
            .attr("transform", function(d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
            .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
    });
	
    function project(x, y) {
        var angle = (x - 90) / 180 * Math.PI, radius = y;
        return [radius * Math.cos(angle), radius * Math.sin(angle)];
    }
}



