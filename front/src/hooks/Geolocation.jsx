import { useEffect, useRef } from 'react';

export function useGeolocation() {
  const isProxy = useRef(false);
  const isAbuser = useRef(false);
  const country = useRef('');
  const state = useRef('');
  const city = useRef('');

  async function fetchData() {
    let res = await fetch('https://api.ipapi.is', { method: 'GET' });
    res = await res.json();
    isProxy.current = res['is_proxy'];
    isAbuser.current = res['is_abuser'];
    country.current = res['location']['country'];
    state.current = res['location']['state'];
    city.current = res['location']['city'];
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return { isProxy, isAbuser, country, state, city };
}
