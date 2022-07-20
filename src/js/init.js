import { mangoes } from "../data/mangoesData";
import * as d3 from "d3";
import $ from "jquery";
import images from "../img/*.png";

////////////////////////////////////////////////////////////
///////////////// Size & mobile set up /////////////////////
////////////////////////////////////////////////////////////

const windowWidth = $(window).width();
const windowHeight = $(window).height();
const parentWidth = $("#viz").parent().width();

$(window).resize(function () {
    if (windowWidth != $(window).width() || windowHeight != $(window).height()) {
        location.reload();
        return;
    }
});

const width = parentWidth >= 1000 ? 1000 : parentWidth;
const height = width;

let imgWidth = 110;
let imgIncrease = 100;
const centerAdjustment = 7.5;
let screenSize = "large";

if (windowWidth <= 1300 && windowWidth > 1100) {
    imgWidth = 90;
    imgIncrease = 80;
} else if (windowWidth <= 1100 && windowWidth > 992) {
    imgWidth = 70;
    imgIncrease = 60;
    screenSize = "medium";
} else if (windowWidth <= 992 && windowWidth > 850) {
    imgWidth = 110;
    imgIncrease = 100;
    screenSize = "medium";
} else if (windowWidth <= 850 && windowWidth > 660) {
    imgWidth = 90;
    imgIncrease = 80;
    screenSize = "medium";
} else if (windowWidth <= 660 && windowWidth > 550) {
    imgWidth = 70;
    imgIncrease = 60;
    screenSize = "medium";
} else if (windowWidth <= 550) {
    imgWidth = 60;
    imgIncrease = 50;
    screenSize = "small";
}

////////////////////////////////////////////////////////////
//////////////////// SVG & G set up ////////////////////////
////////////////////////////////////////////////////////////

const svg = d3.select("#viz")
    .append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height);

const g = svg.append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);
    //-100 to reduce the distance between the top of the viz and the buttons

const circleG = g.append("g")
    .attr("id", "circleG");

const mangoNameG = g.append("g")
    .attr("id", "mangoNameG");

////////////////////////////////////////////////////////////
///////////////// Other general variable ///////////////////
////////////////////////////////////////////////////////////

let mode = 'sweet';
const PI05 = Math.PI / 2;

//To calculate circle radius
const circle_radius = screenSize == "medium" || screenSize == "small"? width * 0.38:width * 0.3;
const arc_radius = screenSize == "medium" || screenSize == "small"? width*0.44:width * 0.36;
const label_radius = screenSize == "medium" || screenSize == "small"? width * 0.48:width * 0.4;
const line_radius1 = screenSize == "medium" || screenSize == "small"? width * 0.46:width * 0.38;
const line_radius2 = screenSize == "medium" || screenSize == "small"? width * 0.5:width * 0.43;


////////////////////////////////////////////////////////////
///////////////// A couple of functions ////////////////////
////////////////////////////////////////////////////////////

//function to wrap text
const wrap = (text, width) => {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 1, //<-- 0!
            lineHeight = 1.1, // ems
            x = text.attr("x"), //<-- include the x!
            y = text.attr("y"),
            dy = text.attr("dy") ? text.attr("dy") : 0; //<-- null check
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

// function to add attributes to nodes
const addAttributes = (data) =>{

    data.forEach(function (d, i) {
        d.cluster = i;
        d.startAngle = d.centerAngle - mango_angle_distance / 2;
        d.endAngle = d.centerAngle + mango_angle_distance / 2;
        d.startAngle2 = d.centerAngle - mango_angle_distance / 2 + mango_angle_distance / 12;
        d.endAngle2 = d.centerAngle + mango_angle_distance / 2 - mango_angle_distance / 12;
        d.x = circle_radius * Math.cos(data[d.cluster].centerAngle - PI05);
        d.y = circle_radius * Math.sin(data[d.cluster].centerAngle - PI05);
    })
    return data
}

// function to calculate arc paths
const calculatePath = (startAngle2,endAngle2) =>{
    var rad = arc_radius,
        xs = rad * Math.cos(startAngle2 - PI05),
        ys = rad * Math.sin(startAngle2 - PI05),
        xt = rad * Math.cos(endAngle2 - PI05),
        yt = rad * Math.sin(endAngle2 - PI05);
    return "M" + xs + "," + ys + " A" + rad + "," + rad + " 0 0 1 " + xt + "," + yt;
}

// function to append middle texts
const appendText = (id) => {
    
    circleG.append("text")
        .attr("class", "middleText")
        .attr("text-anchor", "middle")
        .attr("id", id)
        .attr("x", 0)
        .attr("fill", "#985B39")
        .style("opacity", 0)
        .text("");
    
}

////////////////////////////////////////////////////////////
////////////////// Clean & prepare data ////////////////////
////////////////////////////////////////////////////////////

const root = d3.stratify()
    .id(d => d.name)
    .parentId(d => d.parent)
    (mangoes);

const cluster = d3.cluster().size([360, null]);

let mangoData = cluster(root).leaves();

mangoData.forEach(function (d, i) {
    d.centerAngle = (d.x - centerAdjustment) * Math.PI / 180; //-centerAdjustment so it starts at the center at top...basically centerAngle is just x converted from 360 to radians
});

const mango_angle_distance = mangoData[1].centerAngle - mangoData[0].centerAngle; // for 23 mangoes

mangoData = addAttributes(mangoData);

////////////////////////////////////////////////////////////
/////////////////// Draw SVG elements //////////////////////
////////////////////////////////////////////////////////////

// join the mango images
circleG.selectAll("image.mango")
    .data(mangoData)
    .join("svg:image")
    .attr("class", "mango")
    .attr("x", d => d.x - imgWidth / 2)
    .attr("y", d => d.y - imgWidth / 2)
    .attr("width", imgWidth)
    .attr("height", imgWidth)
    .attr("xlink:href", d => `${images[d.data.name]}`)
    .attr("opacity", 0)
    .on("mouseover", function (event, d) {
        d3.select(this).raise();
    })
    .on('click', function (event, d) {
        mangoClicked(rearrageMangoData(d.data)[0], rearrageMangoData(d.data)[1]);
    })
    .transition()
    .delay((d, i) => 50 * i)
    .duration(1000)
    .attr("opacity", 1)

//add text in middle
circleG.append("text")
    .attr("class", "middleText")
    .attr("text-anchor", "middle")
    .attr("id", "text1")
    .attr("x", 0)
    .attr("fill", "black")
    .attr("font-size", function () {
        if (screenSize === "small" || screenSize === "medium") return 14
        return 20
    })
    .attr("font-weight", 700)
    .text("");

appendText("text2");
appendText("text3");
appendText("text4");

//Label line, arc & text
mangoNameG.append("line")
    .attr("class", "labelLine")
    .attr("x1", line_radius1 * Math.cos(centerAdjustment * Math.PI / 180 - mango_angle_distance / 2 - PI05))
    .attr("y1", line_radius1 * Math.sin(centerAdjustment * Math.PI / 180 - mango_angle_distance / 2 - PI05))
    .attr("x2", line_radius2 * Math.cos(centerAdjustment * Math.PI / 180 - mango_angle_distance / 2 - PI05))
    .attr("y2", line_radius2 * Math.sin(centerAdjustment * Math.PI / 180 - mango_angle_distance / 2 - PI05))
    .style("stroke-width", "1px")
    .attr("stroke", "#985B39")

mangoNameG.append("path")
    .attr("class", "labelArc")
    .attr("id", "labelArc")
    .style("stroke-width", "0px")
    .style("fill", "none")
    .attr("d", function (d, i) {
        var rad = label_radius,
            xs = rad * Math.cos(centerAdjustment * Math.PI / 180 - mango_angle_distance / 2 - PI05),
            ys = rad * Math.sin(centerAdjustment * Math.PI / 180 - mango_angle_distance / 2 - PI05),
            xt = rad * Math.cos(centerAdjustment * Math.PI / 180 + 3 * mango_angle_distance / 2 - PI05),
            yt = rad * Math.sin(centerAdjustment * Math.PI / 180 + 3 * mango_angle_distance / 2 - PI05)
        return "M" + xs + "," + ys + " A" + rad + "," + rad + " 0 0 1 " + xt + "," + yt;
    });

mangoNameG
    .append("text")
    .attr("class", "labelText")
    .append("textPath")
    .attr("startOffset", "2%")
    .style("text-anchor", "start")
    .attr("fill", "#985B39")
    .style("font-weight", 400)
    .attr("font-size", function () {
        if (screenSize === "medium") return 14
        if (screenSize === "small") return 10
        return 18
    })
    .attr("xlink:href", "#labelArc")
    .text("Direction of increase→");

// text arcs
mangoNameG.selectAll(".mangoArc")
    .data(mangoData)
    .join("path")
    .attr("class", "mangoArc")
    .attr("id", (d, i) => `mango_${i}`)
    .style("stroke", "#c4c4c4")
    .style("stroke-width", "1px")
    .style("fill", "none")
    .attr("d", d => calculatePath(d.startAngle2, d.endAngle2));

mangoNameG.selectAll(".mangoText")
    .data(mangoData)
    .join("text")
    .attr("class", "mangoText")
    .append("textPath")
    .attr("startOffset", "50%")
    .style("text-anchor", "middle")
    .style("font-size", function () {
        if (screenSize === "medium") return 12
        if (screenSize === "small") return 7
        return 14
    })
    .style("font-weight", 400)
    .attr("xlink:href", (d, i) => "#mango_" + i)
    .text(d => d.data.name_en);


////////////////////////////////////////////////////////////
//////////////////// More functions ////////////////////////
////////////////////////////////////////////////////////////

const sortMangoByAttribute = () => {

    let sortedByAttr; //sort root baed on attribute
    if(mode==='size'){
        sortedByAttr = root.sort((a, b) => d3.ascending(a.data.size_cm, b.data.size_cm))
    }else{
        sortedByAttr = root.sort((a, b) => d3.ascending(a.data.sweetness_brix, b.data.sweetness_brix))
    }

    let mangoDataSorted = cluster(sortedByAttr).leaves()

    mangoDataSorted.forEach(function (d, i) {
        d.centerAngle = (d.x - centerAdjustment) * Math.PI / 180;
    })

    return addAttributes(mangoDataSorted);
}

const drawSortedMangoes = (data) => {

    circleG.selectAll("#text1,#text2,#text3,#text4")
        .transition().duration(500)
        .text("");

    d3.selectAll("image.mango")
        .data(data, d => d.id)
        .join("image")
        .attr("class", "mango")
        .transition()
        .delay((d, i) => 50 * i)
        .duration(1000)
        .attr("x", d => d.x - imgWidth / 2)
        .attr("y", d => d.y - imgWidth / 2)
        .attr("width", imgWidth)
        .attr("height", imgWidth)
        .attr("xlink:href", d =>`${images[d.data.name]}`)

    mangoNameG.selectAll(".mangoArc")
        .data(data)
        .join(
        enter => enter.append("path")
            .attr("class", "mangoArc")
            .attr("class", "mangoArc")
            .style("stroke", "#c4c4c4")
            .style("stroke-width", "1px")
            .style("fill", "none")
        )
        .attr("id", (d, i) => `mango_${i}`)
        .transition()
        .delay((d, i) => 50 * i)
        .duration(1000)
        .attr("d", d => calculatePath(d.startAngle2, d.endAngle2))

    mangoNameG.selectAll(".mangoText")
        .data(data)
        .join(
            enter => enter.append("text")
                .attr("class", "mangoText")
                .append("textPath"),
            update => update
                .attr("class", "mangoText")
                .select("textPath")
        )
        .attr("startOffset", "50%")
        .style("text-anchor", "middle")
        .style("font-weight", 400)
        .style("font-size", function () {
            if (screenSize === "medium") return 12
            if (screenSize === "small") return 7
            return 14
        })
        .transition()
        .delay((d, i) => 50 * i)
        .duration(1000)
        .attr("xlink:href", (d, i) => "#mango_" + i)
        .text(d => d.data.name_en);
        //SEPARATE THE ABOVE FOR UPDATE vs ENTER ELEMENTS, FOR UPDATE USE SELECT, FOR ENTER USE APPEND
}

const rearrageMangoData = (data) => {

    const filtered_hierarchy = mangoes.filter(d => d.name !== data.name);
    // filter the selected mango out since it will be moved to the center
    const root2 = d3.stratify()
        .id(d => d.name)
        .parentId(d => d.parent)
        (filtered_hierarchy);

    let rootSorted;
    if (mode === "size") {
        rootSorted = root2.sort((a, b) => d3.ascending(a.data.size_cm, b.data.size_cm))
    } else {
        rootSorted = root2.sort((a, b) => d3.ascending(a.data.sweetness_brix, b.data.sweetness_brix))
    } //this is to prevent redrawing, for example, if the current order is sort by size instead of sweetness,
    // when the user clicks on a mango it won't sort it by sweetness before moving the mango to the middle

    //before cluster,the children's includes the following attributes...
    // data: {parent: 'All', name: '夏雪', name_en: 'XiaXue' ...}
    // depth: 1
    // height: 0
    // id: "夏雪"

    cluster(rootSorted);

    //after cluster, the children's also has parent, x & y
    // parent: pd {data: {…}, height: 1, depth: 0, parent: null, id: 'All'...}
    // x: 8.181818181818182
    // y: 0

    let filteredData = rootSorted.children.filter(d => d.data.name !== data.name);
    const selectedData = root.children.filter(d => d.data.name === data.name);

    d3.map(selectedData, function (d) {
        d.x = 0;
        d.y = 0;
        d.cluster = 22;
    })

    filteredData.forEach(function (d, i) {
        d.centerAngle = (d.x - centerAdjustment) * Math.PI / 180;
    });

    const mango_angle_distance = filteredData[1].centerAngle - filteredData[0].centerAngle;
    filteredData =  addAttributes(filteredData,mango_angle_distance);

    //after the above step, the children includes also the following attributes, with x and y updated:
    // centerAngle: 0.27369935997183803
    // cluster: 0
    // endAngle: 0.4164990260441014
    // endAngle2: 0.39269908169872414
    // startAngle: 0.13089969389957468
    // startAngle2: 0.1546996382449519
    // x: 72.97963350023863
    // y: -259.94994343944535

    return [filteredData, filteredData.concat(selectedData)];
}

const mangoClicked = (dataFiltered, data) => {

    const selected = data.filter(d => d.cluster === 22);

    d3.selectAll("image.mango")
        .data(data, d => d.id)
        .join("svg:image")
        .attr("class", "mango")
        .transition()
        .duration(1000)
        .attr("x", d => d.cluster === 22 ? d.x - (imgWidth + imgIncrease) / 2 : d.x - imgWidth / 2)
        .attr("y", d => d.cluster === 22 ? d.y - (imgWidth + imgIncrease) / 2 : d.y - imgWidth / 2)
        .attr("width", d => d.cluster === 22 ? imgWidth + imgIncrease : imgWidth)
        .attr("height", d => d.cluster === 22 ? imgWidth + imgIncrease : imgWidth)
        .attr("xlink:href", d => `${images[d.data.name]}`)

    //dataFiltered doesn't include the mango in the middle, so can use it for the labels

    d3.selectAll(".mangoArc")
        .data(dataFiltered)
        .join("path")
        .attr("class", "mangoArc")
        .style("stroke", "#c4c4c4")
        .style("stroke-width", "1px")
        .style("fill", "none")
        .attr("id", (d, i) => `mango_${i}`)
        .transition()
        .delay((d, i) => 20 * i)
        .duration(1000)
        .attr("d", d => calculatePath(d.startAngle2, d.endAngle2));

    d3.selectAll(".mangoText")
        .data(dataFiltered)
        .join("text")
        .attr("class", "mangoText")
        .select("textPath")
        .attr("startOffset", "50%")
        .style("text-anchor", "middle")
        .style("font-weight", 400)
        .transition()
        .delay((d, i) => 20 * i)
        .duration(1000)
        .attr("xlink:href", (d, i) => "#mango_" + i)
        .style("opacity", 1)
        .text(d => d.data.name_en);

    // Update the text in the middle

    circleG.select("#text1")
        .datum(selected[0])
        .transition().duration(500)
        .attr("x", d => d.x)
        .attr("y", d => d.y + imgIncrease - 20 + 2 * d.data.size_cm)
        .style("opacity", 1)
        .text(d => d.data.name_en);

    circleG.select("#text2")
        .datum(selected[0])
        .transition().duration(500)
        .attr("x", d => d.x)
        .attr("y", d => d.y + imgIncrease - 20 + 2 * d.data.size_cm + 30)
        .style("font-size", function () {
            if (screenSize === "small") return 10
            return 16
        })
        .style("opacity", 1)
        .text(function (d) {
            if (screenSize === "small") return ""
            return `Size: ${d.data.size_cm} cm`
        });

    circleG.select("#text3")
        .datum(selected[0])
        .transition().duration(500)
        .attr("x", d => d.x)
        .attr("y", d => d.y + imgIncrease - 20 + 2 * d.data.size_cm + 50)
        .style("font-size", function () {
            if (screenSize === "small") return 10
            return 16
        })
        .style("opacity", 1)
        .text(function (d) {
            if (screenSize === "small") return ""
            return `Sweetness: ${d.data.sweetness_brix} °Bx`
        });

    circleG.select("#text4")
        .datum(selected[0])
        .attr("x", d => d.x)
        .attr("y", d => d.y + imgIncrease - 20 + 2 * d.data.size_cm + 56)
        .attr("dy", 1)
        .style("font-size", function () {
            if (screenSize === "small") return 10
            return 16
        })
        .style("opacity", windowWidth <= 992 ? 0 : 1)
        .text(function (d) {
            if (screenSize === "small") return ""
            return d.data.feature_en
        })
        .call(wrap, windowWidth <= 992 ? 150 : 250);
}

////////////////////////////////////////////////////////////
///////////// Click events to sort mangooes ////////////////
////////////////////////////////////////////////////////////

$('#size').on('click', function () {
    mode = 'size';
    const mangoDataSize = sortMangoByAttribute();
    $("#size").addClass("active");
    $("#sweetness").removeClass("active");
    drawSortedMangoes(mangoDataSize);
});

$('#sweetness').on('click', function () {
    mode = 'sweet';
    const mangoDataSweetness = sortMangoByAttribute();
    $("#sweetness").addClass("active");
    $("#size").removeClass("active");
    drawSortedMangoes(mangoDataSweetness);
});

