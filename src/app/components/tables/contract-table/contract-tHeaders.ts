interface table_options {
    field: string;
    headerText: string;
    textAlign: string;
    type: string;
    width: number;
}

export const Contract_tHeaders: table_options[] = [
    {
        field: 'id',
        headerText: 'ID',
        textAlign: 'Left',
        type: 'string',
        width: 30
    },
    {
        field: 'assignedDate',
        headerText: 'Contract Date',
        textAlign: '',
        type: 'Date',
        width: 60
    },
    {
        field: 'subject',
        headerText: 'Subject',
        textAlign: '',
        type: 'string',
        width: 60
    },
    {
        field: 'message',
        headerText: 'Message',
        textAlign: 'Left',
        type: 'string',
        width: 90
    },
    {
        field: 'supplyAssetType',
        headerText: 'Supply Asset Type',
        textAlign: 'Left',
        type: 'string',
        width: 60
    },
    {
        field: 'idOfVendor',
        headerText: 'Contract Vendor Id',
        textAlign: 'Left',
        type: 'string',
        width: 60
    },
    {
        field: 'vendorName',
        headerText: 'Contract Vendor Name',
        textAlign: 'Left',
        type: 'string',
        width: 60
    }
]