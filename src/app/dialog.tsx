import React, { useState, FormEvent, ChangeEvent } from 'react';
import Modal from 'react-modal';
import MyDatePicker from './datepicker';
import firestoreFunctions from '@/firebase/firestore/firebase_functions';
import { todo } from 'node:test';
import { error } from 'node:console';

const customModalStyle: Modal.Styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #ccc',
        background: '#000',
        padding: '20px',
        borderRadius: '5px',
        maxWidth: '400px',
        width: '80%',
        maxHeight: '80vh',
        overflow: 'visible',
    },
};

type MyComponentProps = {
    buttonText: string;
    title: string;
    onPressed: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ buttonText, title, onPressed }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>등록하기</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel={title}
                style={customModalStyle}

            >
                <h2 style={{ fontSize: 20 }}>{title}</h2>
                <MyForm closeModal={() => setModalIsOpen(false)}></MyForm>
            </Modal>
        </div>
    );
};

const MyForm = ({ closeModal }: { closeModal: () => void }) => {
    const [formData, setFormData] = useState({
        date: new Date(),
        todo: '',
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = () => {
        try {
            firestoreFunctions.addData('todo', formData)
            closeModal()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <MyDatePicker />
            <br />
            <div style={{ paddingBottom: '40px' }}>
                <label htmlFor="todo" style={{ paddingTop: '80px', paddingRight: '10px' }}>제목</label>
                <input type="text" id="todo" name="todo" value={formData.todo} onChange={handleChange} style={{ color: 'black', paddingLeft: '5px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" style={{ paddingRight: '20px' }} onClick={onSubmit}>등록</button>
                <button onClick={closeModal}>닫기</button>
            </div>
        </form>
    );
};

export default MyComponent;
