import React, { useEffect, useState } from 'react'
import Toast from '../../../components/toast-notification/Toast'
import AdminService from '../../../services/admin.service'
import { TOAST_PROPERTIES } from '../../Common/table/ToastProperties'
import './profile.css'

const Profile = () => {

    const [profile, setProfile] = useState({})
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        const fetchNewUser = async () => {
            await AdminService.profile().then((res) => {
                setProfile(res)
            })
        }
        fetchNewUser()
    }, [])

    const [nlist, setNList] = useState([]);

    const showToast = (type, response) => {
        const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title.toLowerCase() === type);
        if (type === 'success') {
            toastProperties.description = 'Profile Updated Successfully.'
        } else if (type === 'warning') {
            toastProperties.description = response.data.message
        }
        setNList([...nlist, toastProperties]);
    }

    const updateProfile = async () => {
        setEditMode(false)
        await AdminService.updateProfile(profile).then((res) => {
            showToast('success')
        }).catch((e) => {
            console.log(e.response);
        })
    }

    return (
        <>
            <div className='profile-container'>
                <div className='profile-banner'>
                </div>
                <div className='profile-body' style={{ display: editMode && 'block' }}>
                    <div className='profile-content'>
                        <div className='profile-wrapper'>
                            <div className="profile-image-wrapper">
                                <span className="profile-image"></span>
                                {editMode === false && <div className='profile-edit' onClick={() => setEditMode(true)}>Edit profile</div>}
                                {editMode === true && <div className='profile-edit' onClick={updateProfile}>Save profile</div>}
                            </div>
                            {editMode === false
                                ? <div className='profile-text-wrapper'>
                                    <span>{profile.name}</span>
                                    <span>{profile.email}</span>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                                    <span>Joined {profile.joiningTime}</span>
                                </div>
                                : <form action="" className='editProfile'>
                                    <div className="form">
                                        <input type="text" id="name" onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="form__input" autoComplete="off" placeholder=" " defaultValue={profile.name} />
                                        <label htmlFor="name" className="form__label">Name</label>
                                    </div>
                                    <div className="form">
                                        <input type="email" id="email" onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="form__input" autoComplete="off" placeholder=" " defaultValue={profile.email} />
                                        <label htmlFor="email" className="form__label">Email</label>
                                    </div>
                                </form>}
                        </div>
                    </div>
                    {editMode === false && <div>
                        <b>Others</b>
                    </div>}
                </div>
            </div>
            <Toast
                toastList={nlist}
                autoDelete={true}
                autoDeleteTime={3000}
            />
        </>
    )
}

export default Profile