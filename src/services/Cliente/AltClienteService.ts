import prismaClient from '../../prisma';
import md5 from 'md5';

interface AltClienteRequest {
  id: number;
  descricao: string;
  site: string;
  cpf_cnpj: string;
  observacao: string;
  endereco_id: number;
  cep: string;
  endereco: string;
  endereco_numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

class AltClienteService {
  async execute({
    id,
    descricao,
    site,
    cpf_cnpj,
    observacao,
    endereco_id,
    cep,
    endereco,
    endereco_numero,
    complemento,
    bairro,
    cidade,
    uf,
  }: AltClienteRequest) {
    if (!descricao) throw new Error('Nome Inválido!');
    if (!cpf_cnpj) throw new Error('E-mail Inválido!');

    await prismaClient.endereco.update({
      where: { id: endereco_id },
      data: {
        cep: cep,
        endereco: endereco,
        endereco_numero: endereco_numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
      },
    });

    const result = await prismaClient.cliente.update({
      where: { id: id },
      data: {
        descricao: descricao,
        site: site,
        cpf_cnpj: cpf_cnpj,
        observacao: observacao,
        endereco_id: endereco_id,
      },
      select: {
        id: true,
        descricao: true,
        site: true,
        cpf_cnpj: true,
        observacao: true,
        endereco: {
          select: {
            id: true,
            cep: true,
            endereco: true,
            endereco_numero: true,
            complemento: true,
            bairro: true,
            cidade: true,
            uf: true,
          },
        },
      },
    });

    return result;
  }
}

export { AltClienteService };
