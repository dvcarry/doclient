import { Alert, Button } from 'antd';
import { useDispatch } from 'react-redux';

import { resetBreaks } from '../../redux/taskReducer';


export const Breaks = ({ breaks }) => {

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(resetBreaks())
    }

    return (
        <div className='block'>
            <Alert
                message="Сделай небольшой перерыв и выключи голову"
                type="warning"
                showIcon
                action={
                    <Button size="small" type="text" onClick={clickHandler}>
                        Готово
                    </Button>
                }
            />
        </div>
    )
}