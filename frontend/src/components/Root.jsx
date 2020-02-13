import React from "react"
import Axios from "axios"
import { alertService } from '../services/alert'
import SubscribeForm from "./SubscribeForm"
import UserTable from "./UserTable"
import { API_HOST, VAPID_PUBLIC_KEY } from "../config"

class Root extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            sendingRequest: false,
            subscription: null,
        }
        this.changeName = this.changeName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.subscribe = this.subscribe.bind(this)
        window.reacttemp = this
    }

    changeName(e) {
        let name = e.target.value
        this.setState({name})
    }

    changeEmail(e) {
        let email = e.target.value
        this.setState({email})
    }

    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    subscribe() {
        if (!this.state.name) {
            return alertService.showError('Please input name!')
        }
        if (!this.state.email) {
            return alertService.showError('Please input email!')
        }
        if (!window.Notification) {
            return alertService.showError("You cannot use notification service")
        }
        if (!('serviceWorker' in navigator)) {
            return alertService.showError('Service worker not registered')
        }
        window.Notification.requestPermission().then(res => {
            if (res === "granted") {
                let context = this
                window.navigator.serviceWorker.ready.then(function (reg) {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: context.urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
                    }).then(sub => {
                        Axios.post(`${API_HOST}/users`, {
                            name: context.state.name,
                            email: context.state.email,
                            subscription: sub
                        }).then(res => {
                            if (res.data && res.data._id) {
                                context.setState({
                                    subscription: sub
                                })
                            } else {
                                alertService.showError('Subscribing failed!')
                            }
                        })
                    })
                })
            } else {
                alertService.showError("You blocked notification.")
            }
        })
    }

    render() {
        return (
            <div className="container">
                {this.state.subscription ? (
                    <UserTable
                        subscription={this.state.subscription}
                    />
                ) : (
                    <SubscribeForm
                        name={this.state.name}
                        email={this.state.email}
                        changeName={this.changeName}
                        changeEmail={this.changeEmail}
                        subscribe={this.subscribe}
                        sendingRequest={this.state.sendingRequest}
                    />
                )}
            </div>
        )
    }

}

export default Root