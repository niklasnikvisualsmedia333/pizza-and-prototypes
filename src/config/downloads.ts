export const DOWNLOADS = {
  onePager: {
    status: 'pending' as 'pending' | 'available',
    url: `${import.meta.env.BASE_URL}downloads/tech-meets-problems-one-pager.pdf`,
    filename: 'tech-meets-problems-one-pager.pdf',
  },
} as const;
