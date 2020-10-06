import React, { createElement } from 'react';
import clsx from 'clsx';
import SortableHeaderCell from './headerCells/SortableHeaderCell';
import ResizableHeaderCell from './headerCells/ResizableHeaderCell';
function getAriaSort(sortDirection) {
    switch (sortDirection) {
        case 'ASC':
            return 'ascending';
        case 'DESC':
            return 'descending';
        default:
            return 'none';
    }
}
export default function HeaderCell({ column, onResize, allRowsSelected, onAllRowsSelectionChange, sortColumn, sortDirection, onSort }) {
    function getCell() {
        if (!column.headerRenderer)
            return column.name;
        return createElement(column.headerRenderer, { column, allRowsSelected, onAllRowsSelectionChange });
    }
    let cell = getCell();
    if (column.sortable) {
        cell = (React.createElement(SortableHeaderCell, { column: column, onSort: onSort, sortColumn: sortColumn, sortDirection: sortDirection }, cell));
    }
    const className = clsx('rdg-cell', column.headerCellClass, {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-frozen-last': column.isLastFrozenColumn
    });
    const style = {
        width: column.width,
        left: column.left
    };
    cell = (React.createElement("div", { role: "columnheader", "aria-colindex": column.idx + 1, "aria-sort": sortColumn === column.key ? getAriaSort(sortDirection) : undefined, className: className, style: style }, cell));
    if (column.resizable) {
        cell = (React.createElement(ResizableHeaderCell, { column: column, onResize: onResize }, cell));
    }
    return cell;
}
//# sourceMappingURL=HeaderCell.js.map