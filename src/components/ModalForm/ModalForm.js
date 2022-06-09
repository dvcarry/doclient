import React from 'react';
import Modal from 'react-modal';

import { ModalEdit } from './ModalEdit';
import { ModalNew } from './ModalNew';

import './ModalForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks, closeModal } from '../../app/taskReducer';
import { ProjectForm } from './ProjectForm';
import { TaskForm } from './TaskForm';
import { DayNew } from './DayNew';

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


const modals = {
    project: ProjectForm,
    task: TaskForm,
    new: ModalNew,
    day: DayNew,
};


export const ModalForm = () => {

    const { modalIsOpen, typeOfModal } = useSelector(selectTasks)
    const dispatch = useDispatch()

    const ModalComponent = modals[typeOfModal];



    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => dispatch(closeModal())}
            ariaHideApp={false}
            style={customStyles}
        >
            <ModalComponent />
            {/* {
                typeOfModal === 'new' ? <ModalNew /> : <ModalEdit />
            } */}
        </Modal>
    )
}