import axios from 'axios'
import React from 'react'
import Navbar from '../component/navbar'
import ProductList from '../component/productList'
import {base_url,product_image_url} from'../config'
export default class product extends React.Component{
    constructor(){
        super()
        this.state={product:[],token:''}
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
    getProduct(){
        let url = `${base_url}/product`
        axios.get(url,this.headerConfig()).then(r=>this.setState({product:r.data})).catch(e=>{
            if(e.response){
                if(e.response.status){
            window.alert(e.response.data.message)
            this.props.history.push("/login")
        }
        }
        else{console.log(e);}
    })
    }
      componentDidMount(){this.getProduct()}
      AddToCart=item=>{
          let temp = []
          if(localStorage.getItem("cart")){
            temp = JSON.parse(localStorage.getItem("cart"))
          }
          let existItem=temp.find(i=>i.product_id===item.product_id)
          if(existItem){
              window.alert(`Anda telah memilih item ${item.name}`)
          }
          else{
              let jumlah = window.prompt(`Masukan jumlah item ${item.name}`)
              if(jumlah!==null && jumlah!==''){
                  item.qty=jumlah
                  temp.push(item)
                  localStorage.setItem("cart",JSON.stringify(temp))
              }
          }
      }
    render(){return(
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    {this.state.product.map((item,index)=>(
                    <ProductList
                    key={item.product_id}
                    name={item.name}
                    price={item.price}
                    stock={item.stock}
                    image={`${product_image_url}/${item.image}`}
                    onCart={()=>this.AddToCart(item)}/>))}
                </div></div>
        </div>
        )}
}
