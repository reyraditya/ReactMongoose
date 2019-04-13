import React, { Component } from 'react';
import {Button} from 'reactstrap';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie'; 

import axios from '../config/axios';

const cookie = new Cookies()

class Profile extends Component {
    state = {
        avatar: ''
    }

    componentDidMount () {
        this.getAvatar()
    }

    getAvatar = async () => {
        try {
            const res = await axios.get(`/avatar/${cookie.get('idLogin')}`)
            this.setState({tasks: res.data})
        } catch (e) {
            console.log(e);
        }
    }

    fileUpload = async (userid) => {
        const formData = new FormData()
        var imagefile = this.gambar

         formData.append('avatar', imagefile.files[0])

         try {
            await axios.post(`/users/${userid}/avatar`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            console.log("berhasil upload file");

         } catch (e) {
            console.log(e);

         }
    }
    
    render(){
        return(
            <div className="container">
                <div className="custom-file">
                    <input type="file" id="myfile" ref={input => this.gambar = input}/>
                </div>
                <Button color="primary" onClick={() => this.fileUpload(this.props.id)}>Upload</Button>
            </div>
        )
    }
}

const mps = (state) => {
    return {id: state.auth.id, user: state.auth}
}

export default connect (mps)(Profile);