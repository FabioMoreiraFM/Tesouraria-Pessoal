const DefaultAuthErrorEnum = {
    EMAIL_NOT_FOUND: 'EMAIL_NOT_FOUND',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    INVALID_EMAIL: 'INVALID_EMAIL',
    WEAK_PASSWORD: 'WEAK_PASSWORD : Password should be at least 6 characters',
    EMAIL_EXISTS: 'EMAIL_EXISTS',
    defaultMessages : {
        'EMAIL_NOT_FOUND': {message: 'Erro: E-mail não encontrado.'},
        'INVALID_PASSWORD': {message: 'Erro: Senha inválida.'},
        'INVALID_EMAIL': {message: 'Erro: E-mail inválido.'},
        'WEAK_PASSWORD : Password should be at least 6 characters': {message: 'Erro: Senha fraca. A senha deve conter ao menos 6 caracteres.'},
        'EMAIL_EXISTS': {message: 'Erro. E-mail já cadastrado.'}
    }
}

const getDefaultAuthErrorMessage = (error) => {
    try {
        return DefaultAuthErrorEnum.defaultMessages[error].message
    } catch(e) {
        return "Erro: Algo deu errado!"
    }
}

export default getDefaultAuthErrorMessage;