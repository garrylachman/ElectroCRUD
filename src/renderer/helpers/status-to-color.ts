export const statusToColor = (status: string) => {
  switch (status.toUpperCase()) {
    case 'INFO': {
      return 'blue';
    }
    case 'WARNING': {
      return 'orange';
    }
    case 'SUCCESS': {
      return 'green';
    }
    case 'ERROR': {
      return 'red';
    }
    case 'DEBUG': {
      return 'primary';
    }
    default: {
      return 'primary';
    }
  }
};
