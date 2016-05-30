

    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
    };

function renderTimelineTree() {
    $.ajax({
        type: 'GET',
        crossDomain : true,
        url: 'http://localhost:8080/stubtimeline/tree/task/detailed',
        success: drawTimelineTree,
        error: handleError
    });
}

function drawTimelineTree(timeline){

    var tableContents = '<div class="tabcontent"><table class="tabular"><tbody>';


    timeline.treeNodes.forEach(function(treeNode) {
        tableContents += renderIndent(treeNode);

        if (treeNode.type === 'SEGMENT') {
            tableContents += renderSegment(treeNode);
        } else if (treeNode.type === 'IDEA_FLOW_BAND') {
            tableContents += renderIdeaFlowBand(treeNode);
        } else if (treeNode.type === 'TIME_BAND_GROUP') {
            tableContents += renderTimeBandGroup(treeNode);
        } else {
            console.log('Unknown tree node type')
        }

    });

    tableContents += "</tbody></table></div>";
    $('#contentPanel').append(tableContents);

    //var rows = 6,
    //    cols = 7;
    //
    //for(var i = 0; i < rows; i++) {
    //
    //    for(var j = 0; j < cols; j++) {
    //        var td = table.find('tr').eq(i).append('<td>hi'+j+'</td>');
    //        table.find('tr').eq(i).find('td').eq(j).attr('data-row', i).attr('data-col', j);
    //
    //    }
    //}
}

function renderIndent(treeNode) {
    return '';
}

function renderSegment(treeNode) {
    var tableContents = '<tr class="subtask">';
    tableContents += '<td></td><td>'+treeNode.start+'</td>';
    tableContents += '<td>'+formatRelative(treeNode.relativeStart)+'</td>';

    tableContents += '<td>Subtask</td>';
    tableContents += '<td>'+treeNode.startingComment+'</td>';
    tableContents += '<td></td>';
    tableContents += '</tr>';
    return tableContents;
}

function renderIdeaFlowBand(treeNode) {
    var tableContents = '<tr class="eventrow">';
    tableContents += '<td class="'+treeNode.bandType.toLowerCase()+'type">&nbsp;&nbsp;&nbsp;</td>';
    tableContents += '<td>'+treeNode.start+'</td>';
    tableContents += '<td>'+formatRelative(treeNode.relativeStart)+'</td>';
    tableContents += '<td>'+treeNode.bandType.capitalizeFirstLetter()+'</td>';

    if (treeNode.bandType == 'CONFLICT') {
        tableContents += '<td><span class="question">'+treeNode.startingComment+'<br/></span>' +
            '<span class="answer">'+treeNode.endingComment+'</span></td>';
    } else if ( treeNode.bandType == 'PROGRESS') {
        tableContents += '<td></td>';
    } else {
        tableContents += '<td>'+treeNode.startingComment+'</td>';
    }
    tableContents += '<td>'+formatTime(treeNode.duration)+'</td>';

    tableContents += '</tr>';
    return tableContents;
}

    function formatRelative(time) {
        var d = Number(time);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);

        return ( h + ":" + (m < 10 ? "0" : "") + m );
    }

    function formatTime(duration) {
        var d = Number(duration);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(m % 3600 / 60);

        return ( (h > 0 ? h + "h " : "") + (m < 10 ? "0" : "") + m + "m " + (s < 10 ? "0" : "") + s + "s");
    }



    function renderTimeBandGroup(tableContents, treeNode) {
    return '<td>group</td>';
}

//<td class="${timeEntry.bandType}type">
//    &nbsp;&nbsp;&nbsp;
//</td>
//<td title="${timeEntry.startPosition.calendarTime} - ${timeEntry.endPosition.calendarTime}">
//        ${timeEntry.startPosition.shortTime} - ${timeEntry.endPosition.shortTime}
//    </td>
//    <td>
//    Conflict
//    </td>
//    <td>
//    <span class="question">${timeEntry.question}<br/></span>
//    <span class="answer">${timeEntry.answer}</span>
//    </td>
//    <td>
//    <span class="${timeEntry.bandType}pie">${timeEntry.percent}/100</span>&nbsp;
//${timeEntry.duration.hourMinSec}
//</td>



function tableCreate(){
    var body = document.body,
        tbl  = document.createElement('table');
    tbl.style.width  = '100px';
    tbl.style.border = '1px solid black';


    for(var i = 0; i < 3; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 2; j++){
            if(i == 2 && j == 1){
                break;
            } else {
                var td = tr.insertCell();
                td.appendChild(document.createTextNode('Cell'));
                td.style.border = '1px solid black';
                if(i == 1 && j == 1){
                    td.setAttribute('rowSpan', '2');
                }
            }
        }
    }
    $('#contentPanel').appendChild(tbl);
}