import {cpf, cnpj} from 'cpf-cnpj-validator';

export const isCPFValid = (cpfNumber: string): boolean => cpf.isValid(cpfNumber);

export const isCNPJValid = (cnpjNumber: string): boolean => cnpj.isValid(cnpjNumber);
