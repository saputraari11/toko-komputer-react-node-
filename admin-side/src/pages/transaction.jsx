import React from 'react'
import Navbar from '../component/navbar'
import { base_url } from "../config";
import axios from "axios"
import TransactionList from "../component/transactionList"
export default class transaksi extends React.Component{
    constructor(){
        super()
        this.state={
            token:"",
            transaction:[],
            selectItem:null
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
    getTransaction(){
        let url = base_url+"/transaksi"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({transaction:r.data})
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
        this.getTransaction()
    }
    render(){
        return(
            <div>
                <Navbar/>
                <div className="container">
                    <h3 className="text-bold text-info mt-2">
                    Transaction List
                    </h3>
                    {this.state.transaction.map(item=>(
                        <TransactionList
                        key = {item.transaksi_id}
                        transaction_id = {item.transaksi_id}
                        customer_name = {item.customer.name}
                        customer_address = {item.customer.address}
                        time = {item.waktu}
                        products = {item.detail_transaksi}
                        />
                    ))}
                </div>
            </div>
        )
    }
}