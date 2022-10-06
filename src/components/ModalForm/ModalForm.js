import React from 'react';
import Modal from 'react-modal';

import { ModalNew } from './ModalNew';

import './ModalForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks, closeModal } from '../../redux/taskReducer';
import { ProjectForm } from './ProjectForm';
import { TaskForm } from './TaskForm';
import { DayNew } from './DayNew';
import { FailureForm } from './FailureForm';

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
    failures: FailureForm
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
        </Modal>
    )
}