import { SiteClient } from 'datocms-client';

export default async function receptRequests(request, response) {
  if (request.method === 'POST') {
    const TOKEN = '19ce9a81e7b119aeb16c9fd303b8ee';
    const client = new SiteClient(TOKEN);

    const record = await client.items.create({
      itemType: '972264', // ModelID da community
      ...request.body
    });

    console.log(record);

    response.json({
      dados: 'Scraps',
      record: record
    });

    return;
  }

  response.status(403).json({
    message: 'Não foi possível executar a requisição'
  });
}