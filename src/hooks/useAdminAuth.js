import { useEffect, useState } from 'react';
import * as auth from '../utils/auth.js';

const ACTIVITY_EVENTS = ['click', 'keydown', 'scroll', 'touchstart', 'mousemove'];

export function useAdminAuth() {
  const [authed, setAuthed] = useState(auth.isAuthed());
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    if (!authed) return undefined;

    const check = setInterval(() => {
      if (!auth.isAuthed()) {
        auth.logoutSession();
        setAuthed(false);
      }
    }, 5000);

    const touch = () => auth.refreshSession();
    ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, touch, { passive: true }));

    return () => {
      clearInterval(check);
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, touch));
    };
  }, [authed]);

  const login = async (password) => {
    const res = await auth.login(password);
    if (res.ok) {
      setAuthed(true);
      setLoginError(null);
    } else {
      setLoginError(res.error);
    }
    return res;
  };

  const logout = () => {
    auth.logoutSession();
    setAuthed(false);
  };

  return { authed, login, logout, loginError };
}