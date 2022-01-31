export function FormatDate(value: string) {
    return new Date(value).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
}