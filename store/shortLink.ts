import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShortLinkState {
  customUrl: string;
  loading: boolean;
  error: string | null;
}

const initialState: ShortLinkState = {
  customUrl: '',
  loading: false,
  error: null,
};

const shortLinkSlice = createSlice({
  name: 'shortLink',
  initialState,
  reducers: {
    setCustomUrl: (state, action: PayloadAction<string>) => {
      state.customUrl = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCustomUrl, setLoading, setError } = shortLinkSlice.actions;
export default shortLinkSlice.reducer;
