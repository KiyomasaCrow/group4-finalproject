/**
 * @description Formatta una data in formato gg/mm/aaaa
 * @param dateString Data da formattare
 * @returns Data formattata
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
