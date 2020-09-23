import {DateRangePicker, Panel} from "rsuite";
import React, {useState} from "react";
import {useSelector} from "react-redux";

export function DatesBox(){

    const [dates, setDates] = useState([new Date('2020-09-15'), new Date('2020-09-28')]);

    return <Panel bordered style={boxStyle}>
        <DateRangePicker
            value={dates}
            disabled
            size="lg"
            placeholder="Large"
            style={styles}
        />
    </Panel>
}

const styles = { width: 260, display: 'block', marginBottom: 10 };

const boxStyle = {height:300, width:400, margin:30, backgroundColor:"white", display: "flex", justifyContent:"center", alignItems:"center"}