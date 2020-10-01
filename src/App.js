import React, {useState, Component} from "react";
import Fox from "../src/ff.svg";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {AgGridReact} from "ag-grid-react";

import {columnData, amLocal} from "./columnData";

class SquareRenderer extends Component {
        constructor(props) {
                super(props);

                this.state = {
                        value: this.valueSquared()
                };
        }

        valueSquared() {
                return this.props.value * this.props.value;
        }

        render() {
                return (
                    <span>
          <img src={Fox} alt='fuck' style={{width: "20px", height: "20px"}}/>
      </span>
                );
        }
}


const DefaultRenderer = (props) => {
        const {value} = props
        return <span> {value} </span>
}


function getCellRenderer(key) {
        return DefaultRenderer
}

const App = () => {

        const columnData = JSON.parse(JSON.stringify(columnData))[0];
        const recordData = JSON.parse(JSON.stringify(amLocal))[0];
        console.log(columnData)

        // const [gridApi, setGridApi] = useState(null);
        // const [gridColumnApi, setGridColumnApi] = useState(null);

        const rowData = recordData.generalMessage;

        let generalMessageColumns = rowData.observationColumns.generalMessage;
        const columnDefs = []

        // for each observation in observationList
        // go through every volumn in the observation
        // from each "Column type" get the appropriate renderer and width
        //
        Object.keys(generalMessageColumns)
            .forEach(key => {
                    let generalMessageColumn = generalMessageColumns[key];
                    const def = {
                            headerName: key,
                            field: "value",
                            editable: true,
                            cellRenderer: getCellRenderer(key),
                            colId: key,
                            width: generalMessageColumn.width
                    }

                    if (generalMessageColumn.visible) {
                            columnDefs.push(def)
                    }
            })
        console.log(columnDefs);
        return (
            <>
                    {rowData.observationsList.map(name => {
                            // get columsns for the observation

                    })}
                    <div className="ag-theme-alpine" style={{height: 400, width: "calc(100% - 50px)"}}>
                            <AgGridReact
                                columnDefs={columnDefs}
                                frameworkComponents={{
                                        squareRenderer: SquareRenderer
                                }}
                                rowData={rowData}
                            >
                            </AgGridReact>
                    </div>
            </>
        );
};

export default App;
