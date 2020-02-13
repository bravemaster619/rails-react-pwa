import React from "react"
import { alertService } from '../services/alert'
import Axios from "axios"
import { API_HOST } from "../config"
class UserTable extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            loading: true,
            users: []
        }
        this.changeMessage = this.changeMessage.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    changeMessage(e, index) {
        const users = {...this.state.users}
        users[index].message = e.target.value
        this.setState(users)
    }

    sendMessage(e, index) {
        const users = {...this.state.users}
        const message = users[index].message
        if(!message) {
            alertService.showError("Please input message!")
            return
        }
        Axios.post(`${API_HOST}/sendMessage`, { message, user_id: users[index]['_id']['$oid'] }).then(res => {
            console.log(res.data.success)
            if(res.data.success) {
                alertService.showSuccess("Message sent!")
            } else {
                alertService.showError("Message did not send!")
            }
        }).catch(e => {
            console.error(e)
            alertService.showError("Message did not send!")
        })
    }

    componentDidMount() {
        Axios.get(`${API_HOST}/users`).then(res => {
            this.setState({
                users: res.data
            })
        }).catch(e => {
            alertService.showError('Cannot get user data...')
        }).finally(() => {
            this.setState({
                loading: false
            })
        })
    }

    render() {
        return (
            <div className="row mt-5 justify-content-center">
                <div className="col-12 col-lg-8">
                    <table className="table table-hover table-striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.loading ? (
                            <tr><td>Loading...</td></tr>
                        ) : (
                            <>
                                {this.state.users.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    onChange={(e) => this.changeMessage(e, index)}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={(e) => this.sendMessage(e, index)}
                                                >
                                                    Send
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {!this.state.users.length && (
                                    <tr><td>Loading...</td></tr>
                                )}
                            </>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default UserTable