import React from 'react'
import axios from 'axios'
import {base_url} from '../config'

export default class Login extends React.Component{
    constructor(){
        super()
        this.state={
            logged:true,
            message:'',
            username:'',
            password:''
        }
    }
    Login=ev=>{
        ev.preventDefault()
        let sendData = {username:this.state.username,password:this.state.password}
        let url = base_url +"/customer/auth"
        axios.post(url,sendData).then(r=>{
            this.setState({logged:r.data.logged})
            if(this.state.logged){
                localStorage.setItem("customer",JSON.stringify(r.data.data))
                localStorage.setItem("token",r.data.token)
                this.props.history.push("/")
            }
            else{
                this.setState({message:r.data.message})
            }
        }).catch(e=>console.log(e.message))
    }
    render(){
        return(
            <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="col-sm-6 card my-5">
                    <div className="card-header bg-success text-white text-center">
                        <h4>computer store</h4>
                        <strong className="text-warning">Customer sign In</strong>
                    </div>
                    <div className="card-body">
                        {!this.state.logged?(<div className="alert alert-danger mt-3">{this.state.message}</div>):null}
                        <form onSubmit={(ev)=>this.Login(ev)}>
                            <input type="text" className="form-control mb-1" value={this.state.username} onChange={(ev)=>this.setState({username:ev.target.value})}/>
                            <input type="text" className="form-control mb-1" value={this.state.password} auto-complete="false" onChange={(ev=>this.setState({password:ev.target.value}))}/>
                            <button type="submit" className="btn btn-primary btn-block mb-1">submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}