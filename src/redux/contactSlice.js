import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const contactInitialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const isPendingAction = action => {
  return action.type.endsWith('/pending');
};

const handlePending = state => {
  state.isLoading = true;
};

const isRejectedAction = action => {
  return action.type.endsWith('/rejected');
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.push(action.payload);
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1);
        state.error = null;
      })
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isRejectedAction, handleRejected);
  },
});

export const contactReducer = contactSlice.reducer;

// const contactSlice = createSlice({
//   name: 'contacts',
//   initialState: contactInitialState,
//   extraReducers: {
//     [fetchContacts.pending]: handlePending,
//     [addContact.pending]: handlePending,
//     [deleteContact.pending]: handlePending,
//     [fetchContacts.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.contacts = action.payload;
//     },
//     [addContact.fulfilled](state, action) {
//       state.isLoading = false;
//       state.contacts.push(action.payload);
//       state.error = null;
//     },
//     [deleteContact.fulfilled](state, action) {
//       state.isLoading = false;
//       const index = state.contacts.findIndex(
//         contact => contact.id === action.payload.id
//       );
//       state.contacts.splice(index, 1);
//       state.error = null;
//     },
//     [fetchContacts.rejected]: handleRejected,
//     [addContact.rejected]: handleRejected,
//     [deleteContact.rejected]: handleRejected,
//   },
// });
