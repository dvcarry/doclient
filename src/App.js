import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';


import { getPlanThunk, getTasksThunk, selectTasks, setModal } from './app/taskReducer'
import { Plan } from './routes/Plan';
import { Focus } from './routes/Focus';
import { ModalForm } from './components/ModalForm/ModalForm';

import 'antd/dist/antd.css';
import './App.css'
import { HotKeys, GlobalHotKeys } from 'react-hotkeys';
import { CURRENT_TASK } from './config/domain';
import { Kanban } from './routes/Kanban';
import { Habits } from './routes/Habits';
import { MainHeader } from './components/MainHeader/MainHeader';
import { History } from './routes/History';
import { Analyze } from './routes/Analyze';
import { HabitsScore } from './routes/HabitsScore';
import { PlanTasks } from './components/Tasks/PlanTasks';
import { DoTasks } from './components/Tasks/DoTasks';
import { Projects } from './components/Tasks/Projects';
import { PlanToday } from './pages/PlanToday';

function App() {

  const dispatch = useDispatch()

  const { plan, timer } = useSelector(selectTasks)

  const today = moment(new Date()).format('YYYY-MM-DD')

  // useEffect(() => {
  //   dispatch(getTasksThunk())
  //   dispatch(getPlanThunk(today))
  // }, [plan])

  // useEffect(() => {
  //   document.title = timer;
  // }, [timer])

  const keyMap = {
    MOVE_UP: "ctrl+enter"
  };

  const handlers = {
    MOVE_UP: event => dispatch(setModal({ typeOfModal: 'new', currentTask: CURRENT_TASK }))
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <div className='App'>
        <div className='wrapper'>
          <MainHeader />
          <Switch>
            <Route exact path='/' component={PlanTasks} />
            {/* <Route exact path='/plan' component={PlanTasks} /> */}
            <Route exact path='/plan' component={Plan} />
            <Route exact path='/today' component={PlanToday} />
            <Route exact path='/do' component={DoTasks} />
            <Route exact path='/projects' component={Projects} />
            <Route path='/focus' component={Focus} />
            <Route path='/kanban' component={Kanban} />
            <Route path='/habits' component={Habits} />
            <Route path='/history' component={History} />
            <Route path='/analyze' component={Analyze} />
            <Route path='/score' component={HabitsScore} />
          </Switch>
          <ModalForm />
        </div>
      </div>

    </GlobalHotKeys>
  );
}

export default App;
