export class Users {
    Username : string
    Password : string
}
export class Token{
    token: string;
}
export class Property{
    property : string;
}
export const dropdowntableSettings={
    idField: 'SrNo',
    textField: 'DeviceID',
    allowSearchFilter : true,
    itemsShowLimit: 3,
}
export const  dropdownpolarSettings={
    idField: 'name',
    textField: 'title',
    singleSelection:true,
    allowSearchFilter : true,
    itemsShowLimit: 3,
    closeDropDownOnSelection : true
}
export const dropdownbubbleSettings ={
    
    idField: 'name',
    textField: 'title',
    singleSelection:false,
    allowSearchFilter : true,
    itemsShowLimit: 3,

}
export const charts=[
    dropdownbubbleSettings,dropdownpolarSettings
]