export class Cluster{
    id:string;
    trans_params=[
        ['Failed Transactions',
        'Successful Tansactions',
        'Supervisor Attendance',
        'Admin Attendance',
        'User Card Recharge',
        'Operator Card Recharge',
        'Machine Restart'
        ],
        [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '00'
        ]
        
    ]
  
    config_params = [

          ['SrNo', 'DeviceID', 'Flag', 'FLOW_CONSTANT_PFS', 'FLOW_CONSTANT_RFS', 'LOWER_CURRENT_LIMIT_RWP', 'UPPER_CURRENT_LIMIT_RWP', 'LOWER_CURRENT_LIMIT_HPP', 'UPPER_CURRENT_LIMIT_HPP', 'Current_Constant1', 'Current_Constant2', 'RO_Serialno', 'Backwash_Trigger_Time', 'RWP_Wait_Timeout', 'LPS_Wait_Timeout', 'Flushing_Time', 'Current_Sampling_Time', 'Flow_Sampling_Time', 'RO_Lock', 'Trigger_Backwash', 'WATER_VOL1', 'WATER_VOL2', 'WATER_VOL3', 'WATER_VOL4', 'WATER_VOL5', 'TARIFF_VOL1', 'TARIFF_VOL2', 'TARIFF_VOL3', 'TARIFF_VOL4', 'TARIFF_VOL5', 'PULSE_VOL1', 'PULSE_VOL2', 'PULSE_VOL3', 'PULSE_VOL4', 'PULSE_VOL5', 'COIN1_VOL', 'COIN2_VOL', 'COIN1_TARIFF', 'COIN2_TARIFF', 'COIN1_PULSE_TAP1', 'COIN2_PULSE_TAP1', 'COIN1_PULSE_TAP2', 'COIN2_PULSE_TAP2', 'COIN1_COUNT_PULSE', 'COIN2_COUNT_PULSE', 'SN_UPPER_BOUND', 'SN_LOWER_BOUND', 'OPERATOR_ID', 'SUPERVISOR_ID', 'ADMIN_ID', 'WDP_LOCK'],

          ['SrNo', 'DeviceID', 'Flag', 'FLOW CONSTANT PFS', 'FLOW CONSTANT RFS', 'LOWER CURRENT LIMIT RWP', 'UPPER CURRENT LIMIT RWP', 'LOWER CURRENT LIMIT HPP', 'UPPER CURRENT LIMIT HPP', 'Current Constant1', 'Current Constant2', 'RO Serialno', 'Backwash Trigger Time', 'RWP Wait Timeout', 'LPS Wait Timeout', 'Flushing Time', 'Current Sampling Time', 'Flow Sampling Time', 'RO Lock', 'Trigger Backwash', 'WATER VOL1', 'WATER VOL2', 'WATER VOL3', 'WATER VOL4', 'WATER VOL5', 'TARIFF VOL1', 'TARIFF VOL2', 'TARIFF VOL3', 'TARIFF VOL4', 'TARIFF VOL5', 'PULSE VOL1', 'PULSE VOL2', 'PULSE VOL3', 'PULSE VOL4', 'PULSE VOL5', 'COIN1 VOL', 'COIN2 VOL', 'COIN1 TARIFF', 'COIN2 TARIFF', 'COIN1 PULSE TAP1', 'COIN2 PULSE TAP1', 'COIN1 PULSE TAP2', 'COIN2 PULSE TAP2', 'COIN1 COUNT PULSE', 'COIN2 COUNT PULSE', 'SN UPPER BOUND', 'SN LOWER BOUND', 'OPERATOR ID', 'SUPERVISOR ID', 'ADMIN ID', 'WDP LOCK'],

          ['','','','','','A','A','A','A','','','','s','s','s','s','s','s','','','ml','ml','ml','ml','ml','','','','','','','','','','','','','','','','','','','','','','','','','','']
     ]
  
    clusters=[
        'Delhi','IRCTC','NISE','Guwahati'
        /* 1. Add cluster name. e.g. if name of cluster is ABC then append " ,'ABC' " to the above line*/
    ]

    
    Delhi={
        WaterDispenseData :
        [
            ["Total_Volume_Dispensed",
            'Total_Recharge',    
            "Total_collection_from_Card",
            "Total_collection_from_coin",
            "pH_of_water",
            "Total_Collection_Sale",
            // "Tank_Level",
            "TimeStamp",
            "DeviceID",
            
            ],
            ['Total Volume Dispensed',
            'Total Recharge',
            'Total Collection From Card',
            'Total Collection From Coin',
            'pH Of Water',
            'Total Collection',
            // 'Tank Level'
            ],
            [
                "L",
                "Rs",
                "Rs",
                "Rs",
                "",
                "Rs",
                // "%",        
                "",
                "",
                
            ],
            ['Water_Dispensing_Panel']
        ],

        RoData : [
            [
                "Operational_Minutes",
                "Backwash_cycle_count",
                "Temperature",
                "tds_inlet",
                "tds_outlet",
                "flow_inlet",
                "flow_reject",
                "current_rwp",
                "current_hpp",
                "total_treated_volume",
                "total_reject_volume",
                "UV_State",
                "Trip_state",
                "Tank_Level"

            ],
            [
                "Operational Time",
                "Backwash Cycle Count",
                "Temperature",
                "Tds Inlet",
                "Tds Outlet",
                "Flow Inlet",
                "Flow Reject",
                "Raw Water Pump Current",
                "High Pressure Pump Current",
                "Total Treated Volume",
                "Total Reject Volume",
                "UV State",
                "Trip State",
                "Tank Level"
            ],
            [
                "mins",
                "",
                "C",
                "ppm",
                "ppm",
                "lph",
                "lph",
                "A",
                "A",
                "L",
                "L",
                "",
                "",
                "%"
            ],
            ['RO_Log_Parameter']

        ]
,
        CupDispenseData :[
            [
                "TotalCupsDispensed",
                "TotalCoinCollection",
                "TotalCardCollection",
                "TripState"
            ],
            [
                "Total Cups Dispensed",
                "Total Coin Collection",
                "Total Card Collection",
                "Last Transaction State"
            ],
            [
                "",
                "Rs",
                "Rs",
                ""
            ],
            ['CupDispensing']
        ],
            transaction :[
            [
                "date",
                "Time",
                "TapNo",
                "Type_of_Request",
                "CardNo",
                "Quantity",
                "Amount",
                "DispenseTime",
                "Card_Balance",
                "Total_Recharge",
                "Expiry_Date"
            ],
            [
                "Date",
                "Time",
                "Tap No.",
                "Type Of Request",
                "Card No.",
                "Quantity",
                "Amount",
                "Dispense Time",
                "Card Balance",
                "Total Recharge",
                "Card Expiry Date"
            ],
            [   
                "",
                "",
                "",
                "",
                "",
                "ml",
                "Rs",
                "sec",
                "Rs",
                "Rs",
                ""
            ],
            ['Transaction_logging']
        ],
        supervisorData :[
            [
                "TimeStamp",
                "Trip_CollectionID",
                "Trip_Total_Reset_Count",
                "Trip_Total_Volume_Dispensed",
                "Trip_Total_Smartcard_Collection",
                "Trip_Total_CoinCollection",
                "Trip_Total_Card_Recharge",
                "Total_Collection_Sale",
                "Trip_Actual_Amount_Collection"
            ],
            [
                "Time",
                "Trip Collection ID",
                "Trip Total Reset Count",
                "Trip Total Volume Dispensed",
                "Trip Total Smartcard Collection",
                "Trip Total Coin Collection",
                "Trip Total Card Recharge",
                "Total Collection Sale",
                "Trip Actual Amount Collection"

            ],
            [
                "",
                "",
                "",
                "L",
                "Rs",
                "Rs",
                "Rs",
                "Rs",
                "Rs"
            ],
            ['SuperVisor_Login']
        ],

        operator: [
            [   
                "OperatorID",
                "PunchTime" 
            ],
            [
                "Operator Id",
                "Date",
                "Expected Punches" ,        
            ],
            [
                "",
                "",
                ""
            ],
            ['Operator_Attendence']

    ]
    }
    IRCTC={
        WaterDispenseData :
        [
            ["Total_Volume_Dispensed",
            'Total_Recharge',    
            "Total_collection_from_Card",
            "Total_collection_from_coin",
            "pH_of_water",
            "Total_Collection_Sale",

            "TimeStamp",
            "DeviceID",
            
        ],
            ['Total Volume Dispensed',
            'Total Recharge',
            'Total Collection From Card',
            'Total Collection From Coin',
            'pH Of Water',
            'Total Collection',

        ],
            [
                "L",
                "Rs",
                "Rs",
                "Rs",
                "",
                "Rs",
     
                "",
                "",
                
            ],
            ['Water_Dispensing_Panel']
        ],

        RoData : [
            [
                "Operational_Minutes",
                "Backwash_cycle_count",
                "Temperature",
                "tds_inlet",
                "tds_outlet",
                "flow_inlet",
                "flow_reject",
                "current_rwp",
                "current_hpp",
                "total_treated_volume",
                "total_reject_volume",
                "UV_State",
                "Trip_state",
                "Tank_Level"

            ],
            [
                "Operational Time",
                "Backwash Cycle Count",
                "Temperature",
                "Tds Inlet",
                "Tds Outlet",
                "Flow Inlet",
                "Flow Reject",
                "Raw Water Pump Current",
                "High Pressure Pump Current",
                "Total Treated Volume",
                "Total Reject Volume",
                "UV State",
                "Trip State",
                "Tank Level"
            ],
            [
                "mins",
                "",
                "C",
                "ppm",
                "ppm",
                "lph",
                "lph",
                "A",
                "A",
                "L",
                "L",
                "",
                "",
                "%"
            ],
            ['RO_Log_Parameter']

        ]
,
        CupDispenseData :[
            [
                "TotalCupsDispensed",
                "TotalCoinCollection",
                "TotalCardCollection",
                "TripState"
            ],
            [
                "Total Cups Dispensed",
                "Total Coin Collection",
                "Total Card Collection",
                "Last Transaction State"
            ],
            [
                "",
                "Rs",
                "Rs",
                ""
            ],
            ['CupDispensing']
        ],
            transaction :[
            [
                "Time",
                "TapNo",
                "Type_of_Request",
                "CardNo",
                "Quantity",
                "Amount",
                "DispenseTime",
                "Card_Balance",
                "Total_Recharge",
                "Expiry_Date"
            ],
            [
                "Time",
                "Tap No.",
                "Type Of Request",
                "Card No.",
                "Quantity",
                "Amount",
                "Dispense Time",
                "Card Balance",
                "Total Recharge",
                "Card Expiry Date"
            ],
            [
                "",
                "",
                "",
                "",
                "ml",
                "Rs",
                "sec",
                "Rs",
                "Rs",
                ""
            ],
            ['Transaction_logging']
        ],
        supervisorData :[
            [
                "TimeStamp",
                "Trip_CollectionID",
                "Trip_Total_Reset_Count",
                "Trip_Total_Volume_Dispensed",
                "Trip_Total_Smartcard_Collection",
                "Trip_Total_CoinCollection",
                "Trip_Total_Card_Recharge",
                "Total_Collection_Sale",
                "Trip_Actual_Amount_Collection"
            ],
            [
                "Time",
                "Trip Collection ID",
                "Trip Total Reset Count",
                "Trip Total Volume Dispensed",
                "Trip Total Smartcard Collection",
                "Trip Total Coin Collection",
                "Trip Total Card Recharge",
                "Total Collection Sale",
                "Trip Actual Amount Collection"

            ],
            [
                "",
                "",
                "",
                "L",
                "Rs",
                "Rs",
                "Rs",
                "Rs",
                "Rs"
            ],
            ['SuperVisor_Login']
        ],

        operator: [
            [   
                "OperatorID",
                "PunchTime" 
            ],
            [
                "Operator Id",
                "Date",
                "Expected Punches" ,        
            ],
            [
                "",
                "",
                ""
            ],
            ['Operator_Attendence']

    ]
    }
    NISE={
        WaterDispenseData :
        [
            ["Total_Volume_Dispensed",
            'Total_Recharge',    
            "Total_collection_from_Card",
            "Total_collection_from_coin",
            "pH_of_water",
            "Total_Collection_Sale",
            "PV_Voltage",
            "PV_Current",
            "Battery_Voltage",
            "Battery_Current",
            "Load_Voltage",
            "Load_Current",
            "TimeStamp",
            "DeviceID",
            
        ],
            ['Total Volume Dispensed',
            'Total Recharge',
            'Total Collection From Card',
            'Total Collection From Coin',
            'pH Of Water',
            'Total Collection',
            "PV Voltage",
            "PV Current",
            "Battery Voltage",
            "Battery Current",
            "Load Voltage",
            "Load Current",
        ],
            [
                "L",
                "Rs",
                "Rs",
                "Rs",
                "",
                "Rs",
                "Volts",
                "A",
                "Volts",
                "A",
                "Volts",
                "A",
                "",
                "",
                
            ],
            ['NISE_Water_Dispensing_Panel']
        ],

        RoData : [
            [
                "Operational_Minutes",
                "Backwash_cycle_count",
                "Temperature",
                "tds_inlet",
                "tds_outlet",
                "flow_inlet",
                "flow_reject",
                "current_rwp",
                "current_hpp",
                "total_treated_volume",
                "total_reject_volume",
                "UV_State",
                "Trip_state",
                "Tank_Level"

            ],
            [
                "Operational Time",
                "Backwash Cycle Count",
                "Temperature",
                "Tds Inlet",
                "Tds Outlet",
                "Flow Inlet",
                "Flow Reject",
                "Raw Water Pump Current",
                "High Pressure Pump Current",
                "Total Treated Volume",
                "Total Reject Volume",
                "UV State",
                "Trip State",
                "Tank Level"
            ],
            [
                "mins",
                "",
                "C",
                "ppm",
                "ppm",
                "lph",
                "lph",
                "A",
                "A",
                "L",
                "L",
                "",
                "",
                "%"
            ],
            ['NISE_RO_Log_Parameter']

        ]
,
        CupDispenseData :[
            [
                "TotalCupsDispensed",
                "TotalCoinCollection",
                "TotalCardCollection",
                "TripState"
            ],
            [
                "Total Cups Dispensed",
                "Total Coin Collection",
                "Total Card Collection",
                "Last Transaction State"
            ],
            [
                "",
                "Rs",
                "Rs",
                ""
            ],
            ['NISE_CupDispensing']
        ],
            transaction :[
            [
                "Time",
                "TapNo",
                "Type_of_Request",
                "CardNo",
                "Quantity",
                "Amount",
                "DispenseTime",
                "Card_Balance",
                "Total_Recharge",
                "Expiry_Date"
            ],
            [
                "Time",
                "Tap No.",
                "Type Of Request",
                "Card No.",
                "Quantity",
                "Amount",
                "Dispense Time",
                "Card Balance",
                "Total Recharge",
                "Card Expiry Date"
            ],
            [
                "",
                "",
                "",
                "",
                "ml",
                "Rs",
                "sec",
                "Rs",
                "Rs",
                ""
            ],
            ['NISE_Transaction_logging']
        ],
        supervisorData :[
            [
                "TimeStamp",
                "Trip_CollectionID",
                "Trip_Total_Reset_Count",
                "Trip_Total_Volume_Dispensed",
                "Trip_Total_Smartcard_Collection",
                "Trip_Total_CoinCollection",
                "Trip_Total_Card_Recharge",
                "Total_Collection_Sale",
                "Trip_Actual_Amount_Collection"
            ],
            [
                "Time",
                "Trip Collection ID",
                "Trip Total Reset Count",
                "Trip Total Volume Dispensed",
                "Trip Total Smartcard Collection",
                "Trip Total Coin Collection",
                "Trip Total Card Recharge",
                "Total Collection Sale",
                "Trip Actual Amount Collection"

            ],
            [
                "",
                "",
                "",
                "L",
                "Rs",
                "Rs",
                "Rs",
                "Rs",
                "Rs"
            ],
            ['NISE_SuperVisor_Login']
        ],

        operator: [
            [   
                "OperatorID",
                "PunchTime" 
            ],
            [
                "Operator Id",
                "Date",
                "Expected Punches" ,        
            ],
            [
                "",
                "",
                ""
            ],
            ['NISE_Operator_Attendence']

    ]
    }
    Guwahati={
        WaterDispenseData :
        [
            ["Total_Volume_Dispensed",
            'Total_Recharge',    
            "Total_collection_from_Card",
            "Total_collection_from_coin",
            "pH_of_water",
            "Total_Collection_Sale",

            "TimeStamp",
            "DeviceID",
            
        ],
            ['Total Volume Dispensed',
            'Total Recharge',
            'Total Collection From Card',
            'Total Collection From Coin',
            'pH Of Water',
            'Total Collection',


        ],
            [
                "L",
                "Rs",
                "Rs",
                "Rs",
                "",
                "Rs",
                "",
     
                "",
                "",
                
            ],
            ['GSCP_Water_Dispensing_Panel']
        ],

        RoData : [
            [
                "Operational_Minutes",
                "Backwash_cycle_count",
                "Temperature",
                "tds_inlet",
                "tds_outlet",
                "flow_inlet",
                "flow_reject",
                "current_rwp",
                "current_hpp",
                "total_treated_volume",
                "total_reject_volume",
                "UV_State",
                "Trip_state",
                "Tank_Level"

            ],
            [
                "Operational Time",
                "Backwash Cycle Count",
                "Temperature",
                "Tds Inlet",
                "Tds Outlet",
                "Flow Inlet",
                "Flow Reject",
                "Raw Water Pump Current",
                "High Pressure Pump Current",
                "Total Treated Volume",
                "Total Reject Volume",
                "UV State",
                "Trip State",
                "Tank Level"
            ],
            [
                "mins",
                "",
                "C",
                "ppm",
                "ppm",
                "lph",
                "lph",
                "A",
                "A",
                "L",
                "L",
                "",
                "",
                "%"
            ],
            ['GSCP_RO_Log_Parameter']

        ]
,
        CupDispenseData :[
            [
                "TotalCupsDispensed",
                "TotalCoinCollection",
                "TotalCardCollection",
                "TripState"
            ],
            [
                "Total Cups Dispensed",
                "Total Coin Collection",
                "Total Card Collection",
                "Last Transaction State"
            ],
            [
                "",
                "Rs",
                "Rs",
                ""
            ],
            ['GSCP_CupDispensing']
        ],
            transaction :[
            [
                "Time",
                "TapNo",
                "Type_of_Request",
                "CardNo",
                "Quantity",
                "Amount",
                "DispenseTime",
                "Card_Balance",
                "Total_Recharge",
                "Expiry_Date"
            ],
            [
                "Time",
                "Tap No.",
                "Type Of Request",
                "Card No.",
                "Quantity",
                "Amount",
                "Dispense Time",
                "Card Balance",
                "Total Recharge",
                "Card Expiry Date"
            ],
            [
                "",
                "",
                "",
                "",
                "ml",
                "Rs",
                "sec",
                "Rs",
                "Rs",
                ""
            ],
            ['GSCP_Transaction_logging']
        ],
        supervisorData :[
            [
                "TimeStamp",
                "Trip_CollectionID",
                "Trip_Total_Reset_Count",
                "Trip_Total_Volume_Dispensed",
                "Trip_Total_Smartcard_Collection",
                "Trip_Total_CoinCollection",
                "Trip_Total_Card_Recharge",
                "Total_Collection_Sale",
                "Trip_Actual_Amount_Collection"
            ],
            [
                "Time",
                "Trip Collection ID",
                "Trip Total Reset Count",
                "Trip Total Volume Dispensed",
                "Trip Total Smartcard Collection",
                "Trip Total Coin Collection",
                "Trip Total Card Recharge",
                "Total Collection Sale",
                "Trip Actual Amount Collection"

            ],
            [
                "",
                "",
                "",
                "L",
                "Rs",
                "Rs",
                "Rs",
                "Rs",
                "Rs"
            ],
            ['GSCP_SuperVisor_Login']
        ],

        operator: [
            [   
                "OperatorID",
                "PunchTime" 
            ],
            [
                "Operator Id",
                "Date",
                "Expected Punches" ,        
            ],
            [
                "",
                "",
                ""
            ],
            ['GSCP_Operator_Attendence']

    ]
    }
    

// 2. Copy everything between /* and */ (starting from *Cluster Name*... ending at ...}' below and paste it above this line.
// 3. Replace all the variables ( variable are marked between two *'s ) with corresponding names (e.g. if cluster name ABC then replace "*Cluster Name*" by "ABC".
/*
//start copying below
*ClusterName*={
    WaterDispenseData :
    [
        [
            '*Column1's name as in database table*',
            '*Column2's name as in database table*',
            //...
        
        ],
        [   
            '*Column1's name to be displayed in dashboard*',
            '*Column2's name to be displayed in dashboard*',
            //...

        ],
        [
            "*Unit of Column1's data*",
            "*Unit of Column2's data*",
            //...
            //(e.g. "L", "Rs", "", "A", "C", "ppm", "lph") IMPORTANT!: add "" corresponding to column having no units
            
        ],
        ['*Table name of the table in database corresponding to "Water Dispensing Panel"*']
    ],

    RoData : 
    [
        [
            '*Column1's name as in database table*',
            '*Column2's name as in database table*',
            //...
        
        ],
        [   
            '*Column1's name to be displayed in dashboard*',
            '*Column2's name to be displayed in dashboard*',
            //...

        ],
        [
            "*Unit of Column1's data*",
            "*Unit of Column2's data*",
            //...
            //(e.g. "L", "Rs", "", "A", "C", "ppm", "lph") IMPORTANT!: add "" corresponding to column having no units
            
        ],
        ['*Table name of the table in database corresponding to "RO Parameters"*']
    ],

    CupDispenseData :
    [
        [
            '*Column1's name as in database table*',
            '*Column2's name as in database table*',
            //...
        
        ],
        [   
            '*Column1's name to be displayed in dashboard*',
            '*Column2's name to be displayed in dashboard*',
            //...

        ],
        [
            "*Unit of Column1's data*",
            "*Unit of Column2's data*",
            //...
            //(e.g. "L", "Rs", "", "A", "C", "ppm", "lph") IMPORTANT!: add "" corresponding to column having no units
            
        ],
        ['*Table name of the table in database corresponding to "Cup Dispensing Panel"*']
    ],

    transaction :
    [
        [
            '*Column1's name as in database table*',
            '*Column2's name as in database table*',
            //...
        
        ],
        [   
            '*Column1's name to be displayed in dashboard*',
            '*Column2's name to be displayed in dashboard*',
            //...

        ],
        [
            "*Unit of Column1's data*",
            "*Unit of Column2's data*",
            //...
            //(e.g. "L", "Rs", "", "A", "C", "ppm", "lph") IMPORTANT!: add "" corresponding to column having no units
            
        ],
        ['*Table name of the table in database corresponding to "Transaction Log"*']
    ],
    supervisorData :
    [
        [
            '*Column1's name as in database table*',
            '*Column2's name as in database table*',
            //...
        
        ],
        [   
            '*Column1's name to be displayed in dashboard*',
            '*Column2's name to be displayed in dashboard*',
            //...

        ],
        [
            "*Unit of Column1's data*",
            "*Unit of Column2's data*",
            //...
            //(e.g. "L", "Rs", "", "A", "C", "ppm", "lph") IMPORTANT!: add "" corresponding to column having no units
            
        ],
        ['*Table name of the table in database corresponding to "Supervisor Login"*']
    ],

    operator: 
    [
        [
            '*Column1's name as in database table*',
            '*Column2's name as in database table*',
            //...
        
        ],
        [   
            '*Column1's name to be displayed in dashboard*',
            '*Column2's name to be displayed in dashboard*',
            //...

        ],
        [
            "*Unit of Column1's data*",
            "*Unit of Column2's data*",
            //...
            //(e.g. "L", "Rs", "", "A", "C", "ppm", "lph") IMPORTANT!: add "" corresponding to column having no units
            
        ],
        ['*Table name of the table in database corresponding to "operator attendance"*']
    ],


}
// end copying above
*/

}
