/* eslint-disable no-self-assign */
import { Button, Modal } from 'antd'
import { useState } from 'react'
import BoardService from '../service/BoardService';

interface Props {
    currentNo: number
}

export default function ModalComponent(props: Props) {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newData, setNewData] = useState({
        title: '',
        contents: ''
    });

    const handleOk = () => {
        setIsModalOpen(false);       
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const prevModal = () => {
        checkYN(props.currentNo, 'prev');
    };
    const nextModal = () => {
        checkYN(props.currentNo, 'next');
    };

    const checkYN = (num: any, direction: string) => {
        let newNum = direction === 'prev' ? num - 1 : num + 1;

        BoardService.getOneBoard(newNum)
        .then(data => {
            if(data.useYN === 'Y') {
                setNewData(data);
                setIsModalOpen(true);
            } else {
                checkYN(newNum, direction);
            }
        })
        .catch((error) => {
            console.log(error);
            alert("글이 존재하지 않습니다");
        })
    }

    return (
        <>
        <Button className='MarginButton' type='primary' onClick={prevModal}>이전 글</Button>
        <Button className='MarginButton' type='primary' onClick={nextModal}>다음 글</Button>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h2>{newData.title}</h2>
            <p>{newData.contents}</p>
        </Modal>
        </>
    )
}