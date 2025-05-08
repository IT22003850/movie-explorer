// // // // import { createTheme } from '@mui/material/styles';
// // // // import { useState, useEffect, useMemo } from 'react';

// // // // export function useThemeMode() {
// // // //   const [mode, setMode] = useState(() => {
// // // //     try {
// // // //       return localStorage.getItem('themeMode') || 'light';
// // // //     } catch {
// // // //       return 'light';
// // // //     }
// // // //   });

// // // //   useEffect(() => {
// // // //     try {
// // // //       localStorage.setItem('themeMode', mode);
// // // //     } catch (err) {
// // // //       console.error('Failed to save themeMode to localStorage:', err);
// // // //     }
// // // //   }, [mode]);

// // // //   const toggleTheme = () => {
// // // //     setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
// // // //   };

// // // //   return { mode, toggleTheme };
// // // // }

// // // // export const getTheme = (mode) =>
// // // //   createTheme({
// // // //     palette: {
// // // //       mode,
// // // //       primary: {
// // // //         main: '#1976d2',
// // // //       },
// // // //       secondary: {
// // // //         main: '#dc004e',
// // // //       },
// // // //       background: {
// // // //         default: mode === 'light' ? '#f5f5f5' : '#121212',
// // // //         paper: mode === 'light' ? '#ffffff' : '#1d1d1d',
// // // //       },
// // // //     },
// // // //     typography: {
// // // //       fontFamily: 'Roboto, Arial, sans-serif',
// // // //     },
// // // //   });
// // // import { createTheme } from '@mui/material/styles';
// // // import { useState, useEffect, useMemo } from 'react';

// // // export function useThemeMode() {
// // //   const [mode, setMode] = useState(() => {
// // //     try {
// // //       return localStorage.getItem('themeMode') || 'light';
// // //     } catch {
// // //       return 'light';
// // //     }
// // //   });

// // //   useEffect(() => {
// // //     try {
// // //       localStorage.setItem('themeMode', mode);
// // //     } catch (err) {
// // //       console.error('Failed to save themeMode to localStorage:', err);
// // //     }
// // //   }, [mode]);

// // //   const toggleTheme = () => {
// // //     setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
// // //   };

// // //   return { mode, toggleTheme };
// // // }

// // // export const getTheme = (mode) =>
// // //   createTheme({
// // //     palette: {
// // //       mode,
// // //       primary: {
// // //         main: '#1976d2',
// // //       },
// // //       secondary: {
// // //         main: '#dc004e',
// // //       },
// // //       background: {
// // //         default: mode === 'light' ? '#f5f5f5' : '#121212',
// // //         paper: mode === 'light' ? '#ffffff' : '#1d1d1d',
// // //       },
// // //     },
// // //     typography: {
// // //       fontFamily: 'Roboto, Arial, sans-serif',
// // //     },
// // //   });

// // import { createTheme } from '@mui/material/styles';

// // export const getTheme = (mode) =>
// //   createTheme({
// //     palette: {
// //       mode,
// //       primary: {
// //         main: '#1976d2',
// //       },
// //       secondary: {
// //         main: '#dc004e',
// //       },
// //       background: {
// //         default: mode === 'light' ? '#f5f5f5' : '#121212',
// //         paper: mode === 'light' ? '#ffffff' : '#1d1d1d',
// //       },
// //     },
// //     typography: {
// //       fontFamily: 'Roboto, Arial, sans-serif',
// //     },
// //   });

// import { createTheme } from '@mui/material/styles';

// export const getTheme = (mode) =>
//   createTheme({
//     palette: {
//       mode,
//       primary: {
//         main: '#1976d2',
//       },
//       secondary: {
//         main: '#dc004e',
//       },
//       background: {
//         default: mode === 'light' ? '#f5f5f5' : '#121212',
//         paper: mode === 'light' ? '#ffffff' : '#1d1d1d',
//       },
//       text: {
//         primary: mode === 'light' ? '#000000' : '#ffffff',
//         secondary: mode === 'light' ? '#666666' : '#bbbbbb',
//       },
//     },
//     typography: {
//       fontFamily: 'Roboto, Arial, sans-serif',
//     },
//     components: {
//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             '& .MuiInputBase-input': {
//               color: mode === 'light' ? '#000000' : '#ffffff',
//             },
//             '& .MuiInputLabel-root': {
//               color: mode === 'light' ? '#666666' : '#bbbbbb',
//             },
//             '& .MuiOutlinedInput-root': {
//               '& fieldset': {
//                 borderColor: mode === 'light' ? '#666666' : '#bbbbbb',
//               },
//               '&:hover fieldset': {
//                 borderColor: mode === 'light' ? '#000000' : '#ffffff',
//               },
//               '&.Mui-focused fieldset': {
//                 borderColor: '#1976d2',
//               },
//             },
//           },
//         },
//       },
//       MuiSelect: {
//         styleOverrides: {
//           select: {
//             color: mode === 'light' ? '#000000' : '#ffffff',
//           },
//           icon: {
//             color: mode === 'light' ? '#666666' : '#bbbbbb',
//           },
//         },
//       },
//       MuiInputLabel: {
//         styleOverrides: {
//           root: {
//             color: mode === 'light' ? '#666666' : '#bbbbbb',
//           },
//         },
//       },
//       MuiMenuItem: {
//         styleOverrides: {
//           root: {
//             color: mode === 'light' ? '#000000' : '#ffffff',
//             backgroundColor: mode === 'light' ? '#ffffff' : '#1d1d1d',
//             '&:hover': {
//               backgroundColor: mode === 'light' ? '#f5f5f5' : '#333333',
//             },
//           },
//         },
//       },
//     },
//   });

import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1d1d1d',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
        secondary: mode === 'light' ? '#666666' : '#bbbbbb',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              backgroundColor: mode === 'light' ? '#ffffff' : '#333333',
            },
            '& .MuiInputBase-input': {
              color: mode === 'light' ? '#000000' : '#ffffff',
            },
            '& .MuiInputLabel-root': {
              color: mode === 'light' ? '#666666' : '#bbbbbb',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: mode === 'light' ? '#666666' : '#bbbbbb',
              },
              '&:hover fieldset': {
                borderColor: mode === 'light' ? '#000000' : '#ffffff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: mode === 'light' ? '#666666' : '#bbbbbb',
              opacity: 1,
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            color: mode === 'light' ? '#000000' : '#ffffff',
          },
          icon: {
            color: mode === 'light' ? '#666666' : '#bbbbbb',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '#666666' : '#bbbbbb',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '#000000' : '#ffffff',
            backgroundColor: mode === 'light' ? '#ffffff' : '#1d1d1d',
            '&:hover': {
              backgroundColor: mode === 'light' ? '#f5f5f5' : '#333333',
            },
          },
        },
      },
    },
  });