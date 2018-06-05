export class Cluster{
    id:string;
    clusters=[
        'Delhi','IRCTC','NISE'
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
            "Total_Coin_Count1",
            "Tank_Level",
            "TimeStamp",
            "DeviceID",
            
        ],
            ['Total Volume Dispensed',
            'Total Recharge',
            'Total Collection From Card',
            'Total Collection From Coin',
            'pH Of Water',
            'Total Collection',
            'Total Coin Count',
            'Tank Level'
        ],
            [
                "ml",
                "Rs",
                "Rs",
                "Rs",
                "",
                "Rs",
                "",
                "%",        
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
                "Operational Minutes",
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
                "minutes",
                "",
                "ºC",
                "ppm",
                "ppm",
                "",
                "",
                "Amp",
                "Amp",
                "ml",
                "ml",
                "",
                "",
                ""
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
                "ml",
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
            "Total_Coin_Count1",
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
            'Total Coin Count',
            "PV Voltage",
            "PV Current",
            "Battery Voltage",
            "Battery Current",
            "Load Voltage",
            "Load Current",
        ],
            [
                "ml",
                "Rs",
                "Rs",
                "Rs",
                "",
                "Rs",
                "",
                "Volts",
                "Amp",
                "Volts",
                "Amp",
                "Volts",
                "Amp",
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
                "Operational Minutes",
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
                "minutes",
                "",
                "ºC",
                "ppm",
                "ppm",
                "",
                "",
                "Amp",
                "Amp",
                "ml",
                "ml",
                "",
                "",
                ""
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
                "ml",
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

}


