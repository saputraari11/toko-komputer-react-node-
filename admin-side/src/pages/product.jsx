import React from 'react'
import Navbar from '../component/navbar'
import ProductList from '../component/productList'
import {base_url,product_image_url} from '../config'
import axios from 'axios'
import $ from 'jquery'

export default class product extends React.Component{
    constructor(){
        super()
        this.state={
            products:[],
            token:"",
            action:"",
            name:"",
            price:0,
            stock:0,
            image:"",
            uploadFile:true,
            product_id:""
        }
        if(localStorage.getItem("token")){
            this.state.token=localStorage.getItem("token")
        }else{
            window.location="/login"
        }
        this.headerConfig.bind(this)
    }
    headerConfig(){
        let header = {headers:{Authorization:"Bearer "+this.state.token}}
        return header
    }
    getProduct=()=>{
        let url = base_url+"/product"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({products:r.data})
        }).catch(e=>{
            if(e.response){
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
    componentDidMount(){
        this.getProduct()
    }
    Add=()=>{
        $("#modal_product").modal("show")
        this.setState({
            action:"insert",
            name:"",
            price:0,
            stock:0,
            image:null,
            uploadFile:true,
            product_id:0
        })
    }
    edit=item=>{
        $("#modal_product").modal("show")
        this.setState({
            action:"update",
            name:item.name,
            price:item.price,
            stock:item.stock,
            image:null,
            uploadFile:false,
            product_id:item.product_id
        })
    }
    Save=ev=>{
        ev.preventDefault()
        $("#modal_product").modal("hide")
        let form = new FormData()
        form.append("product_id",this.state.product_id)
        form.append("name",this.state.name)
        form.append("price",this.state.price)
        form.append("stock",this.state.stock)
        if(this.state.uploadFile){
            form.append("image",this.state.image)
        }
        let url = base_url+"/product"
        if(this.state.action==="insert"){
            axios.post(url,form,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getProduct()
            }).catch(e=>console.log(e))
        }
        else if(this.state.action==="update"){
            axios.put(url,form,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getProduct()
            }).catch(e=>console.log(e))
        }
    }
    drop=item=>{
        if(window.confirm("are sure will delete this item?")){
            let url = base_url+"/product/"+item.product_id
            axios.delete(url,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getProduct()
            }).catch(e=>console.log(e))
        }
    }
    render(){
        return(
            <div>
                <Navbar/>
                <div className="container">
                    <div className="text-bold text-info mt-2">Product List</div>
                    <div className="row">
                        {this.state.products.map(i=>(
                            <ProductList key={i.product_id} name={i.name} price={i.price} stock={i.stock} image={product_image_url+"/"+i.image} onEdit={()=>this.edit(i)} onDel={()=>this.drop(i)}
                            />
                        ))}
                       
                    </div>
                    <button className="btn btn-primary" onClick={()=>this.Add()}>Add item</button>
                    <div className="modal fade" id="modal_product">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header text-white bg-info">
                                        <h4>Form Product</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={(ev)=>this.Save(ev)}>
                                            Product Name <input type="text" className="form-control mb-1" value={this.state.name} onChange={ev=>{this.setState({name:ev.target.value})}}/>
                                            Product Stock <input type="number" className="form-control mb-1" value={this.state.stock} onChange={ev=>{this.setState({stock:ev.target.value})}}/>
                                            Product Price <input type="number" className="form-control mb-1" value={this.state.price} onChange={ev=>{this.setState({price:ev.target.value})}}/>
                                            {this.state.action==="update"&&this.state.uploadFile===false?(<button className="btn btn-sm btn-block mb-1 btn-dark" onClick={()=>this.setState({uploadFile:true})}>Change Product Image</button>):(
                                            <div>
                                                Product image <input type="file" className="form-control mb-1"  onChange={ev=>this.setState({image:ev.target.files[0]})}/>
                                            </div>
                                            )}
                                            <button type="submit" className="btn btn-block btn-success">
                                                Save Data
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}