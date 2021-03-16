import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { getPlanThunk, getTasksThunk, selectTasks, setModal } from './app/taskReducer'
import { Plan } from './routes/Plan';
import { Focus } from './routes/Focus';
import { ModalForm } from './components/ModalForm/ModalForm';

import 'antd/dist/antd.css';
import { HotKeys, GlobalHotKeys } from 'react-hotkeys';
import { CURRENT_TASK } from './config/domain';

function App() {

  const dispatch = useDispatch()

  const { plan } = useSelector(selectTasks)

  const today = moment(new Date()).format('YYYY-MM-DD')

  useEffect(() => {
    dispatch(getTasksThunk())
    dispatch(getPlanThunk(today))    
  }, [plan])

  const keyMap = {
    MOVE_UP: "ctrl+enter"
  };

  const handlers = {
    MOVE_UP: event => dispatch(setModal({ typeOfModal: 'new', currentTask: CURRENT_TASK }))
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Switch>
        <Route exact path='/' component={Plan} />
        <Route path='/focus' component={Focus} />
      </Switch>
      <ModalForm />
    </GlobalHotKeys>
  );
}

export default App;
