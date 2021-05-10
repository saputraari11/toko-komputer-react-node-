import React from 'react'

export default class ProductList extends React.Component{
    constructor(){
        super()
        
    }
    render(){
        return(
            <div className="col-lg-6 col-sm-12 p-2">
                <div className="card">
                    <div className="card-body row">
                        <div className="col-5"><img src={this.props.image} alt={this.props.name} className="img" height="200" width="200"/></div>
                        <div className="col-7">
                            <div className="text-info">{this.props.name}</div>
                            <div className="text-danger">Price: {this.props.price}</div>
                            <div className="text-dark">Stock: {this.props.stock}</div>
                                <button className="btn btn-sm btn-success m-1" onClick={this.props.onCart}>Add to market</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}