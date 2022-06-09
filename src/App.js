import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { openNewTask, selectTasks, setModal } from './app/taskReducer'
import { Plan } from './pages/Tasks';
import { Focus } from './pages/Focus';
import { ModalForm } from './components/ModalForm/ModalForm';

import 'antd/dist/antd.css';
import './App.css'
import { HotKeys, GlobalHotKeys } from 'react-hotkeys';
import { CURRENT_TASK } from './config/domain';

import { MainHeader } from './components/MainHeader/MainHeader';

// import { PlanTasks } from './components/Tasks/PlanTasks';
// import { DoTasks } from './components/Tasks/DoTasks';
import { Tasks } from './pages/Tasks';
import { Projects } from './pages/Projects';
import { Today } from './pages/Today';
import { getDayThunk } from './app/thunks';

function App() {

  const dispatch = useDispatch()

  const keyMap = {
    MOVE_UP: "ctrl+enter"
  };

  const handlers = {
    MOVE_UP: event => dispatch(openNewTask())
      // setModal({ typeOfModal: 'new', currentTask: CURRENT_TASK }))
    // MOVE_UP: event => dispatch(setModal({ typeOfModal: 'new', currentTask: CURRENT_TASK }))
  };

  const getData = async () => {
    await dispatch(getDayThunk())
  }

  useEffect(() => {
    getData()
  })

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <div className='App'>
        <div className='wrapper'>
          <MainHeader />
          <Switch>
            <Route exact path='/' component={Tasks} />
            {/* <Route exact path='/plan' component={PlanTasks} /> */}
            <Route exact path='/tasks' component={Tasks} />
            <Route exact path='/today' component={Today} />
            {/* <Route exact path='/do' component={DoTasks} /> */}
            <Route exact path='/projects' component={Projects} />
            <Route path='/focus' component={Focus} />
          </Switch>
          <ModalForm />
        </div>
      </div>

    </GlobalHotKeys>
  );
}

export default App;
