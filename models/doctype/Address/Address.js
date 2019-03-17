module.exports = {
    "name": "Address",
    "doctype": "DocType",
    "isSingle": 0,
    "keywordFields": [
        "name"
    ],
    pageSettings: {
        hideTitle: true
    },
    // "naming": "autoincrement",
    "fields": [
        {
            "fieldname": "name",
            "label": "Address Title",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "addressType",
            "label": "Address Type",
            "fieldtype": "Select",
            "options": [
                "Billing", "Shipping", "Office",
                "Personal", "Plant", "Postal",
                "Shop", "Subsidary", "Warehouse",
                "Current", "Permanent", "Other"
            ]
        },
        {
            "fieldname": "addressLine1",
            "label": "Address Line 1",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "addressLine2",
            "label": "Address Line 2",
            "fieldtype": "Data"
        },
        {
            "fieldname": "city",
            "label": "City / Town",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "state",
            "label": "State",
            "fieldtype": "Data"
        },
        {
            "fieldname": "country",
            "label": "Country",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "postalCode",
            "label": "Postal Code",
            "fieldtype": "Data"
        },
        {
            "fieldname": "emailAddress",
            "label": "Email Address",
            "fieldtype": "Data"
        },
        {
            "fieldname": "phone",
            "label": "Phone",
            "fieldtype": "Data"
        },
        {
            "fieldname": "fax",
            "label": "Fax",
            "fieldtype": "Data"
        },
        {
            "fieldname": "isPreferredBilling",
            "label": "Preferred Billing Address",
            "fieldtype": "Check"
        },
        {
            "fieldname": "isShippingBilling",
            "label": "Preferred Shipping Address",
            "fieldtype": "Check"
        }
    ],

    // events: {
    //     validate: (doc) => {

    //     }
    // },

    listSettings: {
        getFields(list)  {
            return ['name', 'addressType'];
        },
        getRowHTML(list, data) {
            return `<div class="col-11">${list.getNameHTML(data)} (${data.addressType})</div>`;
        }
    },

    layout: [
        // section 1
        {
            columns: [
                {
                    fields: [ 
                        "name", "addressType", "addressLine1",
                        "addressLine2", "city", "country", "state",
                        "postalCode"
                    ]
                },
                {
                    fields: [
                        "emailAddress", "phone", "fax", "isPreferredBilling", "isShippingBilling"
                    ]
                }
            ]
        }
    ]
}