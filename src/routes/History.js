import { useDispatch, useSelector } from 'react-redux';
import { selectHabits } from '../app/habitsReducer';
import './routes.css'

export const History = () => {

    const dispatch = useDispatch()

    const { history } = useSelector(selectHabits)

    const emptyArray = [...Array(30)]
    console.log("🚀 ~ file: History.js ~ line 12 ~ History ~ emptyArray", emptyArray)

    return (
        <div className='week_section'>
            <table>
                <thead>
                    <tr>
                        <th>1</th>
                        {
                            history.dates.map(item => <th className='table_head'>{item}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        history.historyTotal.map(item => {
                            return (
                                <tr>
                                    <td>{item.name}</td>
                                    {
                                        emptyArray.map((emptyItem, index) => {
                                            if (item.history.find(historyItem => historyItem.dayindex === index + 1)) {
                                                return <td style={{backgroundColor: 'green'}}></td>
                                            } else {
                                                return <td></td>
                                            }
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >

    )
}