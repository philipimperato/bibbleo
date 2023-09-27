import { useQuery } from '@tanstack/vue-query';

export default (key: string) =>
  computed(() => {
    return useQuery({
      queryKey: [key],
      queryFn: () => fetch(`http://localhost:3030/${key}`),
    });
  });
