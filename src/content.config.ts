import { defineCollection } from 'astro:content';
import { z } from 'astro/zod'
import { glob } from 'astro/loaders';

const allowedTechs = [
  // AI / ML
  'Python',
  'PyTorch',
  'TensorFlow',
  'scikit-learn',
  'XGBoost',
  'Random Forest',
  'K-means',
  'Pandas',

  // Programming
  'C/C++',
  'MATLAB',
  'JavaScript',
  'TypeScript',

  // Biomedical / Hardware
  'Arduino',
  'Sensors',
  'IMUs',
  'Embedded Systems',
  'BCI',
  'Kinovea',
  'Bluetooth Communication',

  // Engineering / Design
  'Fusion360',
  'CAD',
  '3D Printing',
  'Prototyping',

  // Data / Analytics
  'Data Analysis',
  'Data Visualization',
  'Streamlit',
  'Excel',

  // Product
  'Product Management',
  'Agile',

  // Wet Lab / Molecular Biology
  'Cell Culture',
  'qPCR',
  'RNA Isolation',
  'cDNA Synthesis',
  'Molecular Biology',
  'Biorender',
  'XTT Assay',
  'Molecular Cloning',
  'Primer Design',
  'SnapGene',
  'DNA Sequencing',
  'Gel Electrophoresis',
  'Plasmid Design'
] as const;

export const AllowedTechsEnum = z.enum(allowedTechs);
export type AllowedTechs = z.infer<typeof AllowedTechsEnum>;

// eslint-disable-next-line import/prefer-default-export
export const collections = {
  project: defineCollection({
    loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/project' }),
    schema: z.object({
      draft: z.boolean(),
      caseStudyStatus: z
      .enum(['complete', 'in-progress'])
      .default('complete'),

      hasContainerized: z.boolean().optional(),
      title: z.string(),
      description: z.string(),
      link: z
        .object({
          url: z.string().optional(),
          sourceCodeUrl: z.string().optional(),
        })
        .optional(),
      resources: z
  .array(
    z.object({
      label: z.string(),
      url: z.string(),
    })
  )
  .optional(),
  
      thumbnail: z
        .object({
          src: z.string(),
          alt: z.string(),
        })
        .optional(),

      // Images displayed on the projects page
      gallery: z
        .array(
          z.object({
            src: z.string(),
            alt: z.string(),
          })
        )
        .max(4)
        .optional(),

      video: z.array(z.object({ src: z.string(), type: z.string() })).optional(),

      // Techs used
      tech: z.array(AllowedTechsEnum),

      // Proj category
      categories: z.array(
        z.enum([
          'AI/ML',
          'Biomedical',
          'Electronics',
          'Data',
          'Product Management/BI',
        ])
      ),
      relatedTechs: z.array(AllowedTechsEnum).optional(),
      themeColor: z.string().min(4).max(9).regex(/^#/).default('#fff'),
      publishDate: z.date(),


      projectType: z
        .enum([
          'Course Project',
          'Personal Project',
          'Internship',
          'Research Project',
          'Hackathon',
        ])
        .optional(),

      course: z.string().optional(),
      affiliation: z.string().optional(),
      role: z.string().optional(),
      highlights: z.array(z.string()).optional(),
      results: z
  .array(
    z.union([
      z.string(),

      z.object({
        parts: z.array(
          z.object({
            text: z.string(),
            url: z.string().optional(),
          })
        ),
      }),
    ])
  )
  .optional(),
      reflection: z.string().optional(),
      
    }),
  }),
  experience: defineCollection({
  loader: glob({
    pattern: '**/[^_]*.mdx',
    base: './src/content/experience',
  }),

  schema: z.object({
    draft: z.boolean(),

    title: z.string(),

    organization: z.string(),

    category: z.enum([
      'Internships',
      'Volunteering',
      'Academic Community Involvement',
    ]),

    startDate: z.date(),
    endDate: z.date().optional(),

    location: z.string().optional(),

    description: z.string(),

    affiliation: z.string().optional(),

    logo: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),

    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
        })
      )
      .max(2)
      .optional(),

    resources: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      )
      .optional(),

    contributions: z.array(z.string()).optional(),

    impact: z.array(z.string()).optional(),

    reflection: z.string().optional(),

    tech: z.array(AllowedTechsEnum).optional(),

    themeColor: z
      .string()
      .min(4)
      .max(9)
      .regex(/^#/)
      .default('#fff'),
  }),
}),
  config: defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{yaml,yml}',
    base: './src/content/config',
  }),

  schema: z.object({
    website: z.object({
      name: z.string(),
      username: z.string(),
      email: z.string(),
      socials: z.array(
        z.object({
          name: z.string(),
          url: z.string(),
        }),
      ),
    }),

    techGroups: z.array(
      z.object({
        id: z.string(),
        relatedTechs: z.array(AllowedTechsEnum),
        icon: z.string(),
        themeColor: z.string(),
      }),
    ),
  }),
}),
};
