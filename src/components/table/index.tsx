import DataTable, { TableColumn } from 'react-data-table-component';
import 'tailwindcss/tailwind.css';

interface PaginationOptions {
    rowsPerPage: number;
    totalRows: number;
    currentPage: number;
}

interface DataTableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    pagination?: boolean;
    paginationOptions?: PaginationOptions;
    onPageChange?: (page: number) => void;
    customStyles?: any;
}

const defaultCustomStyles = {
    rows: {
        style: {
            minHeight: '48px',
            backgroundColor:"#E5E4E2",
            fontSize:"18px"
        },
    },
    headCells: {
        style: {
            backgroundColor: '#ff0000',
            color: '#ffffff',
            fontSize:"18px"
        },
    },
    cells: {
        style: {
            padding: '16px',
        },
    },
};

const CustomDataTable = <T extends unknown>({
    columns,
    data,
    pagination = false,
    paginationOptions,
    onPageChange,
    customStyles = defaultCustomStyles,
}: DataTableProps<T>) => {
    return (
        <div className="w-full bg-white border rounded-lg">
            <DataTable
                columns={columns}
                data={data}
                pagination={pagination}
                paginationServer={!!paginationOptions}
                paginationTotalRows={paginationOptions?.totalRows}
                paginationPerPage={paginationOptions?.rowsPerPage}
                paginationDefaultPage={paginationOptions?.currentPage}
                onChangePage={onPageChange}
                customStyles={customStyles}
            />
        </div>
    );
};


export default CustomDataTable;