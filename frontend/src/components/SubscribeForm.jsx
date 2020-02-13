import React from "react"

class SubscribeForm extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="row mt-5 justify-content-center">
                <div className="col-12 col-lg-6 border border-1 p-4">
                    <form className="">
                        <div className="form-group">
                            <label className="col-form-label">Name</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Please input your name"
                                value={this.props.name}
                                onChange={this.props.changeName}/>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label">Email</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Please input your email"
                                value={this.props.email}
                                onChange={this.props.changeEmail}/>
                        </div>
                        <hr className="my-4"/>
                        <div className="form-group text-right">
                            {this.props.sendingRequest ? (
                                <button type="button" className="btn btn-primary" disabled>Sending Request...</button>
                            ) : (
                                <button type="button" onClick={this.props.subscribe}
                                        className="btn btn-primary">Subscribe</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default SubscribeForm