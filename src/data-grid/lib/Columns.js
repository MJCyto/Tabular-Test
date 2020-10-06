import React from 'react';
import { SelectCellFormatter } from './formatters';
import { stopPropagation } from './utils';
export const SELECT_COLUMN_KEY = 'select-row';
export const SelectColumn = {
    key: SELECT_COLUMN_KEY,
    name: '',
    width: 35,
    maxWidth: 35,
    resizable: false,
    sortable: false,
    frozen: true,
    headerRenderer(props) {
        return (React.createElement(SelectCellFormatter, { "aria-label": "Select All", value: props.allRowsSelected, onChange: props.onAllRowsSelectionChange }));
    },
    formatter(props) {
        return (React.createElement(SelectCellFormatter, { "aria-label": "Select", tabIndex: -1, isCellSelected: props.isCellSelected, value: props.isRowSelected, onClick: stopPropagation, onChange: props.onRowSelectionChange }));
    },
    groupFormatter(props) {
        return (React.createElement(SelectCellFormatter, { "aria-label": "Select Group", tabIndex: -1, isCellSelected: props.isCellSelected, value: props.isRowSelected, onChange: props.onRowSelectionChange,
            // Stop propagation to prevent row selection
            onClick: stopPropagation }));
    }
};
//# sourceMappingURL=Columns.js.map
