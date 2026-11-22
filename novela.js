import {defineType, defineField} from 'sanity'

const VIDEO_HOSTS = /^https:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\//

export default defineType({
  name: 'novela',
  title: 'Novela',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'genre',
      title: 'Gênero',
      type: 'string',
      options: {
        list: ['Drama', 'Romance', 'Suspense', 'Comédia', 'Família', 'Aventura', 'Outro'],
      },
    }),
    defineField({
      name: 'episodes',
      title: 'Número de episódios',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1).max(999),
    }),
    defineField({
      name: 'status',
      title: 'Situação',
      type: 'string',
      options: {list: ['Em breve', 'Em produção', 'Concluída']},
      initialValue: 'Em produção',
    }),
    defineField({
      name: 'synopsis',
      title: 'Sinopse',
      type: 'text',
      rows: 3,
      description: 'Até 220 caracteres. Aparece quando a pessoa passa o mouse ou toca na capa.',
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'cover',
      title: 'Capa (opcional)',
      type: 'image',
      description:
        'Foto vertical (proporção 3:4). O site deixa a imagem em preto e branco e mostra a cor da novela ao passar o mouse. Sem capa, aparece um fundo padrão.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'watchUrl',
      title: 'Link para assistir (opcional)',
      type: 'url',
      description: 'Link de um vídeo do YouTube ou do Vimeo. Abre dentro do site.',
      validation: (Rule) =>
        Rule.uri({scheme: ['https']}).custom((url) =>
          !url || VIDEO_HOSTS.test(url) ? true : 'Use um link do YouTube ou do Vimeo.'
        ),
    }),
    defineField({
      name: 'order',
      title: 'Ordem de exibição',
      type: 'number',
      description: 'Número menor aparece primeiro.',
      initialValue: 10,
    }),
    defineField({
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      description: 'Desmarque para esconder a novela do site.',
      initialValue: false,
    }),
  ],
  orderings: [
    {title: 'Ordem de exibição', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', genre: 'genre', status: 'status', media: 'cover'},
    prepare: ({title, genre, status, media}) => ({
      title,
      subtitle: [genre, status].filter(Boolean).join(' · '),
      media,
    }),
  },
})
