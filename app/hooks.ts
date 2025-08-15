// 'use client';
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState, AppDispatch } from "../app/store";
// import { TypedUseSelectorHook } from "react-redux";



// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;




// app/hooks.ts
'use client' // This is crucial for Next.js

import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook
} from 'react-redux'
// Update the import path if your store file is located elsewhere, for example:
import type { RootState, AppDispatch } from '../redux/store'
// Or ensure that './store.ts' exists in the same directory and exports RootState and AppDispatch

// Create typed versions of the hooks
export const useAppDispatch: () => AppDispatch = useReduxDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector