import React from 'react'
export default class TrasctionList extends React.Component{
    getAmount = products=>{
        let total = 0
        products.map(i=>{
            total+=Number(i.price)*Number(i.qty)
        })
        return total
    }
    convertTime=time=>{
        let date = new Date(time)
        return  `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }
    render(){
        return(
            <div>
                <div className="card col-sm-12 my-1">
                <div className="card-body row">
                   <div className="col-lg-4 col-sm-12">
                    <small className="text-info">Customer</small>
                    <h6>{this.props.customer_name}</h6>
                   </div>
                   <div className="col-lg-4 col-sm-12">
                   <small className="text-info">Address</small>
                    <h6>{this.props.customer_address}</h6>
                   </div>
                   <div className="col-lg-2 col-sm-12">
                   <small className="text-info">Total Amount</small>
                    <h6>Rp.{this.getAmount(this.props.products)}</h6>
                   </div>
                   <div className="col-lg-2 col-sm-12">
                    <small className="text-info">Time: {this.convertTime(this.props.time)}</small>
                    <button className="btn btn-sm btn-success btn-block" data-toggle="modal" data-target={`#modalDetail${this.props.transaction_id}`}>Detail</button>
                   </div>
                   </div>
            </div>
             <div className="modal fade" id={`modalDetail${this.props.transaction_id}`} tabindex="-1">
                 <div className="modal-dialog modal-lg">
                     <div className="modal-content">
                            <div className="modal-header bg-success text-white">
    <h5>Detail Transaction</h5>
</div>
                            <div className="modal-body">
                                <h5>Customer:{this.props.customer_name}</h5>
                                <h6>Time:{this.convertTime(this.props.time) }</h6>
                                <table className="table table-bordered" style={{padding:"0"}}>
                                    <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.products.map((item,index)=>(
                                            <tr key={index}>
                                                <td>{`${index+1}`}</td>
                                                <td>{item.product.name}</td>
                                                <td>{item.price}</td>
                                                <td>{item.qty}</td>
                                                <td className="text-right">{item.qty*item.price}</td>
                                            </tr>
                                            
                                        ))}
                                        <td className="text-danger text-bold" colspan="4"><h4>total</h4></td>
                                        <td className="text-right text-danger text-bold">
                                            <h4>Rp.{this.getAmount(this.props.products)}</h4>
                                        </td>
                                    </tbody>
                                </table> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}