import React from 'react'
import Navbar from '../component/navbar'
import {base_url} from '../config'
import axios from 'axios'

export default class Cart extends React.Component{
    constructor(){
        super()
        this.state={
            token:'',
            cart:[],
            customerID:"",
            customerName:"",
            total:0
        }
        if(localStorage.getItem("token")){
            this.state.token = localStorage.getItem("token")
        }
        else{
            window.location="/login"
        }
        this.headerConfig.bind(this)
    }
    headerConfig(){
        let header= {headers:{Authorization:`Bearer ${this.state.token}`}}
        return header
    }
    initCart=()=>{
        let temp = []
        if(localStorage.getItem("cart")!==null){
            temp = JSON.parse(localStorage.getItem("cart"))
        }
        if(localStorage.getItem("customer")!==null){
            let item = JSON.parse(localStorage.getItem("customer"))
            this.setState({customerID:item.customer_id,customerName:item.name})
        }
        let total = 0 
        temp.map(item=>total+=(item.price*item.qty))
        this.setState({total:total,cart:temp})
    }
    EditItem=(ic)=>{
        let temp=[]
        if(localStorage.getItem("cart")!==null){
            temp = JSON.parse(localStorage.getItem("cart"))
        }
        let i = temp.findIndex(item=>item.product_id===ic.product_id)
        let jumlah=window.prompt(`masukan jumlah item ${ic.name}`,ic.qty)
        temp[i].qty=jumlah
        localStorage.setItem("cart",JSON.stringify(temp))
        this.initCart()
    }
    DropItem=(ic)=>{
        if(window.confirm(`are you really delete this item ${ic.name}`)){
            let temp=[]
        if(localStorage.getItem("cart")!==null){
            temp = JSON.parse(localStorage.getItem("cart"))
        }
        let i = temp.findIndex(item=>item.product_id===ic.product_id)
        temp.splice(i,1)
        localStorage.setItem("cart",JSON.stringify(temp))
        this.initCart()
        }
        
    }
    componentDidMount(){
        this.initCart()
    }
    checkOut=()=>{
        let temp = []
        if(localStorage.getItem("cart")!==null){
            temp = JSON.parse(localStorage.getItem("cart"))
        }
        let data = {customer_id:this.state.customerID,detail_transaksi:temp}
        let url = `${base_url}/transaksi`
        axios.post(url,data,this.headerConfig()).then(r=>{
            window.alert(r.data.message)
            localStorage.removeItem("cart")
            window.location = "/transaction"
        }).catch(e=>{
            if(e.response){
                if(e.response.status){
                    window.alert(e.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(e);
            }
        })
    }
    render(){
        return(
            <div>
                <Navbar/>
                <div className="container">
                    <div className="card col-12 mt-2">
                        <div className="card-header text-white bg-primary">
                            <h4>Cart List</h4>
                        </div>
                        <div className="card-body">
                            <h5 className="text-primary">Customer: {this.state.customerName}</h5>
                             <table className="table table-bordered" >
                                    <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                        <th>Option</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.cart.map((item,index)=>(
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td>{item.qty}</td>
                                                <td className="text-right">{item.qty*item.price}</td>
                                                <td>  
                                                    <button className="btn btn-sm btn-info m-1" onClick={() => this.EditItem(item)}>Edit</button>
                                                    <button className="btn btn-sm btn-danger m-1" onClick={() => this.DropItem(item)}>Drop</button>
                                                    </td>
                                            </tr>
                                            
                                        ))}
                                        <td className="text-danger text-bold" colspan="3"><h4>total</h4></td>
                                        <td className="text-right text-danger text-bold">
                                            <h4>Rp.{this.state.total}</h4>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-success btn-block m-1" onClick={()=>this.checkOut()}disabled={this.state.cart.length===0}>CheckOut</button>
                                        </td>
                                    </tbody>
                                </table> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}