/**
 * Combine Reducers Redux Data
 */
import { combineReducers } from 'redux';
import { IntlReducer as ReducersIntl } from 'react-redux-multilingual'

// Create Custome Reducers
import products  from './products';
import filters from './filters';
import doctors from './doctors';
import hospitals from './hospitals';

export  const rootReducer = combineReducers({
    data: products,
    doctors:doctors,
    hospitals:hospitals,
    filters: filters,
    ReducersIntl
});