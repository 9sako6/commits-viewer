import { useQuery } from '@tanstack/react-query'

const URL = 'https://api.github.com'

type SearchQueryParams = {
  owner: string;
  repository: string;
}

export const useSearchQuery = ({ owner, repository }: SearchQueryParams) =>
  useQuery({
    // queryKey: ['repoData'],
    queryFn: () =>
      fetch(`${URL}/repos/${owner}/${repository}/commits?per_page=100`).then(
        (res) => res.json()
      )
  })
