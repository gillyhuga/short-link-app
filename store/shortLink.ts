import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShortLinkState {
  longUrl: string,
  slug: string;
  loading: boolean;
  error: string | null;
}

const initialState: ShortLinkState = {
  longUrl: '',
  slug: '',
  loading: false,
  error: null,
};

const shortLinkSlice = createSlice({
  name: 'shortLink',
  initialState,
  reducers: {
    setLongUrl: (state, action: PayloadAction<string>) => {
      state.longUrl = action.payload;
    },
    setSlug: (state, action: PayloadAction<string>) => {
      state.slug = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLongUrl, setSlug, setLoading, setError } = shortLinkSlice.actions;
export default shortLinkSlice.reducer;
