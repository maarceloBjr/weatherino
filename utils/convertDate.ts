export function convertDate(dateString: string) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }