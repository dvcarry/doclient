import React from 'react';
import Modal from 'react-modal';

import { ModalEdit } from './ModalEdit';
import { ModalNew } from './ModalNew';

import './ModalForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks, closeModal } from '../../app/taskReducer';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        width: '500px',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export const ModalForm = () => {

    const { modalIsOpen, typeOfModal } = useSelector(selectTasks)
    const dispatch = useDispatch()

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => dispatch(closeModal())}
            ariaHideApp={false}
            style={customStyles}
        >
            {
                typeOfModal === 'new' ? <ModalNew /> : <ModalEdit />
            }
        </Modal>
    )
}