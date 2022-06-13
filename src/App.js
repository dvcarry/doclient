import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HotKeys, GlobalHotKeys } from 'react-hotkeys';

import { openNewTask, selectTasks } from './redux/taskReducer'
// import { Focus } from './pages/Focus';
import { ModalForm } from './components/ModalForm/ModalForm';
import { MainHeader } from './components/MainHeader/MainHeader';
import { Tasks } from './pages/Tasks';
import { Projects } from './pages/Projects';
import { Today } from './pages/Today';
import { Goals } from './pages/Goals';

import { getProjectsThunk } from './redux/projectsThunks';
import { getTasksThunk, getDoneTasksThunk } from './redux/tasksThunks';
import { getDayThunk } from './redux/daysThunks';
import { getGoalsThunk } from './redux/goalsThunks';

import 'antd/dist/antd.css';
import './App.css'


// import ErrorBoundary from './components/Error/ErrorBoundary';



function App() {

  const { error } = useSelector(selectTasks)

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
    await dispatch(getTasksThunk())
    await dispatch(getDoneTasksThunk())
    await dispatch(getProjectsThunk())
    await dispatch(getGoalsThunk())
  }

  useEffect(() => {
    getData()
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
        <div className='App'>
          <div className='wrapper'>
            <MainHeader />
            <Switch>
              <Route exact path='/' component={Tasks} />
              <Route exact path='/goals' component={Goals} />
              <Route exact path='/tasks' component={Tasks} />
              <Route exact path='/today' component={Today} />
              <Route exact path='/projects' component={Projects} />
              {/* <Route path='/focus' component={Focus} /> */}
            </Switch>
            <ModalForm />
          </div>
        </div>
    </GlobalHotKeys>
  );
}

export default App;
