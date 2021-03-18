import React, {Component} from 'react';

class VehicleTable extends Component {

    static defaultProps = {
        data : []
    };
    
    render(){

        const { data } = this.props;
        return (
            <table className="rwd-table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Engine Displacement</th>
                        <th>Engine Power</th>
                        <th>Price</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                        

                </thead>

                <tbody>
                    
                    {data.map((value, index) => {
                        return (

                            <tr key={index}>
                                <td data-th="ID">{}</td>
                                <td data-th="Name">{value.name}</td>
                                <td data-th="Engine Displacement">{value.engine_displacement} {value.engine_disp_unit}</td>
                                <td data-th="Engine Power">{value.engine_power} hp</td>
                                <td data-th="Price">{value.price}</td>
                                <td data-th="Location">{value.location}</td>
                                <td data-th="Action"><button onClick={() => { this.props.editData(value.id); }}>Edit</button></td>
                            </tr>

                        );
                    })}
                </tbody>
            </table>
        )
    }
}

export {VehicleTable};