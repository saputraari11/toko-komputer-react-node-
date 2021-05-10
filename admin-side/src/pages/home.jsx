import axios from 'axios'
import React from 'react'
import Navbar from '../component/navbar'
import { base_url } from '../config'

export default class Home extends React.Component{
    constructor(){
        super()
        this.state={
            token:"",
            adminName:'',
            productsCount:0,
            customersCount:0,
            transactionsCount:0,
            adminsCount:0

        }
        if(localStorage.getItem("token")){
            this.state.token = localStorage.getItem("token")
        }
        else{
            window.location="/login"
        }
    }
    headerConfig=()=>{
       let header={
            headers:{Authorization:'Bearer '+this.state.token}
        }
        return header
    }
    getProduct=()=>{
        let url = base_url+"/product"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({productsCount:r.data.length})
        }).catch(e=>{
            if(e.response.status){
                if(e.response.status){
                    window.alert(e.response.data.message)
                    this.props.history.push("/login")
                }
                else{
                    console.log(e);
                }
            }
        })
    }
    getTransaction=()=>{
        let url = base_url+"/transaksi"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({transactionsCount:r.data.length})
        }).catch(e=>{
            if(e.response.status){
                if(e.response.status){
                    window.alert(e.response.data.message)
                    this.props.history.push("/login")
                }
                else{
                    console.log(e);
                }
            }
        })
    }
    getCustomer=()=>{
        let url = base_url+"/customer"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({customersCount:r.data.length})
        }).catch(e=>{
            if(e.response.status){
                if(e.response.status){
                    window.alert(e.response.data.message)
                    this.props.history.push("/login")
                }
                else{
                    console.log(e);
                }
            }
        })
    }
    getAdmins=()=>{
        let url = base_url+"/admin"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({adminsCount:r.data.length})
        }).catch(e=>{
            if(e.response.status){
                if(e.response.status){
                    window.alert(e.response.data.message)
                    this.props.history.push("/login")
                }
                else{
                    console.log(e);
                }
            }
        })
    }
    getAdmin=()=>{
        let data=JSON.parse(localStorage.getItem("admin"))
        this.setState({adminName:data.name})
        console.log(data);
    }
    componentDidMount(){
        this.getAdmin()
        this.getCustomer()
        this.getAdmins()
        this.getProduct()
        this.getTransaction()
    }
    render(){
        return(
            <div>
                <Navbar/>
                <div className="container mt-2">
            <h3 className="my-2">
                <strong>welcome back,{this.state.adminName}</strong>
            </h3>
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                    <div className="card">
                        <div className="card-body bgproduct-success">
                            <h4 className="text-dark"><strong>Products Count</strong></h4>
                            <h1 className="text-white"><strong>{this.state.productsCount}</strong></h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                    <div className="card">
                        <div className="card-body bg-info">
                            <h4 className="text-dark"><strong>Customer Count</strong></h4>
                            <h1 className="text-white"><strong>{this.state.customersCount}</strong></h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                    <div className="card">
                        <div className="card-body bg-warning">
                            <h4 className="text-dark"><strong>Transaction Count</strong></h4>
                            <h1 className="text-white"><strong>{this.state.transactionsCount}</strong></h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                    <div className="card">
                        <div className="card-body bg-danger">
                            <h4 className="text-dark"><strong>Admin Count</strong></h4>
                            <h1 className="text-white"><strong>{this.state.adminsCount}</strong></h1>
                        </div>
                    </div>
                </div>
            </div>
                </div>
            </div>
        )
    }
}