import React, {createRef, useRef, useState} from "react";
import {reportMeta, reportPersonalTemplate} from "./ResponseData";
import ReactJson from "react-json-view";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import personalreport from "./personalreport";
import GridAccordion from "./components/GridAccordion";
import _ from "lodash"

// get report template
const personalTemplate = JSON.parse(reportPersonalTemplate.find(pt => pt.name === 'Personal').payload);

let hazardRating = 'hazardRating';
// get observation meta
const report = reportMeta.metaTables.find(mt => mt.mapping === hazardRating)

// get columns from hazard rating
const hazardRatingColumns = personalTemplate.observationColumns[hazardRating]

// add meta to columns
const decoratedColumns = Object.keys(hazardRatingColumns)
    .map((key) => ({key, ...hazardRatingColumns[key]}))
    .filter(col => col.visible)
    .map((col) => {
        let metaData = report.columns.find(c => c.mapping === col.key);
        return {...col, ...metaData}
    })


let columnDefs = decoratedColumns.map(dc => {
    const def = {
        headerName: dc.name,
        field: dc.key,
        editable: true,
        colId: dc.key,
        width: dc.width + 36,
        sortable: true
    }
    return def
})

const reportTabularElement = personalreport[hazardRating];
const realRowData = reportTabularElement.map(data => {
    const rowData = {}

    columnDefs.forEach(cd => {
        rowData[cd.colId] = data[cd.colId]
    })

    return rowData
})

const groupedData = _.groupBy(realRowData, 'confidence')


const rowData = [
    {make: "Toyota", model: "Celica", price: 35000},
    {make: "Ford", model: "Mondeo", price: 32000},
    {make: "Porsche", model: "Boxter", price: 72000}
]


export const AvalancheHazardOperation = props => {
    const [sortField, setSortField] = useState('operationUUID')
    const [stateColumnDefs, setStateColumnDefs] = useState(_.clone(columnDefs))
    const elementsRef = useRef(Object.keys(groupedData).map(() => createRef()))

    const consoleLogEvent = (event) => {
        console.log(event)
    }


    let onSortChanged = (event) => {
        // set the sort on the header for all
        let sortColumn = event.columnApi.columnController.gridColumns.find(gc => gc.sort);
        console.log(sortColumn)
        setSortField(sortColumn.colId)
    };

    let onDragStopped = (event) => {
        // set the sort on the header for all
        let sortColumn = event.columnApi.columnController.gridColumns.map(sc => sc.colDef)
        // setSortField(sortColumn.colId)
        console.log(sortColumn)
        // setStateColumnDefs(sortColumn)
        // elementsRef.current.forEach(ref => ref.gridOptions.api.setColumnDefs(sortColumn))
        // console.log(stateColumnDefs)
    };


    const gridOptions = {
        // Add event handlers
        onRowClicked: function (event) {
            console.log('A row was clicked');
        },
        onColumnResized: function (event) {
            console.log('A column was resized');
        },
        onGridReady: function (event) {
            console.log('The grid is now ready');
        },
        defaultColDef: {
            filter: true, // set filtering on for all columns
            sortable: true
        },
        onDisplayedColumnsChanged: consoleLogEvent,
        onDragStopped: onDragStopped,
        onColumnMoved: consoleLogEvent,
        onColumnClicked: consoleLogEvent,
        onSortChanged: onSortChanged


    }


    const groupedColDefs = _.cloneDeep(stateColumnDefs).map(cd => {
            return {...cd}
    })

    const sortedGroupedData = Object.keys(groupedData).map(key => {

    })


    return (
        <div>
            <h1>GRID</h1>
            <button onClick={() => setSortField('confidence')}>DO THTE THING</button>
            <div className="ag-theme-alpine" style={{height: 400, width: "100%"}}>
                <AgGridReact
                    gridOptions={gridOptions}
                    rowData={rowData}>
                    <AgGridColumn field="make"/>
                    <AgGridColumn field="model"/>
                    <AgGridColumn field="price"/>
                </AgGridReact>
            </div>
            <h1>REAL DATA GRID</h1>

            <GridAccordion name={"Real Data"}>
            <div className="ag-theme-alpine" style={{ width: "100%"}}>
                    <div>
                            column headers
                    </div>
                    {Object.keys(groupedData).map((key, index) => {
                            console.log("HEYHEYHEY")
                        let groupedDatum = _.sortBy(groupedData[key], sortField);
                        console.log(groupedDatum)
                            return <GridAccordion name={key}>
                                    <div className="ag-theme-alpine" style={{height: "700px", width: "100%"}}>

                                    <AgGridReact
                                        ref={elementsRef.current[index]}
                                        gridOptions={gridOptions}
                                        columnDefs={stateColumnDefs}
                                        rowData={groupedDatum}
                                    >

                                    </AgGridReact>
                                    </div>
                            </GridAccordion>
                    })}

                <AgGridReact
                    gridOptions={gridOptions}
                    columnDefs={stateColumnDefs}
                    rowData={realRowData}>
                </AgGridReact>
            </div>
            </GridAccordion>




            <h1> JSON </h1>
            <h3>personalTemplate</h3>
            <ReactJson src={personalTemplate}/>
            {/*<h3>tabular data</h3>*/}
            {/*<ReactJson src={realRowData}/>*/}
            <h3>decoratedColumns</h3>
            <ReactJson src={decoratedColumns}/>
        </div>
    )
}
