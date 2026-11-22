import {defineType, defineField} from 'sanity'

const VIDEO_HOSTS = /^https:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\//

export default defineType({
  name: 'filme',
  title: 'Filme ou clipe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Link do vídeo',
      type: 'url',
      description:
        'Cole o link do YouTube (youtube.com/watch?v=..., youtu.be/...) ou do Vimeo (vimeo.com/123456789). Vídeos "Ocultos" do Vimeo, com código no final, também funcionam.',
      validation: (Rule) =>
        Rule.required()
          .uri({scheme: ['https']})
          .custom((url) =>
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
      description: 'Desmarque para esconder o vídeo do site.',
      initialValue: false,
    }),
  ],
  orderings: [
    {title: 'Ordem de exibição', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {select: {title: 'title', subtitle: 'videoUrl'}},
})
