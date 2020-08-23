export default function getFormatedData(data: Date) {
  if (!data) return;
  const localDate = new Date(data).toLocaleDateString('pt-br');
  const localTime = new Date(data).toLocaleTimeString('pt-br');
  const completDate = `${localDate} as ${localTime}`;
  return completDate;
}
