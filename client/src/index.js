import React from 'react';
import ReactDOM from 'react-dom/client';
import './utils/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './app';
import { NewsFeed } from './components/newsfeed';
import { LogForm } from './components/logForm';
import { EditForm } from './components/editForm';
import { DetPost } from './components/detPost';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<NewsFeed />} />
        <Route path="postLog" element={<LogForm />} />
        <Route path="/log/:logId" element={<DetPost />} />
        <Route path="/editLog/:logId" element={<EditForm />} />
      </Route>
      <Route path="test" element={<Test />} />
    </Routes>
  </BrowserRouter>
);

function Test({ state }) {
  return state ? <pre>{JSON.stringify(state)}</pre> : 'nothing';
}
