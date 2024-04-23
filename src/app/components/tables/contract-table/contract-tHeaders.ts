interface table_options {
    field: string;
    headerText: string;
    textAlign: string;
    type: string;
    width: number;
}

export const Contract_tHeaders: table_options[] = [
    {
        field: 'contract_id',
        headerText: 'ID',
        textAlign: 'Left',
        type: 'string',
        width: 30
    },
    {
        field: 'contract_date',
        headerText: 'Contract Date',
        textAlign: '',
        type: 'Date',
        width: 60
    },
    {
        field: 'title',
        headerText: 'Title',
        textAlign: '',
        type: 'string',
        width: 60
    },
    {
        field: 'description',
        headerText: 'Description',
        textAlign: 'Left',
        type: 'string',
        width: 90
    },
    {
        field: 'contract_assets',
        headerText: 'Contract Assets',
        textAlign: 'Left',
        type: 'string[]',
        width: 60
    },
    {
        field: 'contract_vendors',
        headerText: 'Contract Vendors',
        textAlign: 'Left',
        type: 'string[]',
        width: 60
    }
]