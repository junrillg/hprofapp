import { titleCase } from 'title-case'

export const formatError = (code: string) => {
  const errors = code.split('/')
  if (errors.length) {
    const message = errors[1].replace('-', ' ')
    return `${titleCase(errors[0]) || 'Error'}: ${titleCase(message)}`
  } else {
    const message = errors[0].replace('-', ' ')
    return `${titleCase(message)}`
  }
}
