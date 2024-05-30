interface table_options {
    field: string;
    headerText: string;
    textAlign: string;
    type: string;
    width: number;
}

export const Vendor_tHeaders: table_options[] = [
    {
        field: 'id',
        headerText: 'ID',
        textAlign: 'Left',
        type: 'string',
        width: 30
    },
    {
        field: 'name',
        headerText: 'Name',
        textAlign: '',
        type: 'string',
        width: 60
    },
    {
        field: 'address',
        headerText: 'Address',
        textAlign: 'Left',
        type: 'string',
        width: 90
    },
    {
        field: 'mobileNo',
        headerText: 'Mobile No',
        textAlign: 'Left',
        type: 'number',
        width: 60
    },
    {
        field: 'email',
        headerText: 'E mail',
        textAlign: 'Left',
        type: 'email',
        width: 60
    },
    {
        field: 'supplyAssetType',
        headerText: 'SupplyAssetType',
        textAlign: 'Left',
        type: 'boolean',
        width: 60
    }
]