import React from 'react'
import Navbar from '../component/navbar'
import CustomerList from '../component/customerList';
import {base_url,customer_image_url} from '../config';
import axios from 'axios';
import $ from 'jquery'

export default class customer extends React.Component{
    constructor(){
        super()
        this.state={
            customer:[],
            token:'',
            action:'',
            name:'',
            phone:'',
            address:'',
            img:'',
            username:'',
            password:'',
            upload_file:true,
            fill_password:true,
            customer_id:''
        }
        if(localStorage.getItem("token")){
            this.state.token = localStorage.getItem("token")
        }
        else{
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }
    headerConfig(){
        let header = {headers:{Authorization:'Bearer '+this.state.token}}
        return header
    }
    getCustomer(){
        let url = base_url+"/customer"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({customer:r.data})
        }).catch(e=>{
            if(e.response){
                if(e.response.status){
                    window.alert(e.response.data.message)
                    this.props.history.push('/login')
                }
            }
            else{
                console.log(e);
            }
        })
    }
    componentDidMount(){
        this.getCustomer()
    }
    Add(){
        $("#modal_customer").modal("show")
        this.setState(
            {
                action:'insert',
                name:'',
                phone:'',
                address:'',
                img:null,
                username:'',
                password:'',
                upload_file:true,
                fill_password:true,
                customer_id:0
        })
    }
    Edit(item){
        $("#modal_customer").modal("show")
        this.setState({
            action:'update',
            name:item.name,
            phone:item.phone,
            address:item.address,
            img:null,
            username:item.username,
            password:"",
            upload_file:false,
            fill_password:false,
            customer_id:item.customer_id
        })
    }
    Save(e){
        e.preventDefault()
        $("#modal_customer").modal("hide")
        let item = this.state
        let form = new FormData()
        form.append("customer_id",item.customer_id)
        form.append("name",item.name)
        form.append("phone",item.phone)
        form.append("address",item.address)
        form.append("username",item.username)
        if(item.upload_file){
            form.append("image",item.img)
        }
        if(item.fill_password){
            form.append("password",item.password)
        }
        let url = base_url+"/customer"
        if(item.action=="insert"){
            axios.post(url,form,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getCustomer()
            }).catch(er=>console.log(er.message))
        }
        else if(item.action=="update"){
            axios.put(url,form,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getCustomer()
            }).catch(er=>console.log(er.message))
        }
    }
    Drop(item){
        if(window.confirm("are sure will delete this item?")){
            let url = base_url+"/customer/"+item.customer_id
            axios.delete(url,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getCustomer()
            }).catch(e=>console.log(e))
        }
    }
    render(){
        return(
            <div>
                <Navbar/>
                <div className="container">
                    <div className="row">
                        {this.state.customer.map(item=>(
                            <CustomerList
                            key={item.customer_id}
                            name={item.name}
                            phone={item.phone}
                            address={item.address}
                            img={customer_image_url+"/"+item.image}
                            onEdit={()=>this.Edit(item)}
                            onDrop={()=>this.Drop(item)}
                            />
                        ))}
                    </div>
                    <button className="btn btn-success" onClick={()=>this.Add()}>Add</button>
                </div>
                <div className="modal fade" id="modal_customer">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header text-white bg-info">
                                        <h4>Form Customer</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={(ev)=>this.Save(ev)}>
                                            Customer Name <input type="text" className="form-control mb-1" value={this.state.name} onChange={ev=>{this.setState({name:ev.target.value})}}/>
                                            Customer Phone <input type="number" className="form-control mb-1" value={this.state.phone} onChange={ev=>{this.setState({phone:ev.target.value})}}/>
                                            Customer Address <input type="text" className="form-control mb-1" value={this.state.address} onChange={ev=>{this.setState({address:ev.target.value})}}/>
                                            Customer Username <input type="text" className="form-control mb-1" value={this.state.username} onChange={ev=>{this.setState({username:ev.target.value})}}/>
                                            {this.state.action==="update"&&this.state.upload_file===false?
                                            (
                                            <button className="btn btn-sm btn-block mb-1 btn-dark" onClick={()=>this.setState({upload_file:true})}>Change Customer Image</button>
                                            ):
                                            (
                                            <div>
                                                Customer image <input type="file" className="form-control mb-1"  onChange={ev=>this.setState({img:ev.target.files[0]})}/>
                                            </div>
                                            )
                                            }
                                            {this.state.action==="update"&&this.state.fill_password===false?
                                            (
                                            <button className="btn btn-sm btn-block mb-1 btn-secondary" onClick={()=>this.setState({fill_password:true})}>Change Customer Password</button>
                                            ):
                                            (
                                            <div>
                                                Customer Password <input type="password" className="form-control mb-1" value={this.state.password} onChange={ev=>this.setState({password:ev.target.value})}/>
                                            </div>
                                            )
                                            }
                                            <button type="submit" className="btn btn-block btn-success">
                                                Save Data
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        )
    }
}