import React, { useState } from 'react'
import './toast.css'
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Toast = props => {

    const { toastList, autoDelete, autoDeleteTime } = props;
    const [list, setList] = useState(toastList);

    useEffect(() => {
        setList([...toastList]);
    }, [toastList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length) {
                deleteToast(toastList[0].id);
            }
        }, autoDeleteTime);

        return () => {
            clearInterval(interval);
        }

        // eslint-disable-next-line
    }, [toastList, autoDelete, autoDeleteTime, list]);

    const deleteToast = id => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    }

    return (
        <div className='toast-container'>
            {list.map((toast, i) => {
                return (
                <div className="toast" style={{"--color" : toast.backgroundColor}} key={i}>
                    <div className="toast-content" key={i}>
                        {toast.icon}
                        <div className="message">
                            <span className="text text-1">{toast.title}</span>
                            <span className="text text-2">{toast.description}</span>
                        </div>
                    </div>
                    <i className="fa-solid fa-xmark close" onClick={() => deleteToast(toast.id)}>X</i>

                    <div className="progress active"></div>
                </div>
                )
            })}
            </div>
    )
}

Toast.propTypes = {
    toastList: PropTypes.array.isRequired,
    position: PropTypes.string,
    autoDelete: PropTypes.bool,
    autoDeleteTime: PropTypes.number
}

export default Toast