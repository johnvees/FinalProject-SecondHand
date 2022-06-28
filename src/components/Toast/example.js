import Toast from 'react-native-toast-message';

const showToast = () => {
  Toast.show({
    type: 'success', // error, info
    text1: 'Judul Konten',
    // text2: 'isi konten'
  });
};
