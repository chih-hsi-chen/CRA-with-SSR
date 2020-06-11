import 'isomorphic-fetch';

export const FETCH_TODOS = 'fetch_todo';

export const fetchTodos = (resourceType) => async dispatch => {
    const filteredData = await fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                return data.filter((_, idx) => idx < 10);
            });
    dispatch({
        type: FETCH_TODOS,
        payload: filteredData
    });
};