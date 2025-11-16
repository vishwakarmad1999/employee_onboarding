export const fields = [
    {
        id: "name",
        type: "text",
        label: "Name",
    },
    {
        id: "email",
        type: "email",
        label: "Email",
    },
    {
        id: "department",
        type: "select",
        label: "Department",
        defaultValue: "hr",
        options: [
            {
                value: "hr",
                text: "Human Resource"
            },
            {
                value: "eng",
                text: "Engineering"
            },
            {
                value: "finance",
                text: "Finance",
            },
            {
                value: "sales",
                text: "Sales"
            }
        ]
    },
    {
        id: "designation",
        type: "text",
        label: "Designation"
    }
]
