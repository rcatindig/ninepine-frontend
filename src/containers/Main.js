import React, {Component} from 'react';

import {VehicleTable } from '../components'


import * as Constants from '../helpers/Constants';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            vehicleId: '',
            name: '',
            engine_displacement: '',
            engine_disp_unit: '',
            engine_power: '',
            price: '',
            location: ''

        }

        this.getAll();
    }


    getAll = () => {

        fetch(Constants.BASE_URL + "/vehicles", {
            method: 'GET'
        }).then((response) => { 
                return response.json();
            }).then((res) => {
                this.setState({data: res});
            })
        .catch(function(err){
            console.log(err);
        });
    }

    saveData = () => {

        let fieldEmptyArr = [];

        const { name, 
            engine_displacement, 
            engine_disp_unit, 
            engine_power,
            price,
            location,
            vehicleId } = this.state;

        if(name == "")
            fieldEmptyArr.push("Name");

        if(engine_displacement == "")
            fieldEmptyArr.push("Engine Displacement");

        if(engine_disp_unit == "")
            fieldEmptyArr.push("Engine Displacement Unit");

        if(engine_power == "")
            fieldEmptyArr.push("Engine Power");
        
        if(price == "")
            fieldEmptyArr.push("Price");

        if(location == "")
            fieldEmptyArr.push("Location");


        if(fieldEmptyArr.length > 0) {
            let fieldString = fieldEmptyArr.toString();

            alert(fieldString + " cannot be blank");
        } else  {

            if(vehicleId == "")
                this.insertData();
            else
                this.updateData();
        }


    }

    insertData = () => {

        const { name, 
            engine_displacement, 
            engine_disp_unit, 
            engine_power,
            price,
            location } = this.state;


        const data =  {
            name: name,
            engine_displacement: engine_displacement,
            engine_disp_unit: engine_disp_unit,
            engine_power: engine_power,
            price: price,
            location, location
        }

        fetch(Constants.BASE_URL + "/vehicles", {
                method: 'POST',
                body: JSON.stringify(data),
            }).then((response) => { 
                return response.json();
            }).then((res) => {
                if(res.success){
                    this.getAll();
                    this.setState({
                        name: '',
                        engine_displacement: '',
                        engine_disp_unit: '',
                        engine_power: '',
                        price: '',
                        location: '',
                        vehicleId: ''

                    })
                } else {
                    alert(res.msg);
                }
                    
            })
        .catch(function(err){
            console.log(err);
        })

    }

    editData = (id) => {

        fetch(Constants.BASE_URL + "/vehicles/" + id, {
            method: 'GET'
        }).then((response) => { 
                return response.json();
            }).then((res) => {
                if(res.length > 0) {
                    var resData = res[0];
                    
                    this.setState({
                        name: resData.name,
                        engine_displacement: resData.engine_displacement,
                        engine_disp_unit: resData.engine_disp_unit,
                        engine_power: resData.engine_power,
                        price: resData.price,
                        location: resData.location,
                        vehicleId: resData.id

                    })
                }
                //this.setState({data: res});
            })
        .catch(function(err){
            console.log(err);
        });

        
    }

    updateData = () => {
        const { name, 
            engine_displacement, 
            engine_disp_unit, 
            engine_power,
            price,
            location,
            vehicleId } = this.state;


        const data =  {
            name: name,
            engine_displacement: engine_displacement,
            engine_disp_unit: engine_disp_unit,
            engine_power: engine_power,
            price: price,
            location, location
        }

        fetch(Constants.BASE_URL + "/vehicles/" + vehicleId, {
                method: 'PUT',
                body: JSON.stringify(data)
            }).then((response) => { 
                return response.json();
            }).then((res) => {
                if(res.status){
                    this.getAll();
                    this.setState({
                        name: '',
                        engine_displacement: '',
                        engine_disp_unit: '',
                        engine_power: '',
                        price: '',
                        location: '',
                        vehicleId: ''

                    })
                } else {
                    alert(res.msg);
                }
                    
            })
        .catch(function(err){
            console.log(err);
        })
    }

    
    render(){
        const { data,
                name, 
                engine_displacement, 
                engine_disp_unit, 
                engine_power,
                price,
                location,
                vehicleId } = this.state;

        return (
            <div className="main">
                <div className="container-list">

                    <VehicleTable 
                        data={data}
                        editData={this.editData}
                    />
                </div>
                <div className="container-form">
                    <div className="form-layout">
                        <form>
                            <input type="hidden" value={vehicleId}/>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(event) => this.setState({name: event.target.value }) } />
                            </div>

                            <div className="form-group">
                                <label htmlFor="displacement">Engine Displacement</label>
                                <input
                                    className="displacement"
                                    type="number"
                                    id="displacement"
                                    value={engine_displacement}
                                    onChange={(event) => this.setState({engine_displacement: event.target.value }) } />

                                <select className="displacement-select" name="engine_disp_unit" 
                                    onChange={(event) => this.setState({engine_disp_unit: event.target.value }) } value={engine_disp_unit}>
                                    <option value="">Please select</option>
                                    <option value="cc">cubic cm</option>
                                    <option value="ci">cubic in</option>
                                    <option value="l">liters</option>
                                </select>
                            </div>


                            <div className="form-group">
                                <label htmlFor="engine_power">Engine Power</label>
                                <input
                                    type="number" 
                                    id="engine_power"
                                    value={engine_power}
                                    onChange={(event) => this.setState({engine_power: event.target.value }) }/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input 
                                    type="number" 
                                    id="price"
                                    value={price}
                                    onChange={(event) => this.setState({price: event.target.value }) } />
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text" 
                                    id="location"
                                    value={location}
                                    onChange={(event) => this.setState({location: event.target.value }) }/>
                            </div>

                            <div className="button-holder">
                                <button 
                                    type="button" 
                                    className="btn-submit"
                                    onClick={() => this.saveData()}>SAVE</button>
                            </div>
                            
                            

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;