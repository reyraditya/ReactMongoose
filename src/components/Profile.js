import React, { Component } from 'react';
import {Button} from 'reactstrap';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';


import {onLogoutUser} from '../actions/index';

import axios from '../config/axios';

const cookie = new Cookies()

class Profile extends Component {
    state = {
        avatar: '',
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

    deleteAvatar = async (userid) => {
       try {
           await axios.delete(`/users/${userid}/avatar`)
       } catch (e) {
           console.log(e);
           
       }
    }

    deleteUser = async (userid) => {
        try {
            await axios.delete(`/users/${userid}`)
            this.props.onLogoutUser()
        } catch (e) {
            console.log(e);
            
        }
    }

    render(){
        return (
          <div className="container">
            <img alt="img" src={`http://localhost:2009/users/${this.props.userId}/avatar`} className="mt-4 mb-4"/>
            <div className="custom-file">
              <input type="file" id="myfile" ref={input => (this.gambar = input)}/>
            </div>
            <Button color="primary" onClick={() => this.fileUpload(this.props.userId)}>
              Upload avatar
            </Button>
            <Button color="warning" onClick={() => this.deleteAvatar(this.props.userId)} className="ml-1">
              Remove avatar
            </Button>
            <h1 className="mt-3 text-capitalize">Name: {this.props.name}</h1>
            <h1>Age: {this.props.age}</h1>
            <Button color="secondary">Edit profile</Button>
            <Link to='/register'><Button color="danger" onClick={() => this.deleteUser(this.props.userId)} className="ml-1">
              Delete account
            </Button></Link>
          </div>
        );
    }
}

const mps = state => {
    return {
      userId: state.auth.id,
      name: state.auth.name,
      age: state.auth.age
    };
  };

export default connect (mps, {onLogoutUser})(Profile);